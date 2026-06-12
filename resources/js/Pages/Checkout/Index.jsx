import Footer from '@/Components/Coffee/Footer';
import Navbar from '@/Components/Coffee/Navbar';
import { useCart } from '@/Contexts/CartContext';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Checkout({ auth, promos }) {
    const { items: cartItems, removeItem, makeKey, clearCart } = useCart();
    const [processing, setProcessing] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedPromo, setSelectedPromo] = useState('');

    useEffect(() => {
        const saved = (() => {
            try {
                const s = localStorage.getItem('checkoutItems');
                return s ? JSON.parse(s) : [];
            } catch { return []; }
        })();
        if (saved.length > 0) {
            const groups = {};
            for (const item of saved) {
                const vars = [item.id, item.size, item.temperature, item.sugar_level, item.ice_level, item.toppings ? JSON.stringify([...item.toppings].sort()) : ''];
                const key = vars.filter(Boolean).join('::');
                if (groups[key]) groups[key].quantity += item.quantity;
                else groups[key] = { ...item };
            }
            setItems(Object.values(groups));
        } else if (cartItems.length > 0) {
            setItems(cartItems);
        }
    }, [cartItems]);

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const activePromos = promos || [];

    const selectedPromoData = activePromos.find(
        (p) => String(p.id) === String(selectedPromo),
    );
    let discount = 0;
    if (selectedPromoData) {
        if (selectedPromoData.discount_type === 'percentage') {
            discount =
                subtotal * (Number(selectedPromoData.discount_value) / 100);
        } else {
            discount = Math.min(
                Number(selectedPromoData.discount_value),
                subtotal,
            );
        }
    }
    const total = subtotal - discount;

    const variantLabel = (item) => {
        const parts = [];
        if (item.size) parts.push(item.size);
        if (item.temperature) parts.push(item.temperature);
        if (item.ice_level) parts.push(item.ice_level);
        if (item.sugar_level) parts.push('Gula ' + item.sugar_level);
        return parts.length > 0 ? parts.join(' · ') : null;
    };

    const submitOrder = () => {
        if (!auth?.user) {
            router.get(route('login'));
            return;
        }
        setProcessing(true);
        router.post(
            route('orders.store'),
            {
                items: items.map((i) => ({
                    id: i.id,
                    quantity: i.quantity,
                    size: i.size || null,
                    temperature: i.temperature || null,
                    sugar_level: i.sugar_level || null,
                    ice_level: i.ice_level || null,
                    toppings: i.toppings || null,
                })),
                promo_id: selectedPromo || null,
            },
            {
                onSuccess: () => {
                    clearCart();
                    localStorage.removeItem('checkoutItems');
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    if (items.length === 0) {
        return (
            <>
                <Head title="Checkout" />
                <div className="min-h-screen bg-cream">
                    <Navbar auth={auth} alwaysShow={true} />
                    <main className="pb-20 pt-32">
                        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
                            <p className="mb-6 italic text-espresso/40">
                                Tidak ada item untuk checkout.
                            </p>
                            <Link
                                href="/#menu"
                                className="btn-premium inline-block"
                            >
                                Mulai Belanja
                            </Link>
                        </div>
                    </main>
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Checkout" />
            <div className="min-h-screen bg-cream">
                <Navbar auth={auth} alwaysShow={true} />
                <main className="pb-20 pt-32">
                    <div className="mx-auto max-w-2xl px-6">
                        <h1 className="mb-8 text-3xl font-bold text-espresso">
                            Checkout
                        </h1>

                        <div className="mb-6 rounded-2xl border border-gold/20 bg-white p-6">
                            <h2 className="mb-4 text-lg font-bold text-espresso">
                                Ringkasan Pesanan
                            </h2>
                            <div className="space-y-3">
                                {items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between border-b border-espresso/5 py-2 last:border-0"
                                    >
                                        <div className="flex items-center space-x-3">
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
                                            <div>
                                                <p className="font-semibold text-espresso">
                                                    {item.name}
                                                </p>
                                                {variantLabel(item) && (
                                                    <p className="text-xs text-espresso/30">
                                                        {variantLabel(item)}
                                                    </p>
                                                )}
                                                <p className="text-sm text-espresso/40">
                                                    x{item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-gold">
                                            Rp{' '}
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6 rounded-2xl border border-gold/20 bg-white p-6">
                            <h2 className="mb-4 text-lg font-bold text-espresso">
                                Promo / Diskon
                            </h2>
                            {activePromos.length > 0 ? (
                                <select
                                    value={selectedPromo}
                                    onChange={(e) =>
                                        setSelectedPromo(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-gold/10 bg-cream-dark p-3 text-espresso focus:ring-2 focus:ring-gold"
                                >
                                    <option value="">
                                        Pilih promo (opsional)
                                    </option>
                                    {activePromos.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} —{' '}
                                            {p.discount_type === 'percentage'
                                                ? `${Number(p.discount_value)}%`
                                                : `Rp ${Number(p.discount_value).toLocaleString('id-ID')}`}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-sm italic text-espresso/40">
                                    Tidak ada promo yang tersedia saat ini.
                                </p>
                            )}
                        </div>

                        <div className="mb-6 rounded-2xl border border-gold/20 bg-white p-6">
                            <h2 className="mb-4 text-lg font-bold text-espresso">
                                Metode Pembayaran
                            </h2>
                            <div className="flex items-center space-x-4 rounded-xl border border-light-brown/20 bg-light-brown/10 p-4">
                                <svg
                                    className="h-8 w-8 text-espresso/40"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <div>
                                    <p className="font-semibold text-espresso">
                                        Bayar di Tempat (Cash)
                                    </p>
                                    <p className="text-sm text-espresso/40">
                                        Bayar langsung saat mengambil pesanan
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 rounded-2xl border border-gold/20 bg-white p-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-espresso/60">
                                    <span>Subtotal</span>
                                    <span>
                                        Rp {subtotal.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between font-medium text-emerald-600">
                                        <span>Diskon</span>
                                        <span>
                                            -Rp{' '}
                                            {discount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                )}
                                <div className="mt-2 flex items-center justify-between border-t border-gold/10 pt-2">
                                    <span className="text-lg font-bold text-espresso">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold text-gold">
                                        Rp {total.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={submitOrder}
                            disabled={processing}
                            className="btn-premium w-full text-center text-lg disabled:opacity-40"
                        >
                            {processing
                                ? 'Memproses...'
                                : `Konfirmasi & Bayar Rp ${total.toLocaleString('id-ID')}`}
                        </button>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => router.get(route('cart'))}
                                className="text-sm text-espresso/40 transition-colors hover:text-espresso"
                            >
                                &larr; Kembali ke Keranjang
                            </button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
