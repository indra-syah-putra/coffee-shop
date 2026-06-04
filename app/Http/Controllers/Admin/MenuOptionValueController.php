<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuOptionValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuOptionValueController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MenuOptions', [
            'sizes' => MenuOptionValue::where('type', 'size')->orderBy('name')->get(),
            'temperatures' => MenuOptionValue::where('type', 'temperature')->orderBy('name')->get(),
            'sugarLevels' => MenuOptionValue::where('type', 'sugar_level')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:size,temperature,sugar_level',
            'name' => 'required|string|max:255',
            'active' => 'nullable|boolean',
        ]);

        $validated['active'] = $validated['active'] ?? true;

        MenuOptionValue::create($validated);

        return redirect()->back()->with('success', 'Option created.');
    }

    public function update(Request $request, MenuOptionValue $menuOptionValue)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'active' => 'nullable|boolean',
        ]);

        $validated['active'] = $validated['active'] ?? true;

        $menuOptionValue->update($validated);

        return redirect()->back()->with('success', 'Option updated.');
    }

    public function destroy(MenuOptionValue $menuOptionValue)
    {
        $menuOptionValue->menuItems()->detach();
        $menuOptionValue->delete();

        return redirect()->back()->with('success', 'Option deleted.');
    }
}
