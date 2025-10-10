<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
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
    public function show($id)
    {
        $user = \App\Models\User::with(['orders' => function ($query) {
            $query->withCount('orderDetails')->orderBy('id', 'desc');
        }])->withCount('orders')->find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy user với id = $id",
                'data' => null
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => "Chi tiết user $id",
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
                'orders_count' => $user->orders_count,
                'orders' => $user->orders->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'order_code' => 'HD' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
                        'total_amount' => number_format($order->total_amount, 0, ',', '.') . '₫',
                        'payment' => strtoupper($order->payment),
                        'status' => $order->status,
                        'created_at' => $order->created_at->format('d/m/Y H:i'),
                        'total_items' => $order->order_details_count
                    ];
                }),
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
            'email' => 'required|email|unique:user,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|unique:user,phone',
            'username' => 'nullable|string|max:255|unique:user,username',
            'address' => 'nullable|string|max:1000',
            'avatar' => 'nullable|string|max:255', // người dùng có thể upload sau
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
