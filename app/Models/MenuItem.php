<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['name', 'price', 'category', 'type', 'caffeine', 'image', 'description', 'active', 'has_temperature', 'has_sugar_level'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'caffeine' => 'boolean',
            'active' => 'boolean',
            'has_temperature' => 'boolean',
            'has_sugar_level' => 'boolean',
        ];
    }

    public function sizes()
    {
        return $this->hasMany(MenuItemSize::class);
    }

    public function toppings()
    {
        return $this->hasMany(MenuItemTopping::class);
    }
}
