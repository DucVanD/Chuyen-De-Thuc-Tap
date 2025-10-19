<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // ===== USER AUTH (bạn đã có sẵn) =====
    public function register(Request $request)
    {
        return app(UserController::class)->register($request);
    }

    public function login(Request $request)
    {
        return app(UserController::class)->login($request);
    }

    public function me(Request $request)
    {
        return app(UserController::class)->me($request);
    }

    public function logout(Request $request)
    {
        return app(UserController::class)->logout($request);
    }

    // ===== ADMIN LOGIN =====
    public function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // Lấy user theo email
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Sai email hoặc mật khẩu!',
            ], 401);
        }

        // Kiểm tra quyền admin
        if ($user->roles !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Không có quyền truy cập Admin!!!',
            ], 403);
        }

        // Tạo token
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công!',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'roles' => $user->roles,
            ],
        ]);
    }


    public function adminMe(Request $request)
    {
        $user = $request->user();

        if (!$user || $user->roles !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Không có quyền truy cập!',
            ], 403);
        }

        return response()->json([
            'status' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'roles' => $user->roles,
            ],
        ]);
    }

    public function adminLogout(Request $request)
    {
        $user = $request->user();

        if (!$user || $user->roles !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Không có quyền thực hiện hành động này!',
            ], 403);
        }

        // Xóa token hiện tại (chỉ logout token đang dùng)
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Đăng xuất admin thành công!',
        ]);
    }
}
