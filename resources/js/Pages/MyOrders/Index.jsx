import Footer from '@/Components/Coffee/Footer';
import Navbar from '@/Components/Coffee/Navbar';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function MyOrders({ auth, orders }) {
    const { flash } = usePage().props;
    const successMsg = flash?.success;

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => {
                const el = document.getElementById('order-success-msg');
                if (el) el.style.opacity = '0';
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const statusLabel = (status) => {
        const map = {
            pending: 'Menunggu',
            confirmed: 'Dikonfirmasi',
            processing: 'Diproses',
            completed: 'Selesai',
            cancelled: 'Dibatalkan',
        };
        return map[status] || status;
    };

    const statusClass = (status) => {
        const map = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-green-100 text-green-700',
            processing: 'bg-blue-100 text-blue-700',
            completed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
        };
        return map[status] || 'bg-gray-100 text-gray-500';
    };

    const variantLabel = (item) => {
        const parts = [];
        if (item.size) parts.push(item.size);
        if (item.temperature) parts.push(item.temperature);
        if (item.ice_level) parts.push(item.ice_level);
        if (item.sugar_level) parts.push('Gula ' + item.sugar_level);
        return parts.length > 0 ? parts.join(' · ') : null;
    };

    return (
        <>
            <Head title="Riwayat Pemesanan" />
            <div className="min-h-screen bg-cream">
                <Navbar auth={auth} alwaysShow={true} />
                <main className="pb-20 pt-32">
                    <div className="mx-auto max-w-4xl px-6">
                        {successMsg && (
                            <div
                                id="order-success-msg"
                                className="mb-6 rounded-xl border border-green-300 bg-green-100 p-4 text-sm font-semibold text-green-800 transition-opacity duration-1000"
                            >
                                {successMsg}
                            </div>
                        )}

                        <h1 className="mb-3 text-3xl font-bold text-espresso">
                            Riwayat Pemesanan
                        </h1>
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center text-sm font-medium text-espresso/60 transition-colors hover:text-gold"
                        >
                            &larr; Kembali
                        </Link>

                        {orders.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="mb-6 italic text-espresso/40">
                                    Anda belum memiliki pesanan.
                                </p>
                                <Link href="/#menu" className="btn-premium">
                                    Pesan Sekarang
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="rounded-2xl border border-gold/20 bg-white p-6"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-lg font-bold text-espresso">
                                                    <span className="font-mono text-base font-bold text-gold">
                                                        {order.order_number}
                                                    </span>
                                                    <span className="font-normal text-espresso/20">
                                                        {' '}|{' '}
                                                    </span>
                                                    <span className="text-base font-normal text-espresso/40">
                                                        {new Date(
                                                            order.created_at,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                timeZone: 'Asia/Jakarta',
                                                            },
                                                        ) + ' • ' + new Date(
                                                            order.created_at,
                                                        ).toLocaleTimeString(
                                                            'id-ID',
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                timeZone: 'Asia/Jakarta',
                                                            },
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                            <span
                                                className={`rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-widest ${statusClass(order.status)}`}
                                            >
                                                {statusLabel(order.status)}
                                            </span>
                                        </div>
                                        {order.items &&
                                            order.items.length > 0 && (
                                                <div className="space-y-2 border-t border-gold/10 pt-3">
                                                    {order.items.map(
                                                        (item, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-center justify-between text-sm"
                                                            >
                                                                <div>
                                                                    <span className="font-medium text-espresso">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </span>
                                                                    {variantLabel(
                                                                        item,
                                                                    ) && (
                                                                        <span className="ml-2 text-xs text-espresso/40">
                                                                            {variantLabel(
                                                                                item,
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                    <span className="ml-2 text-espresso/40">
                                                                        x
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <span className="font-medium text-gold">
                                                                    Rp{' '}
                                                                    {(
                                                                        item.price *
                                                                        item.quantity
                                                                    ).toLocaleString(
                                                                        'id-ID',
                                                                    )}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                        <div className="mt-3 flex items-center justify-between border-t border-gold/10 pt-3">
                                            <span className="font-bold text-espresso">
                                                Total
                                            </span>
                                            <span className="text-xl font-bold text-gold">
                                                Rp{' '}
                                                {Number(
                                                    order.total,
                                                ).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
