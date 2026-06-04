<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\MenuItem;
use App\Models\MenuItemTopping;
use App\Models\MenuOptionValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MenuItems', [
            'items' => MenuItem::with(['category', 'optionValues', 'toppings'])->orderBy('name')->get(),
            'categories' => Category::where('active', true)->orderBy('name')->get(),
            'sizeOptions' => MenuOptionValue::where('type', 'size')->where('active', true)->orderBy('name')->get(),
            'temperatureOptions' => MenuOptionValue::where('type', 'temperature')->where('active', true)->orderBy('name')->get(),
            'sugarLevelOptions' => MenuOptionValue::where('type', 'sugar_level')->where('active', true)->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'description' => 'nullable|string',
            'option_values' => 'nullable|array',
            'option_values.*' => 'exists:menu_option_values,id',
        ]);

        $item = new MenuItem;
        $item->name = $validated['name'];
        $item->price = $validated['price'];
        $item->category_id = $validated['category_id'];
        $item->description = $validated['description'] ?? null;

        if ($request->hasFile('image')) {
            $item->image = $request->file('image')->store('menus', 'public');
        }

        $item->save();

        $this->syncOptionValues($item, $request);

        return redirect()->back()->with('success', 'Menu item created.');
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'description' => 'nullable|string',
            'option_values' => 'nullable|array',
            'option_values.*' => 'exists:menu_option_values,id',
        ]);

        $menuItem->name = $validated['name'];
        $menuItem->price = $validated['price'];
        $menuItem->category_id = $validated['category_id'];
        $menuItem->description = $validated['description'] ?? null;

        if ($request->hasFile('image')) {
            if ($menuItem->image) {
                Storage::disk('public')->delete($menuItem->image);
            }
            $menuItem->image = $request->file('image')->store('menus', 'public');
        }

        $menuItem->save();

        if (isset($validated['option_values'])) {
            $this->syncOptionValues($menuItem, $request);
        }

        return redirect()->back()->with('success', 'Menu item updated.');
    }

    public function destroy(MenuItem $menuItem)
    {
        if ($menuItem->image) {
            Storage::disk('public')->delete($menuItem->image);
        }
        $menuItem->optionValues()->detach();
        $menuItem->delete();

        return redirect()->back()->with('success', 'Menu item deleted.');
    }

    public function storeTopping(Request $request, MenuItem $menuItem)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $menuItem->toppings()->create($validated);

        return redirect()->back()->with('success', 'Topping added.');
    }

    public function updateTopping(Request $request, MenuItemTopping $topping)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $topping->update($validated);

        return redirect()->back()->with('success', 'Topping updated.');
    }

    public function destroyTopping(MenuItemTopping $topping)
    {
        $topping->delete();

        return redirect()->back()->with('success', 'Topping deleted.');
    }

    protected function syncOptionValues($item, $request)
    {
        $optionValues = $request->input('option_values', []);
        $optionPrices = $request->input('option_prices', []);

        $syncData = [];
        foreach ($optionValues as $ovId) {
            $syncData[$ovId] = isset($optionPrices[$ovId]) && $optionPrices[$ovId] !== ''
                ? ['price' => $optionPrices[$ovId]]
                : [];
        }

        // Auto-attach ice_level options when Dingin temperature is selected
        $dinginId = MenuOptionValue::where('type', 'temperature')->where('name', 'Dingin')->value('id');
        if ($dinginId && in_array($dinginId, $optionValues)) {
            $iceLevels = MenuOptionValue::where('type', 'ice_level')->pluck('id')->toArray();
            foreach ($iceLevels as $ilId) {
                if (!isset($syncData[$ilId])) {
                    $syncData[$ilId] = [];
                }
            }
        }

        $item->optionValues()->sync($syncData);
    }
}
