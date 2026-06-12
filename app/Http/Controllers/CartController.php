<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $items = $request->user()->cartItems->map(function ($item) {
            return [
                'cart_item_id' => $item->id,
                'id' => $item->menu_item_id,
                'name' => $item->name,
                'price' => (float) $item->price,
                'image' => $item->image ?? $item->menuItem?->image ?? null,
                'size' => $item->size,
                'temperature' => $item->temperature,
                'sugar_level' => $item->sugar_level,
                'ice_level' => $item->ice_level,
                'toppings' => $item->toppings ?? [],
                'quantity' => $item->quantity,
                'key' => $item->key,
            ];
        });

        return response()->json(['items' => $items]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:menu_items,id',
            'name' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'size' => 'nullable|string',
            'temperature' => 'nullable|string',
            'sugar_level' => 'nullable|string',
            'ice_level' => 'nullable|string',
            'toppings' => 'nullable|array',
        ]);

        $key = $this->makeKey($validated);

        $existing = CartItem::where('user_id', $request->user()->id)
            ->where('key', $key)
            ->first();

        if ($existing) {
            $existing->increment('quantity');
            return response()->json(['message' => 'Quantity increased']);
        }

        CartItem::create([
            'user_id' => $request->user()->id,
            'menu_item_id' => $validated['id'],
            'name' => $validated['name'],
            'price' => $validated['price'],
            'image' => $validated['image'] ?? null,
            'quantity' => 1,
            'size' => $validated['size'] ?? null,
            'temperature' => $validated['temperature'] ?? null,
            'sugar_level' => $validated['sugar_level'] ?? null,
            'ice_level' => $validated['ice_level'] ?? null,
            'toppings' => $validated['toppings'] ?? [],
            'key' => $key,
        ]);

        return response()->json(['message' => 'Item added to cart']);
    }

    public function update(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update(['quantity' => $validated['quantity']]);

        return response()->json(['message' => 'Cart updated']);
    }

    public function destroy(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== $request->user()->id) {
            abort(403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item removed']);
    }

    public function clear(Request $request)
    {
        $request->user()->cartItems()->delete();

        return response()->json(['message' => 'Cart cleared']);
    }

    private function makeKey(array $item): string
    {
        $parts = [
            $item['id'] ?? '',
            $item['size'] ?? '',
            $item['temperature'] ?? '',
            $item['sugar_level'] ?? '',
            $item['ice_level'] ?? '',
            !empty($item['toppings']) ? json_encode(collect($item['toppings'])->sort()->values()->toArray()) : '',
        ];

        return implode('::', array_filter($parts, fn($v) => $v !== ''));
    }
}
