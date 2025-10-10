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
    // 1 chi tiết đơn hàng thuộc về 1 sản phẩm
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    // 1 chi tiết đơn hàng thuộc về 1 đơn hàng
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

}
