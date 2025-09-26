<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{


    protected $table = 'orderdetail';

    public $timestamps = false;


    public function product()
{
    return $this->belongsTo(Product::class);
}

}
