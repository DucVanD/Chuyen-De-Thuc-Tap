<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $table = 'visits';

    protected $fillable = [
        'ip', 'user_agent', 'user_id', 'visited_at'
    ];

    public $timestamps = false; // Nếu bạn không sử dụng created_at và updated_at
}
