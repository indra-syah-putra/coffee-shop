import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Coffee/Navbar';
import Footer from '@/Components/Coffee/Footer';
import { useCart } from '@/Contexts/CartContext';
import { useState } from 'react';

function getCheckoutItems() {
    try {
        const saved = localStorage.getItem('checkoutItems');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export default function Checkout({ auth }) {
    const { removeItem } = useCart();
    const [processing, setProcessing] = useState(false);
    const [items] = useState(getCheckoutItems);

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const submitOrder = () => {
        if (!auth?.user) {
            router.get(route('login'));
            return;
        }
        setProcessing(true);
        router.post(route('orders.store'), {
            items: items.map(i => ({ id: i.id, quantity: i.quantity })),
        }, {
            onSuccess: () => {
                items.forEach(i => removeItem(i.id));
                localStorage.removeItem('checkoutItems');
            },
            onFinish: () => setProcessing(false),
        });
    };

    if (items.length === 0) {
        return (
            <>
                <Head title="Checkout" />
                <div className="bg-cream min-h-screen">
                    <Navbar auth={auth} alwaysShow={true} />
                    <main className="pt-32 pb-20">
                        <div className="max-w-2xl mx-auto px-6 text-center py-20">
                            <p className="text-espresso/40 italic mb-6">Tidak ada item untuk checkout.</p>
                            <Link href="/#menu" className="btn-premium inline-block">Mulai Belanja</Link>
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

            <div className="bg-cream min-h-screen">
                <Navbar auth={auth} alwaysShow={true} />

                <main className="pt-32 pb-20">
                    <div className="max-w-2xl mx-auto px-6">
                        <h1 className="text-3xl font-bold text-espresso mb-8">Checkout</h1>

                        <div className="bg-white rounded-2xl border border-gold/20 p-6 mb-6">
                            <h2 className="font-bold text-espresso text-lg mb-4">Ringkasan Pesanan</h2>
                            <div className="space-y-3">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-espresso/5 last:border-0">
                                        <div className="flex items-center space-x-3">
                                            {item.image && (
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                            )}
                                            <div>
                                                <p className="font-semibold text-espresso">{item.name}</p>
                                                <p className="text-espresso/40 text-sm">{item.quantity} x Rp {Number(item.price).toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>
                                        <p className="text-gold font-bold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-2 border-t border-gold/10">
                                <span className="font-bold text-espresso text-lg">Total</span>
                                <span className="text-gold font-bold text-2xl">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gold/20 p-6 mb-6">
                            <h2 className="font-bold text-espresso text-lg mb-4">Metode Pembayaran</h2>
                            <div className="flex items-center space-x-4 p-4 bg-light-brown/10 rounded-xl border border-light-brown/20">
                                <svg className="w-8 h-8 text-espresso/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-espresso">Bayar di Tempat (Cash)</p>
                                    <p className="text-espresso/40 text-sm">Bayar langsung saat mengambil pesanan</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={submitOrder} disabled={processing}
                            className="btn-premium w-full text-center text-lg disabled:opacity-40">
                            {processing ? 'Memproses...' : `Konfirmasi & Bayar Rp ${total.toLocaleString('id-ID')}`}
                        </button>

                        <div className="text-center mt-4">
                            <button onClick={() => router.get(route('cart'))} className="text-espresso/40 hover:text-espresso transition-colors text-sm">
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
