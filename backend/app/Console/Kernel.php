<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        \App\Console\Commands\GenerateDailyReport::class,
    ];

    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('report:daily')->dailyAt('23:59');
        $schedule->command('report:daily')->hourlyAt(30); // chạy mỗi giờ vào phút thứ 30
        //php artisan report:daily
    }

    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
