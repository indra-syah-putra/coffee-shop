<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Promo;
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
            'items.*.size' => 'nullable|string',
            'items.*.temperature' => 'nullable|string',
            'items.*.sugar_level' => 'nullable|string',
            'items.*.ice_level' => 'nullable|string',
            'items.*.toppings' => 'nullable|array',
            'promo_id' => 'nullable|exists:promos,id',
        ]);

        $total = 0;
        $orderItems = [];

        foreach ($validated['items'] as $itemData) {
            $menuItem = MenuItem::with(['optionValues', 'toppings'])->findOrFail($itemData['id']);
            $price = (float) $menuItem->price;

            if (!empty($itemData['size'])) {
                $size = $menuItem->optionValues->firstWhere('name', $itemData['size']);
                if ($size && $size->pivot->price > 0) {
                    $price = (float) $size->pivot->price;
                }
            }

            if (!empty($itemData['temperature'])) {
                $temp = $menuItem->optionValues->firstWhere('name', $itemData['temperature']);
                if ($temp && $temp->pivot->price > 0) {
                    $price = (float) $temp->pivot->price;
                }
            }

            $subtotal = $price * $itemData['quantity'];
            $total += $subtotal;

            $orderItems[] = [
                'menu_item_id' => $menuItem->id,
                'name' => $menuItem->name,
                'price' => $price,
                'quantity' => $itemData['quantity'],
                'size' => $itemData['size'] ?? null,
                'temperature' => $itemData['temperature'] ?? null,
                'sugar_level' => $itemData['sugar_level'] ?? null,
                'ice_level' => $itemData['ice_level'] ?? null,
                'toppings' => !empty($itemData['toppings']) ? $itemData['toppings'] : null,
            ];
        }

        $discount = 0;
        $promoId = null;

        if (!empty($validated['promo_id'])) {
            $promo = Promo::active()->find($validated['promo_id']);
            if ($promo) {
                $promoId = $promo->id;
                if ($promo->discount_type === 'percentage') {
                    $discount = $total * ($promo->discount_value / 100);
                } else {
                    $discount = min((float) $promo->discount_value, $total);
                }
            }
        }

        $order = $request->user()->orders()->create([
            'total' => $total - $discount,
            'status' => 'pending',
            'promo_id' => $promoId,
            'discount' => $discount,
        ]);

        $order->items()->createMany($orderItems);

        $msg = 'Pesanan berhasil! Total: Rp ' . number_format($total - $discount, 0, ',', '.');
        if ($discount > 0) {
            $msg .= ' (Diskon: Rp ' . number_format($discount, 0, ',', '.') . ')';
        }

        return redirect()->route('my-orders')->with('success', $msg);
    }

    public function myOrders(Request $request)
    {
        return Inertia::render('MyOrders/Index', [
            'orders' => $request->user()->orders()->with('items')->orderBy('created_at', 'desc')->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total' => $order->total,
                    'discount' => $order->discount,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('d M Y H:i'),
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
}
