import { createContext, useContext, useState, useEffect, useCallback } from 'react';

function makeKey(item) {
    const vars = [item.id, item.size, item.temperature, item.sugar_level, item.toppings ? JSON.stringify([...item.toppings].sort()) : ''];
    return vars.filter(Boolean).join('::');
}

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = useCallback((item) => {
        setItems(prev => {
            const key = makeKey(item);
            const existing = prev.find(i => makeKey(i) === key);
            if (existing) {
                return prev.map(i => makeKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                size: item.size || null,
                temperature: item.temperature || null,
                sugar_level: item.sugar_level || null,
                toppings: item.toppings || [],
                quantity: 1,
            }];
        });
    }, []);

    const removeItem = useCallback((key) => {
        setItems(prev => prev.filter(i => makeKey(i) !== key));
    }, []);

    const updateQuantity = useCallback((key, qty) => {
        if (qty < 1) return;
        setItems(prev => prev.map(i => makeKey(i) === key ? { ...i, quantity: qty } : i));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, total, makeKey }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
