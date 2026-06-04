<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MenuItems', [
            'items' => MenuItem::orderBy('category')->orderBy('name')->get(),
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
        ]);

        $menuItem->name = $validated['name'];
        $menuItem->price = $validated['price'];
        $menuItem->category = $validated['category'];
        $menuItem->type = $validated['type'] ?? null;
        $menuItem->caffeine = filter_var($validated['caffeine'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $menuItem->active = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);
        $menuItem->image = $validated['image'] ?? null;
        $menuItem->description = $validated['description'] ?? null;
        $menuItem->save();

        return redirect()->back()->with('success', 'Menu item updated.');
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();

        return redirect()->back()->with('success', 'Menu item deleted.');
    }
}
