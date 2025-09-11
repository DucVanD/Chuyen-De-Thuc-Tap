<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 10; $i++) {
            DB::table('product')->insert([
                'category_id' => 1,
                'brand_id' => 1,
                'name' => 'Tên sản phẩm 1 ' . $i,
                'slug' => 'ten-san-pham-1 ' . $i,
                'price_root' => 29000 + ($i * 10),
                'price_sale' => 19000 + ($i * 10),
                'thumbnail' => 'san-pham-' . $i . '.webp',
                'qty' => 10 + $i,
                'detail' => 'Chi tếit',
                'description' => 'Mô tả sản phẩm',
                'created_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
