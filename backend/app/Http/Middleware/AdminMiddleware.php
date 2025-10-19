<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if ($user && $user->roles === 'admin') {
            return $next($request);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không có quyền truy cập Admin!!!'
        ], 403);
    }
}
