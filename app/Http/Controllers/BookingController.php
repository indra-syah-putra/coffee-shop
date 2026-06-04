<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date|after:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'guests' => 'required|integer|min:1|max:20',
            'table_type' => 'required|in:indoor,outdoor,balkon',
            'notes' => 'nullable|string|max:500',
        ]);

        $start = strtotime($validated['start_time']);
        $end = strtotime($validated['end_time']);
        $hours = ($end - $start) / 3600;
        $blocks = ceil($hours / 12);
        $validated['price'] = $blocks * 25000;

        $booking = $request->user()->bookings()->create($validated);

        return redirect()->route('bookings.payment', $booking);
    }

    public function payment(Booking $booking)
    {
        if ($booking->user_id !== request()->user()->id) {
            abort(403);
        }

        return Inertia::render('BookingPayment/Index', [
            'booking' => $booking,
        ]);
    }

    public function pay(Request $request, Booking $booking)
    {
        if ($booking->user_id !== $request->user()->id) {
            abort(403);
        }

        return redirect()->route('my-bookings')->with('success', 'Pembayaran berhasil! Menunggu konfirmasi admin.');
    }

    public function myBookings(Request $request)
    {
        return Inertia::render('MyBookings/Index', [
            'bookings' => $request->user()->bookings()->orderBy('date', 'desc')->get(),
        ]);
    }
}
