<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|exists:menu_items,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $total = 0;
        foreach ($validated['items'] as $item) {
            $menuItem = MenuItem::findOrFail($item['id']);
            $total += $menuItem->price * $item['quantity'];
        }

        $order = $request->user()->orders()->create([
            'total' => $total,
            'status' => 'pending',
        ]);

        return redirect()->route('my-orders')->with('success', 'Pesanan berhasil! Total: Rp ' . number_format($total, 0, ',', '.'));
    }

    public function myOrders(Request $request)
    {
        return Inertia::render('MyOrders/Index', [
            'orders' => $request->user()->orders()->orderBy('created_at', 'desc')->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total' => $order->total,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('d M Y H:i'),
                ];
            }),
        ]);
    }
}
