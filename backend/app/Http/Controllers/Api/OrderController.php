<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\StockMovement;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str; // nhớ thêm dòng này ở đầu file
class OrderController extends Controller
{
    /**
     * Checkout - tạo đơn hàng mới
     */
    public function index(Request $request)
    {
        $status = $request->input('status');
        $payment = $request->input('payment');
        $orderCode = $request->input('order_code');
        $perPage = $request->input('limit', 8);

        $orders = Order::with('user')
            ->when($status, fn($q) => $q->where('status', $status))
            ->when($payment, fn($q) => $q->where('payment', strtoupper($payment)))
            ->when($orderCode, fn($q) => $q->where('order_code', 'LIKE', "%$orderCode%"))
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách đơn hàng (lọc & phân trang)',
            'data' => $orders
        ]);
    }




    public function show($id)
    {
        // Lấy đơn hàng cùng thông tin user và chi tiết sản phẩm
        $order = Order::with(['user', 'orderDetails.product'])->find($id);

        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Đơn hàng không tồn tại'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Chi tiết đơn hàng',
            'data' => [
                'id' => $order->id,
                'user_id' => $order->user_id,
                'name' => $order->name,
                'email' => $order->email,
                'phone' => $order->phone,
                'address' => $order->address,
                'province' => $order->province,
                'district' => $order->district,
                'ward' => $order->ward,
                'total_amount' => $order->total_amount,
                'payment' => $order->payment ?? 'Chưa chọn',
                'status' => $order->status,

                'created_at' => $order->created_at,
                'updated_at' => $order->updated_at,
                'order_code' => $order->order_code,

                // Người đặt (user đăng nhập)
                'user' => $order->user ? [
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                ] : null,

                // Danh sách sản phẩm trong đơn
                'orderDetails' => $order->orderDetails->map(function ($detail) {
                    $thumbnail = $detail->product->thumbnail ?? null;
                    return [
                        'id' => $detail->id,
                        'product' => [
                            'name' => $detail->product->name ?? '',
                            'thumbnail' => $thumbnail
                                ? asset('assets/images/product/' . $thumbnail)
                                : asset('assets/images/product/no-image.png'),
                        ],
                        'price_buy' => (int) $detail->price_buy,
                        'qty' => (int) $detail->qty,
                        'amount' => (int) $detail->amount,
                    ];
                }),
            ]
        ]);
    }




    /**
     * Cập nhật trạng thái và ghi chú đơn hàng
     */
    public function update(Request $request, $id)
    {
        $order = Order::with('orderDetails.product')->find($id);

        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Đơn hàng không tồn tại',
            ], 404);
        }

        $request->validate([
            'status' => 'required|integer|in:1,2,3,4,5,6,7',
            'note' => 'nullable|string|max:1000',
        ]);

        $oldStatus = $order->status;
        $newStatus = $request->status;

        DB::beginTransaction();
        try {
            $order->status = $newStatus;
            $order->note = $request->note ?? '';
            $order->updated_at = now();
            $order->save();

            // ✅ Nếu đơn bị hoàn/trả hàng hoặc hủy
            if (in_array($newStatus, [6, 7]) && !in_array($oldStatus, [6, 7])) {
                foreach ($order->orderDetails as $detail) {
                    $product = $detail->product;
                    if ($product) {
                        // Cộng lại tồn kho
                        $product->qty += $detail->qty;
                        $product->save();

                        // Ghi log "return"
                        StockMovement::create([
                            'product_id' => $product->id,
                            'product_name' => $product->name,
                            'type' => 'return',
                            'quantity_change' => $detail->qty,
                            'qty_after' => $product->qty,
                            'note' => "Hoàn trả đơn hàng #{$order->order_code}",
                            'user_id' => Auth::id() ?? $order->user_id,
                        ]);
                    }
                }
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật trạng thái đơn hàng thành công',
                'data' => $order,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi cập nhật trạng thái: ' . $e->getMessage(),
            ]);
        }
    }





    public function checkout(Request $request)
    {
        // ... (Validate và Kiểm tra tồn kho giữ nguyên) ...

        DB::beginTransaction();
        try {
            // ✅ 3. Tính tổng tiền
            $totalAmount = collect($request->cart)->sum(fn($i) => $i['price'] * $i['qty']);

            // ✅ 4. Tạo đơn hàng (Bảng 'orders')
            $order = Order::create([
                'user_id' => Auth::id() ?? 11,
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'province' => $request->province,
                'district' => $request->district,
                'ward' => $request->ward,
                'note' => $request->note,
                'payment' => $request->payment,
                'status' => 1, // 1 = Chờ xử lý
                'payment_status' => 'pending', // Luôn là 'pending' khi mới tạo
                'total_amount' => $totalAmount,
                'created_at' => now(),
            ]);

            // ✅ 5. Sinh mã đơn hàng duy nhất
            do {
                $orderCode = 'HD' . date('ymd') . strtoupper(Str::random(4));
            } while (Order::where('order_code', $orderCode)->exists());
            $order->update(['order_code' => $orderCode]);

            // ✅ 6. TẠO CHI TIẾT ĐƠN HÀNG VÀ TRỪ KHO (Áp dụng cho mọi hình thức)
            // (Phần này được chuyển từ 'if cod' ra ngoài)
            foreach ($request->cart as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'price_buy' => $item['price'],
                    'qty' => $item['qty'],
                    'amount' => $item['price'] * $item['qty'],
                ]);

                $product = Product::find($item['id']);
                $product->decrement('qty', $item['qty']);

                StockMovement::create([
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'type' => 'export',
                    'quantity_change' => -$item['qty'],
                    'qty_after' => $product->qty,
                    'note' => 'Bán hàng – đơn #' . $orderCode,
                    'user_id' => Auth::id() ?? $order->user_id,
                ]);
            }

            // ✅ 7. Xử lý đầu ra tùy theo phương thức thanh toán
            if ($request->payment === 'vnpay') {
                // Nếu là VNPAY → tạo URL thanh toán
                $vnp_Url = env('VNP_URL');
                $vnp_Returnurl = env('VNP_RETURN_URL');
                $vnp_TmnCode = env('VNP_TMN_CODE');
                $vnp_HashSecret = env('VNP_HASH_SECRET');

                $vnp_TxnRef = $orderCode; // Dùng order_code
                $vnp_OrderInfo = 'Thanh toán đơn hàng #' . $orderCode;
                $vnp_OrderType = 'billpayment';
                $vnp_Amount = $totalAmount * 100;
                $vnp_Locale = 'vn';
                $vnp_IpAddr = $request->ip();

                $inputData = [
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
                ];

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
                $vnp_SecureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
                $vnp_Url = $vnp_Url . '?' . http_build_query($inputData) . '&vnp_SecureHash=' . $vnp_SecureHash;

                DB::commit(); // Commit giao dịch

                return response()->json([
                    'status' => true,
                    'payment_url' => $vnp_Url,
                    'order_code' => $orderCode
                ]);
            } else {
                // Nếu là COD hoặc BANK → Chỉ cần commit và trả về thành công
                // (Vì chúng ta đã trừ kho và tạo chi tiết ở trên rồi)

                // Nếu là COD, có thể cập nhật payment_status thành 'paid' nếu muốn
                // Hoặc vẫn để 'pending' tùy logic của bạn.

                DB::commit(); // Commit giao dịch

                return response()->json([
                    'status' => true,
                    'message' => 'Đặt hàng thành công!',
                    'data' => [
                        'order_code' => $orderCode,
                        'payment' => $order->payment,
                        'total_amount' => $totalAmount,
                    ]
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['status' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
        }
    }

    public function exportInvoice($id)
    {
        $order = Order::with('orderDetails.product')->find($id);

        if (!$order) {
            return response()->json(['status' => false, 'message' => 'Không tìm thấy đơn hàng'], 404);
        }

        $pdf = Pdf::loadView('pdf.invoice', ['order' => $order])->setPaper('a4');
        return $pdf->download('HoaDon_' . $order->id . '.pdf');
    }



    public function delete($id)
    {
        $order = Order::with('orderDetails')->find($id);

        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy đơn hàng cần xóa'
            ], 404);
        }

        // 🔒 Chỉ cho phép xóa khi status = 5 (đã giao) hoặc 7 (đã hủy)
        if (!in_array($order->status, [5, 7])) {
            return response()->json([
                'status' => false,
                'message' => 'Chỉ có thể xóa đơn hàng đã hoàn tất hoặc đã hủy'
            ], 400);
        }

        // 🧹 Xóa các chi tiết đơn hàng
        foreach ($order->orderDetails as $detail) {
            $detail->delete();
        }

        // ✅ Xóa đơn hàng chính
        $order->delete();

        return response()->json([
            'status' => true,
            'message' => 'Đã xóa đơn hàng và các chi tiết liên quan thành công'
        ]);
    }

}
