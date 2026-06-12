<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Booking;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Promo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function profile()
    {
        return Inertia::render('Admin/Profile');
    }

    public function updateProfile(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            if ($user->photo) {
                Storage::disk('public')->delete($user->photo);
            }

            $data['photo'] = $request->file('photo')->store('photos', 'public');
        }

        $user->fill($data);
        $user->save();

        return Redirect::route('admin.profile')->with('success', 'Profile berhasil diperbarui.');
    }

    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalMenuItems' => MenuItem::count(),
                'totalBookings' => Booking::count(),
                'totalOrders' => Order::count(),
                'totalPromos' => Promo::count(),
            ],
        ]);
    }
}
