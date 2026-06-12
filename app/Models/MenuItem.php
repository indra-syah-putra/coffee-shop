<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuItem extends Model
{
    use SoftDeletes;
{
    protected $fillable = ['name', 'price', 'category_id', 'image', 'description', 'active'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function optionValues()
    {
        return $this->belongsToMany(MenuOptionValue::class, 'menu_item_option')
            ->withPivot('price', 'is_default')
            ->withTimestamps();
    }

    public function toppings()
    {
        return $this->hasMany(MenuItemTopping::class);
    }
}
