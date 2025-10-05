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

        DB::beginTransaction();
        try {
            // Tính tổng tiền
            $totalAmount = array_reduce($request->cart, function($carry, $item) {
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

            // Tạo chi tiết đơn hàng
            foreach ($request->cart as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'price_buy' => $item['price'],
                    'qty' => $item['qty'],
                    'amount' => $item['price'] * $item['qty'],
                ]);
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
