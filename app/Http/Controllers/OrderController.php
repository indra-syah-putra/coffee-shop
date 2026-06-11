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
        $grouped = [];

        foreach ($validated['items'] as $itemData) {
            $menuItem = MenuItem::with(['optionValues', 'toppings'])->findOrFail($itemData['id']);
            $price = (float) $menuItem->price;

            if (!empty($itemData['size'])) {
                $size = $menuItem->optionValues->firstWhere('name', $itemData['size']);
                if ($size && $size->pivot->price > 0) {
                    $price += (float) $size->pivot->price;
                }
            }

            if (!empty($itemData['temperature'])) {
                $temp = $menuItem->optionValues->firstWhere('name', $itemData['temperature']);
                if ($temp && $temp->pivot->price > 0) {
                    $price += (float) $temp->pivot->price;
                }
            }

            $toppings = !empty($itemData['toppings']) ? $itemData['toppings'] : null;
            $key = $menuItem->id . '|' . ($itemData['size'] ?? '') . '|' . ($itemData['temperature'] ?? '') . '|' . ($itemData['sugar_level'] ?? '') . '|' . ($itemData['ice_level'] ?? '') . '|' . json_encode($toppings);

            if (isset($grouped[$key])) {
                $grouped[$key]['quantity'] += $itemData['quantity'];
            } else {
                $grouped[$key] = [
                    'menu_item_id' => $menuItem->id,
                    'name' => $menuItem->name,
                    'price' => $price,
                    'quantity' => $itemData['quantity'],
                    'size' => $itemData['size'] ?? null,
                    'temperature' => $itemData['temperature'] ?? null,
                    'sugar_level' => $itemData['sugar_level'] ?? null,
                    'ice_level' => $itemData['ice_level'] ?? null,
                    'toppings' => $toppings,
                ];
            }
        }

        $orderItems = [];
        foreach ($grouped as $entry) {
            $subtotal = $entry['price'] * $entry['quantity'];
            $total += $subtotal;
            $orderItems[] = $entry;
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

        do {
            $orderNumber = now()->timezone('Asia/Jakarta')->format('dmyHi') . str_pad(mt_rand(0, 99), 2, '0', STR_PAD_LEFT) . 'KAF';
        } while (\App\Models\Order::where('order_number', $orderNumber)->exists());

        $order = $request->user()->orders()->create([
            'order_number' => $orderNumber,
            'total' => $total - $discount,
            'status' => 'pending',
            'promo_id' => $promoId,
            'discount' => $discount,
        ]);

        $order->items()->createMany($orderItems);

        return redirect()->to('/')->with('success', 'Terimakasih, anda sudah melakukan pesanan.')->with('redirect_section', 'menu');
    }

    public function myOrders(Request $request)
    {
        return Inertia::render('MyOrders/Index', [
            'orders' => $request->user()->orders()->with('items')->orderBy('created_at', 'desc')->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
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
}
