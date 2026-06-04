<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Promos', [
            'promos' => Promo::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'active' => 'nullable|in:0,1,true,false',
        ]);

        $validated['active'] = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);

        Promo::create($validated);

        return redirect()->back()->with('success', 'Promo created.');
    }

    public function update(Request $request, Promo $promo)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'active' => 'nullable|in:0,1,true,false',
        ]);

        $validated['active'] = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);

        $promo->update($validated);

        return redirect()->back()->with('success', 'Promo updated.');
    }

    public function destroy(Promo $promo)
    {
        $promo->delete();

        return redirect()->back()->with('success', 'Promo deleted.');
    }
}
