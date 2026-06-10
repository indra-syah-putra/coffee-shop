<?php

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\MenuOptionValue;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Ensure only 2 ice_level options exist
        $iceLevels = ['Es Biasa', 'Kurang Es'];
        foreach ($iceLevels as $name) {
            MenuOptionValue::firstOrCreate(['type' => 'ice_level', 'name' => $name]);
        }

        MenuOptionValue::where('type', 'ice_level')->whereNotIn('name', $iceLevels)->delete();

        // 2. Attach sugar_level options to all drink items (Signature Drinks category)
        $sugarValues = MenuOptionValue::where('type', 'sugar_level')->get();
        if ($sugarValues->isNotEmpty()) {
            $drinkCategory = Category::where('name', 'Signature Drinks')->first();
            if ($drinkCategory) {
                $drinkItems = MenuItem::where('category_id', $drinkCategory->id)->get();
                foreach ($drinkItems as $item) {
                    foreach ($sugarValues as $sv) {
                        if (!$item->optionValues()->where('menu_option_value_id', $sv->id)->exists()) {
                            $item->optionValues()->attach($sv->id);
                        }
                    }
                }
            }
        }
    }

    public function down(): void
    {
        // No reliable reverse migration
    }
};
