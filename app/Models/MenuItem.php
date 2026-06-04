<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['name', 'price', 'category_id', 'image', 'description'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function optionValues()
    {
        return $this->belongsToMany(MenuOptionValue::class, 'menu_item_option')
            ->withPivot('price')
            ->withTimestamps();
    }

    public function toppings()
    {
        return $this->hasMany(MenuItemTopping::class);
    }
}
