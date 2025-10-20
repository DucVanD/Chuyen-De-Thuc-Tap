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
        // ✅ 1. Validate dữ liệu đầu vào
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:1000',
            'province' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'ward' => 'required|string|max:255',
            'note' => 'nullable|string',
            'payment' => 'required|string|in:cod,bank',
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|integer',
            'cart.*.qty' => 'required|integer|min:1',
            'cart.*.price' => 'required|numeric|min:0',
        ]);

        // ✅ 2. Kiểm tra tồn kho từng sản phẩm
        foreach ($request->cart as $item) {
            $product = Product::find($item['id']);
            if (!$product) {
                return response()->json([
                    'status' => false,
                    'message' => "Sản phẩm ID {$item['id']} không tồn tại!"
                ], 400);
            }
            if ($item['qty'] > $product->qty) {
                return response()->json([
                    'status' => false,
                    'message' => "Sản phẩm {$product->name} chỉ còn {$product->qty} sản phẩm trong kho."
                ], 400);
            }
        }

        DB::beginTransaction();
        try {
            // ✅ 3. Tính tổng tiền
            $totalAmount = collect($request->cart)->reduce(function ($carry, $item) {
                return $carry + ($item['price'] * $item['qty']);
            }, 0);

            // ✅ 4. Tạo đơn hàng
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
                'status' => 1,
                'total_amount' => $totalAmount,
                'created_at' => now(),
            ]);

            // ✅ 5. Sinh mã hóa đơn duy nhất
            do {
                $orderCode = 'HD' . date('ymd') . strtoupper(Str::random(4));
            } while (Order::where('order_code', $orderCode)->exists());

            $order->update(['order_code' => $orderCode]);

            // ✅ 6. Tạo chi tiết đơn hàng & trừ tồn kho
            foreach ($request->cart as $item) {
                // Ghi chi tiết đơn hàng
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'price_buy' => $item['price'],
                    'qty' => $item['qty'],
                    'amount' => $item['price'] * $item['qty'],
                ]);

                // Trừ tồn kho
                $product = Product::find($item['id']);
                $product->qty -= $item['qty'];
                $product->save();

                // ✅ 7. Ghi log xuất kho
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

            DB::commit();

            // ✅ 8. Trả về phản hồi thành công
            return response()->json([
                'status' => true,
                'message' => 'Đặt hàng thành công!',
                'data' => [
                    'order_id' => $order->id,
                    'order_code' => $orderCode,
                    'total_amount' => number_format($order->total_amount, 0, ',', '.') . '₫',
                    'payment' => $order->payment,
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi đặt hàng: ' . $e->getMessage()
            ]);
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
}
