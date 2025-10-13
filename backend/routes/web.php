<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
Route::get('/', function () {
    return view('welcome');
});

// Route::get('/run-seed', function () {
//     Artisan::call('migrate:fresh --seed');
//     return response()->json(['status' => true, 'message' => 'Seed completed!']);
// });
