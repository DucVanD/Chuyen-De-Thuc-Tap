<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderDetail; // <-- Cần cho việc hoàn kho
use App\Models\Product;       // <-- Cần cho việc hoàn kho
use App\Models\StockMovement; // <-- Cần cho việc hoàn kho
class VnpayController extends Controller
{
    /**
     * Tạo URL thanh toán VNPAY.
     */
    public function createPayment(Request $request)
    {
        // $orderId = Str::uuid()->toString(); // mã đơn ngẫu nhiên
        $orderId = $request->input('order_code'); // mã đơn hàng có thật trong DB

        $amount = (int) $request->input('amount', 10000);
        $orderInfo = "Thanh toan don hang " . $orderId;

        $vnp_Url = env('VNP_URL');
        $vnp_Returnurl = env('VNP_RETURN_URL');
        $vnp_TmnCode = env('VNP_TMN_CODE');
        $vnp_HashSecret = env('VNP_HASH_SECRET');

        // Kiểm tra nếu thiếu cấu hình
        if (!$vnp_Url || !$vnp_Returnurl || !$vnp_TmnCode || !$vnp_HashSecret) {
            Log::error('VNPAY config missing');
            return response()->json([
                'status' => false,
                'message' => 'VNPAY config missing'
            ], 500);
        }

        $vnp_TxnRef = $orderId;
        $vnp_OrderInfo = $orderInfo;
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = $amount * 100; // đơn vị đồng *100
        $vnp_Locale = 'vn';
        $vnp_BankCode = 'NCB'; // Có thể để trống để khách tự chọn
        $vnp_IpAddr = $request->ip();

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef
        );

        // Không bắt buộc gửi $vnp_BankCode
        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        ksort($inputData);
        $query = "";
        $hashdata = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $query = rtrim($query, '&');



        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= "?" . $query . '&vnp_SecureHash=' . $vnpSecureHash;
        }

        return response()->json([
            'status' => true,
            'payment_url' => $vnp_Url
        ]);
    }

    /**
     * Xử lý khi VNPAY gọi về (Return URL).
     */
    public function vnpayReturn(Request $request)
    {
        $inputData = $request->all();
        $vnp_HashSecret = env('VNP_HASH_SECRET');
        $vnp_SecureHash = $inputData['vnp_SecureHash'] ?? '';

        unset($inputData['vnp_SecureHash']);
        ksort($inputData);

        $hashData = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
        $vnp_TxnRef = $inputData['vnp_TxnRef'] ?? 'unknown_order'; // Đây là 'order_code'
        $vnp_ResponseCode = $inputData['vnp_ResponseCode'] ?? '99';
        $clientReturnUrl = env('VNP_FRONTEND_URL');

        $redirectUrl = $clientReturnUrl . '?order_id=' . urlencode($vnp_TxnRef);

        if ($secureHash === $vnp_SecureHash) {
            $order = Order::where('order_code', $vnp_TxnRef)->first();
            if ($vnp_ResponseCode == '00') {
                // Giao dịch THÀNH CÔNG
                // TODO: Cập nhật trạng thái đơn hàng trong DB là "Thành công"
                // Ví dụ: Order::where('id', $vnp_TxnRef)->update(['status' => '2']); // Giả sử 2 là 'đã thanh toán'
                Order::where('order_code', $vnp_TxnRef)->update(['payment_status' => 'success']);

                $redirectUrl .= '&status=success&message=Payment+Success';
            }
            // === BỔ SUNG XỬ LÝ HỦY GIAO DỊCH ===
            elseif ($vnp_ResponseCode == '24') {
                // Giao dịch BỊ HỦY BỞI NGƯỜI DÙNG
                // TODO: Cập nhật trạng thái đơn hàng trong DB là "Đã Hủy"
                // Cập nhật status = 7 như bạn mong muốn
                // Order::where('id', $vnp_TxnRef)->update(['status' => '7']);
                // Order::where('order_code', $vnp_TxnRef)->update(['status' => '7']);
                // Order::where('order_code', $vnp_TxnRef)->update(['status' => '7']);
                Order::where('order_code', $vnp_TxnRef)->update([
                    'payment_status' => 'failed',
                    'status' => 3, // ví dụ: 3 = thanh toán thất bại
                ]);

                $orderDetails = OrderDetail::where('order_id', $order->id)->get();

                foreach ($orderDetails as $detail) {
                    $product = Product::find($detail->product_id);
                    if ($product) {
                        // 1. Cộng (increment) số lượng trả lại kho
                        $product->increment('qty', $detail->qty);

                        // 2. Ghi lại lịch sử hoàn kho (import)
                        StockMovement::create([
                            'product_id' => $product->id,
                            'product_name' => $product->name,
                            'type' => 'import', // Nhập kho
                            'quantity_change' => $detail->qty, // Số lượng dương
                            'qty_after' => $product->qty, // Số lượng sau khi cộng
                            'note' => 'Hủy đơn hàng VNPAY #' . $order->order_code,
                            'user_id' => $order->user_id,
                        ]);
                    }
                }



                $redirectUrl .= '&status=cancelled&message=Payment+Cancelled&response_code=' . $vnp_ResponseCode;
            }
            // === KẾT THÚC BỔ SUNG ===
            else {
                // Giao dịch THẤT BẠI (do các lỗi khác)
                // TODO: Cập nhật trạng thái đơn hàng trong DB là "Thất bại"
                // Ví dụ: Order::where('id', $vnp_TxnRef)->update(['status' => '3']); // Giả sử 3 là 'thanh toán lỗi'
                Order::where('order_code', $vnp_TxnRef)->update(['payment_status' => 'failed']);

                $redirectUrl .= '&status=failed&message=Payment+Failed&response_code=' . $vnp_ResponseCode;
            }
        } else {
            // Sai chữ ký -> Giao dịch không hợp lệ
            $redirectUrl .= '&status=invalid_signature&message=Invalid+Signature';
        }

        return redirect($redirectUrl);
    }
}   //  // VNP_TMN_CODE=58GDTJ08
