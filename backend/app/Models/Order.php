<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $table = 'order';

    protected $fillable = [
        'user_id', 'name', 'phone', 'email', 'address',
        'province', 'district', 'ward', 'note',
        'payment', 'status', 'total_amount','order_code',
    ];

    // Quan hệ với User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Quan hệ với OrderDetail
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }


}
