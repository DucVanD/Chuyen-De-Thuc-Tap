<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Tạo 10 mẫu tin - Chú ý phải dự vào cấu trúc bảng
        for ($i = 1; $i <= 10; $i++) {
            DB::table('menu')->insert([
                'name' => 'Menu ' . $i,
                'link' => 'menu-' . $i,
                'parent_id' => 0,
                'type' => 'custom',
                'position' => 'mainmenu',
                'sort_order' => 1,
                'created_by' => 1,
                'created_at' => date('Y-m-d H:i:s'),
                'status' => 1
            ]);
        }
    }
}
