<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuItemTopping extends Model
{
    use SoftDeletes;
    protected $fillable = ['menu_item_id', 'name', 'price'];

    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }
}
