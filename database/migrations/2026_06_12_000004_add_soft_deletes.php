<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menu_items', fn(Blueprint $t) => $t->softDeletes());
        Schema::table('categories', fn(Blueprint $t) => $t->softDeletes());
        Schema::table('promos', fn(Blueprint $t) => $t->softDeletes());
        Schema::table('orders', fn(Blueprint $t) => $t->softDeletes());
        Schema::table('bookings', fn(Blueprint $t) => $t->softDeletes());
        Schema::table('menu_option_values', fn(Blueprint $t) => $t->softDeletes());
        Schema::table('menu_item_toppings', fn(Blueprint $t) => $t->softDeletes());
    }

    public function down(): void
    {
        Schema::table('menu_items', fn(Blueprint $t) => $t->dropSoftDeletes());
        Schema::table('categories', fn(Blueprint $t) => $t->dropSoftDeletes());
        Schema::table('promos', fn(Blueprint $t) => $t->dropSoftDeletes());
        Schema::table('orders', fn(Blueprint $t) => $t->dropSoftDeletes());
        Schema::table('bookings', fn(Blueprint $t) => $t->dropSoftDeletes());
        Schema::table('menu_option_values', fn(Blueprint $t) => $t->dropSoftDeletes());
        Schema::table('menu_item_toppings', fn(Blueprint $t) => $t->dropSoftDeletes());
    }
};
