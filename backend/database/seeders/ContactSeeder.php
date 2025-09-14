<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 9; $i++) {
            DB::table('contact')->insert([
                'user_id' => 1,
                'name' => 'Liên hệ ' . $i,
                'email' => 'lien@example.com',
                'phone' => '098765432' . $i,
                'title' => 'Tiêu đề liên hệ ' . $i,
                'content' => 'Nội dung liên hệ',
                'reply_id' => 0,
                'created_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
