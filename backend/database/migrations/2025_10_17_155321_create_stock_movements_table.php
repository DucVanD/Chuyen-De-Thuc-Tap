<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();

            // 🔹 Liên kết sản phẩm
            $table->foreignId('product_id')
                ->constrained('product')
                ->onDelete('cascade');

            $table->string('product_name');

            // 🔹 Loại thay đổi: nhập kho, xuất kho, điều chỉnh, trả hàng
            $table->enum('type', ['import', 'export', 'adjustment', 'return'])
                ->default('import');

            // 🔹 Biến động số lượng (vd: +5, -2)
            $table->integer('quantity_change');

            // 🔹 Số lượng sau khi thay đổi
            $table->integer('qty_after');

            // 🔹 Ghi chú tùy chọn
            $table->string('note')->nullable();

            // 🔹 Người thao tác — có thể null
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('user') // ⚠️ CHỈNH: bảng mặc định Laravel là 'users', KHÔNG phải 'user'
                ->nullOnDelete();

            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
