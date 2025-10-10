<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyReport extends Model
{
    protected $table = 'daily_reports';

    protected $fillable = [
        'report_date', 'total_orders', 'total_revenue', 'total_users',
        'new_users', 'total_products', 'conversion_rate',
        'top_products', 'low_stock_products', 'visits'
    ];
}
