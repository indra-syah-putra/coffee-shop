import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Coffee/Navbar';
import Footer from '@/Components/Coffee/Footer';
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
        if (item.temperature) parts.push(item.temperature === 'hot' ? 'Panas' : 'Dingin');
        if (item.sugar_level) parts.push('Gula ' + item.sugar_level);
        return parts.length > 0 ? parts.join(' · ') : null;
    };

    return (
        <>
            <Head title="Riwayat Pemesanan" />
            <div className="bg-cream min-h-screen">
                <Navbar auth={auth} alwaysShow={true} />
                <main className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-6">
                        {successMsg && (
                            <div id="order-success-msg" className="bg-green-100 border border-green-300 text-green-800 rounded-xl p-4 mb-6 transition-opacity duration-1000 text-sm font-semibold">
                                {successMsg}
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-10">
                            <h1 className="text-3xl font-bold text-espresso">Riwayat Pemesanan</h1>
                            <Link href="/" className="text-espresso/60 hover:text-gold transition-colors text-sm font-medium">&larr; Kembali</Link>
                        </div>

                        {orders.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-espresso/40 italic mb-6">Anda belum memiliki pesanan.</p>
                                <Link href="/#menu" className="btn-premium">Pesan Sekarang</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order.id} className="bg-white rounded-2xl border border-gold/20 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <p className="font-bold text-espresso text-lg">Pesanan #{order.id}</p>
                                                <p className="text-espresso/40 text-sm">{order.created_at}</p>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest ${statusClass(order.status)}`}>
                                                {statusLabel(order.status)}
                                            </span>
                                        </div>
                                        {order.items && order.items.length > 0 && (
                                            <div className="border-t border-gold/10 pt-3 space-y-2">
                                                {order.items.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center text-sm">
                                                        <div>
                                                            <span className="text-espresso font-medium">{item.name}</span>
                                                            {variantLabel(item) && <span className="text-espresso/40 text-xs ml-2">{variantLabel(item)}</span>}
                                                            <span className="text-espresso/40 ml-2">x{item.quantity}</span>
                                                        </div>
                                                        <span className="text-gold font-medium">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="border-t border-gold/10 pt-3 mt-3 flex justify-between items-center">
                                            <span className="text-espresso font-bold">Total</span>
                                            <span className="text-gold font-bold text-xl">Rp {Number(order.total).toLocaleString('id-ID')}</span>
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
