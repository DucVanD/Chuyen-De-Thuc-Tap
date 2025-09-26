<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    protected $table = 'product';
    use SoftDeletes;

    public function getFormattedPriceRootAttribute()
    {
        return number_format($this->price_root, 0, ',', '.') . ' đ';
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class);  // Kiểm tra lại tên của model Brand
    }
    // Quan hệ ngược lại với Category (1 Product thuộc về 1 Category)
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
