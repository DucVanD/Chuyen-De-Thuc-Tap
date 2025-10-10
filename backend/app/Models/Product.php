<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    protected $table = 'product';
    use SoftDeletes;

    protected $fillable = [
        'name',
        'price_root',
        'price_sale',
        'brand_id',
        'category_id',
        'description',
        'qty'
    ];

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

    protected $appends = ['discount_percent'];

    // Trong file App\Models\Product.php

    public function getDiscountPercentAttribute()
    {
        // Nếu không có giá gốc hoặc giá gốc <= 0 → không tính giảm
        if (!$this->price_root || $this->price_root <= 0) {
            return 0;
        }

        // Nếu không có giá sale hoặc giá sale >= giá gốc → không giảm
        if (!$this->price_sale || $this->price_sale >= $this->price_root) {
            return 0;
        }

        // Tính phần trăm giảm, làm tròn và không cho âm
        return max(0, round((($this->price_root - $this->price_sale) / $this->price_root) * 100));
    }
}
