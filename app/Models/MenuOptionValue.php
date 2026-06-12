<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuOptionValue extends Model
{
    use SoftDeletes;
{
    protected $fillable = ['type', 'name', 'active'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function menuItems()
    {
        return $this->belongsToMany(MenuItem::class, 'menu_item_option')
            ->withPivot('price')
            ->withTimestamps();
    }
}
