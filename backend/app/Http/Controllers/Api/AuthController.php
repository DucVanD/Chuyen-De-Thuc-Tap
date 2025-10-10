<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
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



// Admin login

 public function adminLogin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->username)
                    ->where('roles', 'admin')
                    ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Sai username hoặc mật khẩu admin',
            ], 401);
        }

        // Tạo token Sanctum
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ]);
    }





}
