<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['name', 'price', 'category', 'type', 'caffeine', 'image', 'description', 'active'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'caffeine' => 'boolean',
            'active' => 'boolean',
        ];
    }
}
