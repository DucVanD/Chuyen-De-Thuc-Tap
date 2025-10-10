<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if (!$user || $user->roles !== 'admin') {
            return response()->json([
                'status' => false,
                'message' => 'Chỉ admin mới truy cập'
            ], 403);
        }
        return $next($request);
    }
}
