<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderdetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 10; $i++) {
            DB::table('orderdetail')->insert([
                'order_id' => 1,
                'product_id' => $i,
                'price_buy' => 10000 + ($i * 10),
                'qty' => $i,
                'amount' => (10000 + ($i * 10)) * $i
            ]);
        }
    }
}
