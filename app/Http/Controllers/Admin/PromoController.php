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
        $promos = Promo::orderBy('created_at', 'desc')->get()->map(function ($promo) {
            return [
                ...$promo->toArray(),
                'start_date' => $promo->start_date?->format('Y-m-d'),
                'end_date' => $promo->end_date?->format('Y-m-d'),
            ];
        });

        return Inertia::render('Admin/Promos', [
            'promos' => $promos,
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
            'active' => 'nullable|boolean',
        ]);

        $validated['active'] = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);

        Promo::create($validated);

        $message = $validated['active'] ? 'Promo berhasil ditambahkan.' : 'Promo disimpan sebagai draft.';
        return redirect()->back()->with('success', $message);
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
            'active' => 'nullable|boolean',
        ]);

        $wasActive = $promo->active;
        $validated['active'] = filter_var($validated['active'] ?? true, FILTER_VALIDATE_BOOLEAN);

        $promo->update($validated);

        if (!$validated['active'] && $wasActive) {
            $message = 'Promo dinonaktifkan dan disimpan sebagai draft.';
        } elseif (!$validated['active']) {
            $message = 'Promo disimpan sebagai draft.';
        } else {
            $message = 'Promo berhasil diperbarui.';
        }
        return redirect()->back()->with('success', $message);
    }

    public function destroy(Promo $promo)
    {
        $promo->delete();

        return redirect()->back()->with('success', 'Promo deleted.');
    }
}
