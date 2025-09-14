<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 10; $i++) {
            DB::table('order')->insert([
                'user_id' => 1,
                'name' => 'Người Liên hệ',
                'phone' => '0987654321',
                'email' => 'exmaplese@gmail.com',
                'address' => 'Địa chỉ',
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
