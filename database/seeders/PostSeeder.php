<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 10; $i++) {
            DB::table('post')->insert([
                'topic_id' => 1,
                'title' => 'Tiêu đề bài viết ' . $i,
                'slug' => 'tieu-de-bai-viet-' . $i,
                'detail' => 'Nội dung chi tiết',
                'thumbnail' => 'bai-viet-' . $i . '.webp',
                'type' => 'post',
                'description' => 'Mô tả bài viết',
                'created_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
