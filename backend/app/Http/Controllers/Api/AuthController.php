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
}
