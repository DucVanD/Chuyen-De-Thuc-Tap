<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 10; $i++) {
            DB::table('category')->insert([
                'name' => 'Danh mục ' . $i,
                'slug' => 'danh-muc- ' . $i,
                'image' => 'danh-muc-' . $i . '.webp',
                'parent_id' => 0,
                'sort_order' => $i,
                'description' => 'Mô tả',
                'created_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
