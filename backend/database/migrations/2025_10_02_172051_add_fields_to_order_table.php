<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('order', function (Blueprint $table) {
            $table->string('province', 255)->nullable()->after('address');
            $table->string('district', 255)->nullable()->after('province');
            $table->string('ward', 255)->nullable()->after('district');
            $table->string('payment', 50)->default('cod')->after('note');
            $table->decimal('total_amount', 15, 2)->nullable()->after('payment');
        });
    }

    public function down(): void
    {
        Schema::table('order', function (Blueprint $table) {
            $table->dropColumn(['province', 'district', 'ward', 'payment', 'total_amount']);
        });
    }
};
