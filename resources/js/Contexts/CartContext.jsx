import { router } from '@inertiajs/react';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const makeKey = (item) => {
        const vars = [
            item.id,
            item.size,
            item.temperature,
            item.sugar_level,
            item.ice_level,
            item.toppings
                ? JSON.stringify([...item.toppings].sort())
                : '',
        ];
        return vars.filter(Boolean).join('::');
    };

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const res = await window.axios.get(route('cart.items'));
            setItems(res.data.items || []);
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
        router.on('success', fetchCart);
        return () => router.off('success', fetchCart);
    }, [fetchCart]);

    const addItem = useCallback(
        async (item) => {
            try {
                    await window.axios.post(route('cart.items.store'), {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image || null,
                        size: item.size || null,
                        temperature: item.temperature || null,
                        sugar_level: item.sugar_level || null,
                        ice_level: item.ice_level || null,
                        toppings: item.toppings || [],
                    });
                await fetchCart();
            } catch {
                //
            }
        },
        [fetchCart],
    );

    const removeItem = useCallback(
        async (key) => {
            const item = items.find((i) => makeKey(i) === key);
            if (!item) return;
            try {
                await window.axios.delete(
                    route('cart.items.destroy', item.cart_item_id),
                );
                await fetchCart();
            } catch {
                //
            }
        },
        [items, fetchCart],
    );

    const updateQuantity = useCallback(
        async (key, qty) => {
            if (qty < 1) return;
            const item = items.find((i) => makeKey(i) === key);
            if (!item) return;
            try {
                await window.axios.put(
                    route('cart.items.update', item.cart_item_id),
                    { quantity: qty },
                );
                await fetchCart();
            } catch {
                //
            }
        },
        [items, fetchCart],
    );

    const clearCart = useCallback(async () => {
        try {
            await window.axios.delete(route('cart.clear'));
            await fetchCart();
        } catch {
            //
        }
    }, [fetchCart]);

    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                cartCount,
                total,
                makeKey,
                loading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
