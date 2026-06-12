import Footer from '@/Components/Coffee/Footer';
import Navbar from '@/Components/Coffee/Navbar';
import { useCart } from '@/Contexts/CartContext';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Cart({ auth }) {
    const { items, updateQuantity, removeItem, total, makeKey } = useCart();
    const [selected, setSelected] = useState(() =>
        items.map((i) => makeKey(i)),
    );

    const toggleItem = (key) => {
        setSelected((prev) =>
            prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key],
        );
    };

    const toggleAll = () => {
        setSelected((prev) =>
            prev.length === items.length ? [] : items.map((i) => makeKey(i)),
        );
    };

    const selectedItems = items.filter((i) => selected.includes(makeKey(i)));
    const selectedTotal = selectedItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
    );

    const variantLabel = (item) => {
        const parts = [];
        if (item.size) parts.push(item.size);
        if (item.temperature) parts.push(item.temperature);
        if (item.ice_level) parts.push(item.ice_level);
        if (item.sugar_level) parts.push('Gula ' + item.sugar_level);
        return parts.length > 0 ? parts.join(' · ') : null;
    };

    const checkout = () => {
        if (!auth?.user) {
            router.get(route('login'));
            return;
        }
        if (selectedItems.length === 0) return;
        localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
        router.get(route('checkout'));
    };

    return (
        <>
            <Head title="Keranjang Belanja" />
            <div className="min-h-screen bg-cream">
                <Navbar auth={auth} alwaysShow={true} />
                <main className="pb-20 pt-32">
                    <div className="mx-auto max-w-4xl px-6">
                        <h1 className="mb-8 text-3xl font-bold text-espresso">
                            Keranjang Belanja
                        </h1>

                        {items.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="mb-6 italic text-espresso/40">
                                    Keranjang Anda masih kosong.
                                </p>
                                <a href="/#menu" className="btn-premium">
                                    Mulai Belanja
                                </a>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 flex items-center justify-between border-b border-gold/10 pb-4">
                                    <label className="flex cursor-pointer items-center space-x-3 text-sm font-medium text-espresso/60">
                                        <input
                                            type="checkbox"
                                            checked={
                                                selected.length === items.length
                                            }
                                            onChange={toggleAll}
                                            className="h-5 w-5 cursor-pointer rounded border-2 border-espresso/30 checked:border-gold checked:bg-gold focus:ring-gold"
                                        />
                                        <span>Pilih Semua</span>
                                    </label>
                                    <span className="text-sm text-espresso/40">
                                        {items.length} item
                                    </span>
                                </div>

                                <div className="mb-8 space-y-4">
                                    {items.map((item) => {
                                        const key = makeKey(item);
                                        return (
                                            <div
                                                key={key}
                                                className="flex items-center gap-4 rounded-2xl border border-gold/10 bg-white p-5"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selected.includes(
                                                        key,
                                                    )}
                                                    onChange={() =>
                                                        toggleItem(key)
                                                    }
                                                    className="h-5 w-5 shrink-0 cursor-pointer rounded border-2 border-espresso/30 checked:border-gold checked:bg-gold focus:ring-gold"
                                                />
                                                {item.image && (
                                                    <img
                                                        src={
                                                            item.image.startsWith(
                                                                'http',
                                                            )
                                                                ? item.image
                                                                : `/storage/${item.image}`
                                                        }
                                                        alt={item.name}
                                                        loading="lazy"
                                                        onError={(e) => { e.target.style.display = 'none' }}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate font-bold text-espresso">
                                                        {item.name}
                                                    </h3>
                                                    {variantLabel(item) && (
                                                        <p className="text-xs text-espresso/40">
                                                            {variantLabel(item)}
                                                        </p>
                                                    )}
                                                    {item.toppings?.length >
                                                        0 && (
                                                        <p className="text-xs text-espresso/30">
                                                            +{' '}
                                                            {item.toppings
                                                                .map((t) => {
                                                                    const found =
                                                                        item.toppings?.find(
                                                                            (
                                                                                x,
                                                                            ) =>
                                                                                String(
                                                                                    x.id,
                                                                                ) ===
                                                                                String(
                                                                                    t,
                                                                                ),
                                                                        );
                                                                    return typeof t ===
                                                                        'string'
                                                                        ? t
                                                                        : t.name;
                                                                })
                                                                .filter(Boolean)
                                                                .join(', ')}
                                                        </p>
                                                    )}
                                                    <p className="mt-0.5 text-sm font-semibold text-gold">
                                                        Rp{' '}
                                                        {Number(
                                                            item.price,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center rounded-lg border border-gold/20">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    key,
                                                                    item.quantity -
                                                                        1,
                                                                )
                                                            }
                                                            className="px-3 py-1.5 text-sm font-bold text-espresso transition-colors hover:bg-gold/5"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                item.quantity
                                                            }
                                                            onChange={(e) => {
                                                                const val =
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                        10,
                                                                    );
                                                                if (
                                                                    !isNaN(
                                                                        val,
                                                                    ) &&
                                                                    val >= 1
                                                                )
                                                                    updateQuantity(
                                                                        key,
                                                                        val,
                                                                    );
                                                            }}
                                                            onBlur={(e) => {
                                                                if (
                                                                    !e.target
                                                                        .value ||
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                        10,
                                                                    ) < 1
                                                                )
                                                                    updateQuantity(
                                                                        key,
                                                                        1,
                                                                    );
                                                            }}
                                                            className="w-10 border-x border-gold/20 px-1 py-1.5 text-center text-sm font-bold text-espresso outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    key,
                                                                    item.quantity +
                                                                        1,
                                                                )
                                                            }
                                                            className="px-3 py-1.5 text-sm font-bold text-espresso transition-colors hover:bg-gold/5"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <p className="w-24 text-right text-sm font-bold text-espresso">
                                                        Rp{' '}
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            removeItem(key)
                                                        }
                                                        className="text-red-400 transition-colors hover:text-red-600"
                                                    >
                                                        <svg
                                                            className="h-5 w-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="sticky bottom-4 rounded-2xl border border-gold/20 bg-white p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-sm text-espresso/60">
                                            {selectedItems.length} dari{' '}
                                            {items.length} item dipilih
                                        </span>
                                        <span className="font-bold text-espresso">
                                            Total:{' '}
                                            <span className="ml-2 text-xl text-gold">
                                                Rp{' '}
                                                {selectedTotal.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </span>
                                        </span>
                                    </div>
                                    <button
                                        onClick={checkout}
                                        disabled={selectedItems.length === 0}
                                        className="btn-premium w-full text-center disabled:opacity-40"
                                    >
                                        Checkout ({selectedItems.length} item)
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
