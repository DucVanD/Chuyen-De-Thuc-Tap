<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 9; $i++) {
            DB::table('user')->insert([
                'name' => 'Họ và Tên ' . $i,
                'email' => Str::random(10) . '@example.com',
                'phone' => '098765432' . $i,
                'username' => 'admin' . $i,
                // 'password' => Hash::make('password'),
                  'password' => Hash::make('123456'),
                'address' => 'địa chỉ',
                'avatar' => 'slider-' . $i . '.webp',
                'roles' => 'customer',
                'created_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
