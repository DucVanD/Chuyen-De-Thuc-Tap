<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $table = 'orderdetail';

    public $timestamps = false;

    // Thêm fillable để cho phép mass assignment
    protected $fillable = [
        'order_id',
        'product_id',
        'price_buy',
        'qty',
        'amount'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

}
