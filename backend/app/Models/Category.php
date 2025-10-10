<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    protected $table = 'category';
    use SoftDeletes;
    // 1 danh mục có nhiều sản phẩm
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    
    // 1 danh mục có thể có nhiều danh mục con (self-referencing relationship)
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }
}
