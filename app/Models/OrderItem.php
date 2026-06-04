<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'menu_item_id', 'name', 'price', 'quantity',
        'size', 'temperature', 'sugar_level', 'toppings',
    ];

    protected function casts(): array
    {
        return [
            'toppings' => 'array',
            'price' => 'decimal:2',
        ];
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }
}
