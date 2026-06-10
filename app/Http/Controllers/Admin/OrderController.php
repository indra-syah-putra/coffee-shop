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
                    'order_number' => $order->order_number,
                    'user' => $order->user,
                    'total' => $order->total,
                    'discount' => $order->discount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->toIso8601String(),
                    'items' => $order->items
                        ->groupBy(function ($item) {
                            return $item->name . '|' .
                                ($item->size ?? '') . '|' .
                                ($item->temperature ?? '') . '|' .
                                ($item->sugar_level ?? '') . '|' .
                                ($item->ice_level ?? '') . '|' .
                                json_encode($item->toppings);
                        })
                        ->values()
                        ->map(function ($group) {
                            $first = $group->first();
                            return [
                                'name' => $first->name,
                                'price' => $first->price,
                                'quantity' => $group->sum('quantity'),
                                'size' => $first->size,
                                'temperature' => $first->temperature,
                                'sugar_level' => $first->sugar_level,
                                'ice_level' => $first->ice_level,
                                'toppings' => $first->toppings,
                            ];
                        }),
                ];
            }),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $allowedNext = [
            'pending' => ['processing', 'cancelled'],
            'processing' => ['confirmed', 'cancelled'],
        ];

        abort_if(!isset($allowedNext[$order->status]), 403, 'Status ini tidak dapat diubah lagi.');

        $validated = $request->validate([
            'status' => 'required|in:' . implode(',', $allowedNext[$order->status]),
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
