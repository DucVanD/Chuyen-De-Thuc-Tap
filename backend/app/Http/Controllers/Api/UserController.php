<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    // Danh sách user (có phân trang)
    public function index()
    {
        $user = User::orderBy('id', 'asc')->paginate(6);
        return response()->json([
            'status' => true,
            'message' => 'Danh sách danh mục',
            'data' => $user
        ]);
    }

    // Lấy tất cả user (không phân trang)
    public function getAll()
    {
        $users = User::all();
        return response()->json([
            'status' => true,
            'message' => 'Tất cả người dùng',
            'data' => $users
        ]);
    }

    // Lưu user mới (Admin tạo)
    public function store(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->fullName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'status' => 1,
        ]);

        return response()->json([
            'status' => true,
            'message' => "Tạo user $user->name thành công",
            'data' => $user
        ]);
    }

    // Lấy chi tiết 1 user
    public function show(Request $request, $id)
    {
        $from = $request->input('from');
        $to = $request->input('to');
        $status = $request->input('status');
        $payment = $request->input('payment');
        $minTotal = $request->input('min_total');
        $maxTotal = $request->input('max_total');
        $perPage = $request->input('limit', 3);

        $user = \App\Models\User::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy user với id = $id",
            ], 404);
        }

        // 🔹 Lọc đơn hàng theo các tiêu chí + phân trang
        $orders = \App\Models\Order::with(['orderDetails.product'])
            ->withCount('orderDetails')
            ->where('user_id', $id)
            // 📅 Lọc ngày
            ->when($from && $to, fn($q) => $q->whereBetween('created_at', ["$from 00:00:00", "$to 23:59:59"]))
            ->when($from && !$to, fn($q) => $q->where('created_at', '>=', "$from 00:00:00"))
            ->when(!$from && $to, fn($q) => $q->where('created_at', '<=', "$to 23:59:59"))
            // 🧾 Lọc theo trạng thái
            ->when($status, fn($q) => $q->where('status', $status))
            // 💳 Lọc phương thức thanh toán
            ->when($payment, fn($q) => $q->where('payment', strtoupper($payment)))
            // 💰 Lọc theo tổng tiền
            ->when($minTotal && $maxTotal, fn($q) => $q->whereBetween('total_amount', [$minTotal, $maxTotal]))
            ->when($minTotal && !$maxTotal, fn($q) => $q->where('total_amount', '>=', $minTotal))
            ->when(!$minTotal && $maxTotal, fn($q) => $q->where('total_amount', '<=', $maxTotal))
            ->orderBy('id', 'desc')
            ->paginate($perPage);

        // 🔹 Thống kê toàn bộ user
        $totalOrders = \App\Models\Order::where('user_id', $id)->count();
        $totalProducts = \App\Models\OrderDetail::whereIn(
            'order_id',
            \App\Models\Order::where('user_id', $id)->pluck('id')
        )->sum('qty');

        // 🔹 Thống kê trạng thái đơn hàng
        $statusStats = \App\Models\Order::where('user_id', $id)
            ->selectRaw('
            SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) as confirmed,
            SUM(CASE WHEN status = 5 THEN 1 ELSE 0 END) as delivered,
            SUM(CASE WHEN status = 7 THEN 1 ELSE 0 END) as canceled
        ')
            ->first();

        // 🔹 Trả kết quả JSON
        return response()->json([
            'status' => true,
            'message' => "Chi tiết user $id (kèm lịch sử mua hàng có lọc)",
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'username' => $user->username,
                'avatar' => $user->avatar,
                'roles' => $user->roles,
                'status' => $user->status,

                // 🔸 Tổng quan
                'summary' => [
                    'total_orders' => $totalOrders,
                    'total_products' => $totalProducts,
                    'pending_orders' => $statusStats->pending ?? 0,
                    'confirmed_orders' => $statusStats->confirmed ?? 0,
                    'delivered_orders' => $statusStats->delivered ?? 0,
                    'canceled_orders' => $statusStats->canceled ?? 0,
                ],

                // 🔸 Danh sách đơn hàng
                'orders' => collect($orders->items())->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'order_code' => $order->order_code ?? '---',
                        'total_amount' => number_format($order->total_amount, 0, ',', '.') . '₫',
                        'payment' => strtoupper($order->payment),
                        'status' => $order->status,
                        'created_at' => $order->created_at->format('d/m/Y H:i'),
                        'total_items' => $order->order_details_count,
                        'products' => $order->orderDetails->map(function ($detail) {
                            return [
                                'product_id' => $detail->product_id,
                                'name' => $detail->product->name,
                                'thumbnail' => $detail->product->thumbnail
                                    ? asset('assets/images/product/' . $detail->product->thumbnail)
                                    : asset('assets/images/no-image.png'),
                                'price_buy' => number_format($detail->price_buy, 0, ',', '.') . '₫',
                                'qty' => $detail->qty,
                                'amount' => number_format($detail->amount, 0, ',', '.') . '₫',
                            ];
                        }),
                    ];
                }),

                // 🔸 Phân trang
                'pagination' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'per_page' => $orders->perPage(),
                    'total' => $orders->total(),
                ]
            ]
        ]);
    }






    // Cập nhật user
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => "User không tồn tại",
                'data' => null
            ]);
        }

        $request->validate([
            'fullName' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6',
            'phone' => 'nullable|string|max:20',
            'status' => 'nullable|integer',
        ]);

        $user->name = $request->fullName ?? $user->name;
        $user->email = $request->email ?? $user->email;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->phone = $request->phone ?? $user->phone;
        if (isset($request->status)) $user->status = $request->status;

        $user->save();

        return response()->json([
            'status' => true,
            'message' => "Cập nhật user $user->name thành công",
            'data' => $user
        ]);
    }

    // Xóa user (soft delete)
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => "User không tồn tại",
            ]);
        }

        $user->delete();
        return response()->json([
            'status' => true,
            'message' => "Xóa user $id thành công"
        ]);
    }

    // Lấy user đã xóa (trash)
    public function trash()
    {
        $users = User::onlyTrashed()->get();
        return response()->json([
            'status' => true,
            'message' => 'Danh sách user đã xóa',
            'data' => $users
        ]);
    }

    // Xóa vĩnh viễn
    public function delete($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Người dùng không tồn tại'
            ], 404);
        }

        // Kiểm tra xem user có đơn hàng không
        if ($user->orders()->exists()) {
            return response()->json([
                'status' => false,
                'message' => 'Người dùng đang có đơn hàng, không thể xóa'
            ], 400);
        }

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'Xóa người dùng thành công'
        ]);
    }


    // Restore soft deleted user
    public function restore(User $user)
    {
        $user->restore();
        return response()->json([
            'status' => true,
            'message' => "Khôi phục user $user->id thành công"
        ]);
    }

    // Toggle trạng thái active/inactive
    public function status(User $user)
    {
        $user->status = !$user->status;
        $user->save();
        return response()->json([
            'status' => true,
            'message' => "Cập nhật trạng thái thành công",
            'data' => ['status' => $user->status]
        ]);
    }
    public function register(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|unique:user,email', // ✅ kiểm tra email thật
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'required|string|regex:/^0\d{9}$/|unique:user,phone',
            'username' => 'nullable|string|max:255|unique:user,username',
            'address' => 'nullable|string|max:1000',
            'avatar' => 'nullable|string|max:255',
        ], [
            'fullName.required' => 'Họ và tên không được để trống.',
            'fullName.max' => 'Họ và tên không được vượt quá 255 ký tự.',

            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ hoặc không tồn tại.',
            'email.unique' => 'Email này đã được sử dụng.',

            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.',

            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.regex' => 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.',
            'phone.unique' => 'Số điện thoại này đã được đăng ký.',

            'username.unique' => 'Tên đăng nhập đã tồn tại.',
            'username.max' => 'Tên đăng nhập không được vượt quá 255 ký tự.',

            'address.max' => 'Địa chỉ không được vượt quá 1000 ký tự.',
            'avatar.max' => 'Tên ảnh đại diện không được vượt quá 255 ký tự.',
        ]);


        // Tự động sinh username nếu trống
        $username = $request->username;
        if (!$username) {
            $count = User::where('roles', 'customer')->count() + 1;
            $username = 'customer' . $count;
            while (User::where('username', $username)->exists()) {
                $count++;
                $username = 'customer' . $count;
            }
        }

        // Nếu không có avatar, đặt avatar mặc định
        $avatar = $request->avatar ?? 'default-avatar.png'; // bạn lưu trong /uploads/avatars/

        $user = User::create([
            'name' => $request->fullName,
            'username' => $username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'roles' => 'customer',
            'address' => $request->address ?? ' Chưa cập nhật',
            'avatar' => $avatar,
            'avatar' => $avatar ?? 'default-avatar.png',
            'created_by' => 0,  // 0 = tự đăng ký, admin tạo thì dùng admin_id
            'updated_by' => null,
            'status' => 1,
            'created_at' => now(),
            // 'updated_at' => now(),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng ký thành công',
            'access_token' => $token,
            'user' => $user
        ]);
    }


    // Đăng nhập
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email hoặc mật khẩu không đúng.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công',
            'access_token' => $token,
            'user' => $user
        ]);
    }

    // Thông tin user đang login
    public function me(Request $request)
    {
        return response()->json([
            'status' => true,
            'data' => $request->user()
        ]);
    }

    // Đăng xuất
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Đăng xuất thành công'
        ]);
    }
}
