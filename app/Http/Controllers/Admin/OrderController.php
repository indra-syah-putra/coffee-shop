<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Orders', [
            'orders' => Order::with(['user', 'items'])->orderBy('created_at', 'desc')->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'user' => $order->user,
                    'total' => $order->total,
                    'discount' => $order->discount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                    'items' => $order->items->map(function ($item) {
                        return [
                            'name' => $item->name,
                            'price' => $item->price,
                            'quantity' => $item->quantity,
                            'size' => $item->size,
                            'temperature' => $item->temperature,
                            'sugar_level' => $item->sugar_level,
                            'ice_level' => $item->ice_level,
                            'toppings' => $item->toppings,
                        ];
                    }),
                ];
            }),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,completed,cancelled',
        ]);

        $order->update($validated);

        return redirect()->back()->with('success', 'Order status updated.');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->back()->with('success', 'Order deleted.');
    }
}
