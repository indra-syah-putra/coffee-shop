<?php

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\MenuItemSize;
use App\Models\MenuOptionValue;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Create default categories
        $categoryNames = MenuItem::distinct()->pluck('category')->filter();
        foreach ($categoryNames as $name) {
            Category::firstOrCreate(['name' => $name]);
        }

        // 2. Add category_id to menu_items
        Schema::table('menu_items', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
        });

        // 3. Migrate category string to category_id
        foreach (MenuItem::all() as $item) {
            $cat = Category::where('name', $item->category)->first();
            if ($cat) {
                $item->category_id = $cat->id;
                $item->save();
            }
        }

        // 4. Drop old category string column
        Schema::table('menu_items', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        // 5. Create default global option values from existing sizes
        $sizeNames = MenuItemSize::distinct()->pluck('name');
        foreach ($sizeNames as $name) {
            MenuOptionValue::firstOrCreate(['type' => 'size', 'name' => $name]);
        }

        // Ensure default temperature & sugar level options exist
        $temperatures = ['Panas', 'Dingin'];
        foreach ($temperatures as $t) {
            MenuOptionValue::firstOrCreate(['type' => 'temperature', 'name' => $t]);
        }

        $sugarLevels = ['Less Sugar', 'Normal Sugar', 'Extra Sugar'];
        foreach ($sugarLevels as $s) {
            MenuOptionValue::firstOrCreate(['type' => 'sugar_level', 'name' => $s]);
        }

        // 6. Migrate menu_item_sizes to menu_item_option pivot
        foreach (MenuItemSize::all() as $size) {
            $globalSize = MenuOptionValue::where('type', 'size')->where('name', $size->name)->first();
            if ($globalSize) {
                $item = MenuItem::find($size->menu_item_id);
                if ($item && !$item->optionValues()->where('menu_option_value_id', $globalSize->id)->exists()) {
                    $item->optionValues()->attach($globalSize->id, ['price' => $size->price]);
                }
            }
        }

        // 7. Link existing menu_items to default temperatures based on their 'type' field
        foreach (MenuItem::all() as $item) {
            if ($item->has_temperature) {
                $hot = MenuOptionValue::where('type', 'temperature')->where('name', 'Panas')->first();
                $cold = MenuOptionValue::where('type', 'temperature')->where('name', 'Dingin')->first();
                if ($hot && !$item->optionValues()->where('menu_option_value_id', $hot->id)->exists()) {
                    $item->optionValues()->attach($hot->id);
                }
                if ($cold && !$item->optionValues()->where('menu_option_value_id', $cold->id)->exists()) {
                    $item->optionValues()->attach($cold->id);
                }
            }
            if ($item->has_sugar_level) {
                $sugarValues = MenuOptionValue::where('type', 'sugar_level')->get();
                foreach ($sugarValues as $sv) {
                    if (!$item->optionValues()->where('menu_option_value_id', $sv->id)->exists()) {
                        $item->optionValues()->attach($sv->id);
                    }
                }
            }
        }

        // 8. Drop old columns and tables
        Schema::table('menu_items', function (Blueprint $table) {
            $table->dropColumn(['has_temperature', 'has_sugar_level']);
        });

        Schema::dropIfExists('menu_item_sizes');
    }

    public function down(): void
    {
        // Reverse data migration is too complex; just note that down is not supported.
    }
};
