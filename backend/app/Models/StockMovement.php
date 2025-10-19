<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMovement extends Model
{
    use HasFactory;

    protected $table = 'stock_movements';

    protected $fillable = [
        'product_id',
        'product_name',
        'type',
        'quantity_change',
        'qty_after',
        'note',
        'user_id',
    ];

    // 🔹 Quan hệ tới sản phẩm
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    // 🔹 Quan hệ tới người thao tác (user)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    
}
