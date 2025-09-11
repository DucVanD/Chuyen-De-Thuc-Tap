<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 10; $i++) {
            DB::table('brand')->insert([
                'name' => 'Thương hiệu ' . $i,
                'slug' => 'thuong-hieu-' . $i,
                'image' => 'thuong-hieu-' . $i . '.webp',
                'sort_order' => $i,
                'description' => 'Mô tả thương hiệu',
                'created_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
