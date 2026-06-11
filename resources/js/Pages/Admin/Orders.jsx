import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const statusStyles = {
    pending: {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        dot: 'bg-amber-500',
        label: 'Menunggu',
    },
    confirmed: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        dot: 'bg-blue-500',
        label: 'Dikonfirmasi',
    },
    processing: {
        bg: 'bg-violet-100',
        text: 'text-violet-700',
        dot: 'bg-violet-500',
        label: 'Diproses',
    },
    completed: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        dot: 'bg-emerald-500',
        label: 'Selesai',
    },
    cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        dot: 'bg-red-500',
        label: 'Dibatalkan',
    },
};

export default function AdminOrders({ orders: initialOrders }) {
    const [orders, setOrders] = useState(initialOrders || []);
    const [changing, setChanging] = useState(null);
    const [selected, setSelected] = useState({});
    const [search, setSearch] = useState('');

    const filteredOrders = orders.filter((o) =>
        o.order_number.toLowerCase().includes(search.toLowerCase()),
    );
    const { flash } = usePage().props;

    useEffect(() => {
        setOrders(initialOrders || []);
    }, [initialOrders]);

    const updateStatus = (id, status) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status } : o)),
        );
        router.put(
            route('admin.orders.update', id),
            { status },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onFinish: () => setChanging(null),
            },
        );
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
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Kelola Pesanan
                </h2>
            }
        >
            <Head title="Admin | Orders" />

            <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
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
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-espresso">
                            Daftar Pesanan
                        </h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <svg
                                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/30"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nomor pesanan..."
                                className="w-56 rounded-lg border border-gold/10 bg-cream-dark py-2 pl-9 pr-3 text-sm placeholder-espresso/30 focus:border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold/30"
                            />
                        </div>
                        <span className="rounded-full bg-cream-dark px-3 py-1 text-xs font-medium text-espresso/40">
                            {filteredOrders.length} pesanan
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredOrders.map((order) => {
                        const status =
                            statusStyles[order.status] || statusStyles.pending;
                        return (
                            <div
                                key={order.id}
                                className="rounded-xl border border-gold/5 bg-cream-dark p-5 transition-all hover:border-gold/20"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-bold text-white">
                                            {order.user.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || '?'}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-espresso">
                                                {order.user.name}
                                            </h4>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <span className="font-bold text-gold">
                                                    #{order.id}
                                                </span>
                                                <span className="ml-1.5 rounded bg-gold/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-gold/70">
                                                    {order.order_number}
                                                </span>
                                                <span className="text-sm text-espresso/60">
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
                                            </div>
                                            <div className="mt-2 flex items-center space-x-3">
                                                <span className="font-bold text-gold">
                                                    Rp{' '}
                                                    {Number(
                                                        order.total,
                                                    ).toLocaleString('id-ID')}
                                                </span>
                                                {order.discount > 0 && (
                                                    <span className="text-xs text-emerald-600">
                                                        (Diskon Rp{' '}
                                                        {Number(
                                                            order.discount,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                        )
                                                    </span>
                                                )}
                                                <span
                                                    className={`flex items-center space-x-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${status.bg} ${status.text}`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                                    />
                                                    <span>{status.label}</span>
                                                </span>
                                            </div>
                                            {order.items &&
                                                order.items.length > 0 && (
                                                    <div className="mt-2 space-y-1">
                                                        {order.items.map(
                                                            (item, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="flex items-center gap-2 rounded-md border border-gold/5 bg-white px-2 py-1 text-[11px] text-espresso/60"
                                                                >
                                                                    <span className="font-medium text-espresso/80">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </span>
                                                                    {variantLabel(
                                                                        item,
                                                                    ) && (
                                                                        <span className="text-espresso/30">
                                                                            {variantLabel(
                                                                                item,
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                    <span>
                                                                        x
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                    <span className="text-gold/60">
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
                                        </div>
                                    </div>
                                    <div className="ml-4 flex shrink-0 items-center space-x-2">
                                        {['confirmed', 'cancelled'].includes(order.status) ? (
                                            <span className="inline-flex items-center rounded-full border border-gold/20 bg-white/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-espresso/40">
                                                <svg className="mr-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Final
                                            </span>
                                        ) : (
                                        <select
                                            value={selected[order.id] || ''}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order.id,
                                                    e.target.value,
                                                )
                                            }
                                            disabled={changing === order.id}
                                            className="min-w-[8rem] rounded-lg border border-gold/10 bg-white p-2 text-sm focus:ring-2 focus:ring-gold"
                                        >
                                            <option value="" disabled>
                                                Ubah Status
                                            </option>
                                            {order.status === 'pending' && (
                                                <>
                                                    <option value="processing">
                                                        Diproses
                                                    </option>
                                                    <option value="cancelled">
                                                        Dibatalkan
                                                    </option>
                                                </>
                                            )}
                                            {order.status === 'processing' && (
                                                <>
                                                    <option value="confirmed">
                                                        Dikonfirmasi
                                                    </option>
                                                    <option value="cancelled">
                                                        Dibatalkan
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                        )}

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {filteredOrders.length === 0 && (
                        <div className="py-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark">
                                <svg
                                    className="h-8 w-8 text-espresso/20"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    />
                                </svg>
                            </div>
                            <p className="italic text-espresso/40">
                                Belum ada pesanan.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
