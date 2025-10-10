<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra xem user đã login chưa
        if (!Auth::check()) {
            return response()->json([
                'status' => false,
                'message' => 'Chưa đăng nhập',
            ], 401); // 401 Unauthorized
        }

        $user = Auth::user();

        // Kiểm tra role admin
        if ($user->roles !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Không có quyền truy cập',
            ], 403); // 403 Forbidden
        }

        return $next($request);
    }
}
