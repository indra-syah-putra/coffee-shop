<?php

namespace App\Http\Middleware;

use App\Models\Booking;
use App\Models\Order;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'redirect_section' => fn () => $request->session()->get('redirect_section'),
            ],
            'settings' => Setting::all()->keyBy('key')->map->value,
            'adminNotifications' => $request->user()?->is_admin ? [
                'pendingOrders' => Order::where('status', 'pending')->count(),
                'pendingBookings' => Booking::where('status', 'pending')->count(),
            ] : null,
        ];
    }
}
