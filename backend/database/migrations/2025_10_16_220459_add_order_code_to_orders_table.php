<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('order', function (Blueprint $table) {
            $table->string('order_code', 20)
                  ->unique()
                  ->after('id')
                  ->nullable(); // ban đầu có thể null để tránh lỗi với dữ liệu cũ
        });
    }

    public function down(): void
    {
        Schema::table('order', function (Blueprint $table) {
            $table->dropColumn('order_code');
        });
    }
};
