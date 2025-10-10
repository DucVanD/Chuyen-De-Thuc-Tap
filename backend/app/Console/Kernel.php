<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        // \App\Console\Commands\GenerateDailyReport::class,
    ];

    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('report:daily')->dailyAt('23:59');
    }

    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    protected $routeMiddleware = [
    // ... các middleware khác
    'log.visit' => \App\Http\Middleware\LogVisit::class,
      'admin' => \App\Http\Middleware\EnsureAdmin::class,
];

}
