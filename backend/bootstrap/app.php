<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\AdminMiddleware; // 👈 thêm dòng này

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // ✅ Đăng ký alias middleware
        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);

        // (Tuỳ chọn) Nếu bạn muốn middleware này áp dụng cho nhóm api mặc định:
        // $middleware->appendToGroup('api', [AdminMiddleware::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
