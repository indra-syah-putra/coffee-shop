<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'total', 'status', 'promo_id', 'discount'];

    protected function casts(): array
    {
        return [
            'total' => 'decimal:2',
            'discount' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function promo()
    {
        return $this->belongsTo(Promo::class);
    }
}
