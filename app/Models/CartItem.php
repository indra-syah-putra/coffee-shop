<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'user_id', 'menu_item_id', 'name', 'price', 'image', 'quantity',
        'size', 'temperature', 'sugar_level', 'ice_level', 'toppings', 'key',
    ];

    protected function casts(): array
    {
        return [
            'toppings' => 'array',
            'price' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }
}
