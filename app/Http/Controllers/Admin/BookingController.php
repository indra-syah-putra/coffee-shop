<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Bookings', [
            'bookings' => Booking::with('user')->orderBy('date', 'desc')->get(),
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        $booking->update($validated);

        $label = match ($validated['status']) {
            'confirmed' => 'dikonfirmasi',
            'cancelled' => 'dibatalkan',
            default => $validated['status'],
        };
        return redirect()->back()->with('success', "Booking {$label}.");
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return redirect()->back()->with('success', 'Booking deleted.');
    }
}
