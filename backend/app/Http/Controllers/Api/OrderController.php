<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderDetail;

class OrderController extends Controller
{
    /**
     * Checkout - tạo đơn hàng mới
     */
    public function index(Request $request)
    {
        $orders = Order::with('user')->orderBy('id', 'desc')->paginate(8);

        return response()->json([
            'status' => true,
            'message' => 'Danh sách đơn hàng',
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
            'payment' => $order->payment ?? 'Chưa chọn',
            'status' => $order->status,
            'created_at' => $order->created_at,
            'updated_at' => $order->updated_at,

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
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Đơn hàng không tồn tại',
            ], 404);
        }

        // Validate input
        $request->validate([
            'status' => 'required|integer|in:1,2,3,4,5,6,7',
            'note' => 'nullable|string|max:1000',
        ]);


        $order->status = $request->status;
        $order->note = $request->note ?? '';
        $order->updated_at = now();
        $order->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật đơn hàng thành công',
            'data' => $order,
        ]);
    }











    public function checkout(Request $request)
{
    // Validate cơ bản
    $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'email' => 'required|email|max:255',
        'address' => 'nullable|string|max:1000',
        'province' => 'nullable|string|max:255',
        'district' => 'nullable|string|max:255',
        'ward' => 'nullable|string|max:255',
        'note' => 'nullable|string',
        'payment' => 'required|string|in:cod,bank',
        'cart' => 'required|array|min:1',
        'cart.*.id' => 'required|integer',
        'cart.*.qty' => 'required|integer|min:1',
        'cart.*.price' => 'required|numeric|min:0',
    ]);

    // Kiểm tra tồn kho từng sản phẩm
    foreach ($request->cart as $item) {
        $product = \App\Models\Product::find($item['id']);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => "Sản phẩm ID {$item['id']} không tồn tại"
            ], 400);
        }
        if ($item['qty'] > $product->qty) {
            return response()->json([
                'status' => false,
                'message' => "Sản phẩm {$product->name} chỉ còn {$product->qty} sản phẩm trong kho"
            ], 400);
        }
    }

    DB::beginTransaction();
    try {
        // Tính tổng tiền
        $totalAmount = array_reduce($request->cart, function ($carry, $item) {
            return $carry + ($item['price'] * $item['qty']);
        }, 0);

        // Tạo đơn hàng
        $order = Order::create([
            'user_id' => Auth::id() ?? 11, // nếu chưa login thì dùng ID giả
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'province' => $request->province,
            'district' => $request->district,
            'ward' => $request->ward,
            'note' => $request->note,
            'payment' => $request->payment,
            'status' => 1, // pending
            'total_amount' => $totalAmount,
            'created_at' => now(),
        ]);

        // Tạo chi tiết đơn hàng & trừ tồn kho
        foreach ($request->cart as $item) {
            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'price_buy' => $item['price'],
                'qty' => $item['qty'],
                'amount' => $item['price'] * $item['qty'],
            ]);
            // Trừ tồn kho
            $product = \App\Models\Product::find($item['id']);
            $product->qty -= $item['qty'];
            $product->save();
        }

        DB::commit();

        return response()->json([
            'status' => true,
            'message' => 'Đặt hàng thành công',
            'data' => $order
        ]);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'status' => false,
            'message' => 'Lỗi khi đặt hàng: ' . $e->getMessage()
        ]);
    }
}
}
