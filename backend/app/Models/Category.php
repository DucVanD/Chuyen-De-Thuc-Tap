<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    protected $table = 'category';
    use SoftDeletes;

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // Category.php
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }
}
