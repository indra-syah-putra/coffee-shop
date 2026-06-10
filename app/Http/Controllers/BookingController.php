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
            'end_time' => 'required|date_format:H:i',
            'guests' => 'required|integer|min:1|max:20',
            'table_type' => 'required|in:indoor,outdoor,balkon',
            'notes' => 'nullable|string|max:500',
        ]);

        $start = strtotime($validated['start_time']);
        $end = strtotime($validated['end_time']);
        $hours = ($end - $start) / 3600;
        if ($hours <= 0) $hours += 24;
        $blocks = ceil($hours / 6);
        $validated['price'] = $blocks * 15000;

        do {
            $validated['booking_number'] = now()->timezone('Asia/Jakarta')->format('dmyHi') . str_pad(mt_rand(0, 99), 2, '0', STR_PAD_LEFT) . 'BKG';
        } while (\App\Models\Booking::where('booking_number', $validated['booking_number'])->exists());

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
