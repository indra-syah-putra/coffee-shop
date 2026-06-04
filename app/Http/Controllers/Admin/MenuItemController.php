<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\MenuItemSize;
use App\Models\MenuItemTopping;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MenuItems', [
            'items' => MenuItem::with(['sizes', 'toppings'])->orderBy('category')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string',
            'type' => 'nullable|string',
            'caffeine' => 'nullable|in:0,1,true,false',
            'active' => 'nullable|in:0,1,true,false',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'has_temperature' => 'nullable|in:0,1,true,false',
            'has_sugar_level' => 'nullable|in:0,1,true,false',
        ]);

        $item = new MenuItem;
        $item->name = $validated['name'];
        $item->price = $validated['price'];
        $item->category = $validated['category'];
        $item->type = $validated['type'] ?? null;
        $item->caffeine = filter_var($validated['caffeine'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $item->active = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $item->image = $validated['image'] ?? null;
        $item->description = $validated['description'] ?? null;
        $item->has_temperature = filter_var($validated['has_temperature'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $item->has_sugar_level = filter_var($validated['has_sugar_level'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $item->save();

        return redirect()->back()->with('success', 'Menu item created.');
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string',
            'type' => 'nullable|string',
            'caffeine' => 'nullable|in:0,1,true,false',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'active' => 'nullable|in:0,1,true,false',
            'has_temperature' => 'nullable|in:0,1,true,false',
            'has_sugar_level' => 'nullable|in:0,1,true,false',
        ]);

        $menuItem->name = $validated['name'];
        $menuItem->price = $validated['price'];
        $menuItem->category = $validated['category'];
        $menuItem->type = $validated['type'] ?? null;
        $menuItem->caffeine = filter_var($validated['caffeine'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $menuItem->active = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $menuItem->image = $validated['image'] ?? null;
        $menuItem->description = $validated['description'] ?? null;
        $menuItem->has_temperature = filter_var($validated['has_temperature'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $menuItem->has_sugar_level = filter_var($validated['has_sugar_level'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $menuItem->save();

        return redirect()->back()->with('success', 'Menu item updated.');
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();

        return redirect()->back()->with('success', 'Menu item deleted.');
    }

    public function storeSize(Request $request, MenuItem $menuItem)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $menuItem->sizes()->create($validated);

        return redirect()->back()->with('success', 'Size added.');
    }

    public function updateSize(Request $request, MenuItemSize $size)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $size->update($validated);

        return redirect()->back()->with('success', 'Size updated.');
    }

    public function destroySize(MenuItemSize $size)
    {
        $size->delete();

        return redirect()->back()->with('success', 'Size deleted.');
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
}
