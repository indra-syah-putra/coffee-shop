<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;
    protected $fillable = ['name', 'active'];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
        ];
    }

    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }
}
