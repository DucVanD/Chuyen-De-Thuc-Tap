<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $table = 'order';

    // Các field cho phép mass assignment
protected $fillable = [
    'user_id', 'name', 'phone', 'email', 'address',
    'province', 'district', 'ward', 'note',
    'payment', 'status', 'total_amount'
];


    // Quan hệ với User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Quan hệ với OrderDetail
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
