import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const statusStyles = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Menunggu' },
    confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', label: 'Dikonfirmasi' },
    processing: { bg: 'bg-violet-100', text: 'text-violet-700', dot: 'bg-violet-500', label: 'Diproses' },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Selesai' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: 'Dibatalkan' },
};

export default function AdminOrders({ orders }) {
    const [changing, setChanging] = useState(null);
    const [selected, setSelected] = useState({});

    const updateStatus = (id, status) => {
        setChanging(id);
        setSelected(prev => ({ ...prev, [id]: status }));
        router.put(route('admin.orders.update', id), { status }, {
            preserveScroll: true,
            onFinish: () => setChanging(null),
        });
    };

    return (
        <AdminLayout
            header={<h2 className="font-semibold text-xl text-espresso leading-tight">Kelola Pesanan</h2>}
        >
            <Head title="Admin | Orders" />

            <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-espresso">Daftar Pesanan</h3>
                    </div>
                    <span className="text-xs text-espresso/40 bg-cream-dark px-3 py-1 rounded-full font-medium">{orders.length} pesanan</span>
                </div>

                <div className="space-y-4">
                    {orders.map(order => {
                        const status = statusStyles[order.status] || statusStyles.pending;
                        return (
                            <div key={order.id} className="p-5 bg-cream-dark rounded-xl border border-gold/5 hover:border-gold/20 transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {order.user.name?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-espresso">{order.user.name}</h4>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <span className="text-espresso/60 text-sm">{new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                <span className="text-espresso/20">•</span>
                                                <span className="text-espresso/60 text-sm">{new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 mt-2">
                                                <span className="text-gold font-bold">Rp {Number(order.total).toLocaleString('id-ID')}</span>
                                                <span className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                    <span>{status.label}</span>
                                                </span>
                                            </div>
                                            {order.items && order.items.length > 0 && (
                                                <div className="mt-2 flex items-center flex-wrap gap-1.5">
                                                    {order.items.slice(0, 3).map((item, i) => (
                                                        <span key={i} className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-gold/10 text-espresso/60">
                                                            {item.name} x{item.quantity || 1}
                                                        </span>
                                                    ))}
                                                    {order.items.length > 3 && (
                                                        <span className="text-[11px] text-espresso/40">+{order.items.length - 3} lainnya</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 shrink-0 ml-4">
                                        <select
                                            value={selected[order.id] || ''}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            disabled={changing === order.id}
                                            className="bg-white border border-gold/10 rounded-lg p-2 text-sm min-w-[8rem] focus:ring-2 focus:ring-gold"
                                        >
                                            <option value="" disabled>Ubah Status</option>
                                            <option value="confirmed">Dikonfirmasi</option>
                                            <option value="processing">Diproses</option>
                                            <option value="completed">Selesai</option>
                                            <option value="cancelled">Dibatalkan</option>
                                        </select>
                                        <button onClick={() => { if (confirm('Hapus pesanan ini?')) router.delete(route('admin.orders.destroy', order.id), { preserveScroll: true }); }}
                                            className="p-2 rounded-lg text-espresso/30 hover:text-red-500 hover:bg-red-50 transition-all"
                                            title="Hapus"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {orders.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-dark flex items-center justify-center">
                                <svg className="w-8 h-8 text-espresso/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <p className="text-espresso/40 italic">Belum ada pesanan.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
