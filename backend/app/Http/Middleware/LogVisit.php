<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Visit; // nhớ import model Visit
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class LogVisit
{
    public function handle(Request $request, Closure $next)
    {
        Visit::create([
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'user_id' => Auth::check() ? Auth::id() : null,
            'visited_at' => now(), // thời gian truy cập
        ]);

        return $next($request);
    }
}
