<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\MenuItem;
use App\Models\Order;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalMenuItems' => MenuItem::count(),
                'totalBookings' => Booking::count(),
                'totalOrders' => Order::count(),
            ],
        ]);
    }
}
