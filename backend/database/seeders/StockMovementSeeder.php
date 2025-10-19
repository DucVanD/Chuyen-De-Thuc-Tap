<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StockMovementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('stock_movements')->insert([
            [
                'product_id' => 1,
                'product_name' => 'Cải thìa',
                'type' => 'import',
                'quantity_change' => +4,
                'qty_after' => 5,
                'note' => 'Nhập thủ công bởi Admin',
                'user_id' => null,
                'created_at' => $now->copy()->subMinutes(30),
                'updated_at' => $now->copy()->subMinutes(30),
            ],
            [
                'product_id' => 1,
                'product_name' => 'Cải thìa',
                'type' => 'export',
                'quantity_change' => -1,
                'qty_after' => 4,
                'note' => 'Bán hàng – đơn #HD20251016',
                'user_id' => null,
                'created_at' => $now->copy()->subMinutes(20),
                'updated_at' => $now->copy()->subMinutes(20),
            ],
            [
                'product_id' => 2,
                'product_name' => 'Gạo Jasmine',
                'type' => 'import',
                'quantity_change' => +10,
                'qty_after' => 10,
                'note' => 'Nhập kho đầu kỳ',
                'user_id' => null,
                'created_at' => $now->copy()->subHours(2),
                'updated_at' => $now->copy()->subHours(2),
            ],
            [
                'product_id' => 3,
                'product_name' => 'Xà lách',
                'type' => 'export',
                'quantity_change' => -2,
                'qty_after' => 8,
                'note' => 'Xuất bán cho khách',
                'user_id' => null,
                'created_at' => $now->copy()->subHour(),
                'updated_at' => $now->copy()->subHour(),
            ],
            [
                'product_id' => 4,
                'product_name' => 'Cam vàng',
                'type' => 'adjustment',
                'quantity_change' => +3,
                'qty_after' => 13,
                'note' => 'Kiểm kê tăng số lượng',
                'user_id' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
