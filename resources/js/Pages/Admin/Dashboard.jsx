import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

const statCards = [
    {
        label: 'Menu Items',
        value: 'totalMenuItems',
        color: 'from-amber-500 to-yellow-500',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                />
            </svg>
        ),
        href: 'admin.menu-items.index',
    },
    {
        label: 'Reservasi',
        value: 'totalBookings',
        color: 'from-emerald-500 to-teal-500',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
        href: 'admin.bookings.index',
    },
    {
        label: 'Pesanan',
        value: 'totalOrders',
        color: 'from-violet-500 to-purple-500',
        icon: (
            <svg
                className="h-6 w-6"
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
        ),
        href: 'admin.orders.index',
    },
    {
        label: 'Promo',
        value: 'totalPromos',
        color: 'from-rose-500 to-pink-500',
        icon: (
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
            </svg>
        ),
        href: 'admin.promos.index',
    },
];

const menuCards = [
    {
        label: 'Menu',
        desc: 'Tambah, edit, dan hapus item menu',
        href: 'admin.menu-items.index',
        gradient: 'from-amber-500/10 to-yellow-500/5',
        icon: (
            <svg
                className="h-8 w-8 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                />
            </svg>
        ),
    },
    {
        label: 'Kategori',
        desc: 'Atur kategori menu',
        href: 'admin.categories.index',
        gradient: 'from-orange-500/10 to-amber-500/5',
        icon: (
            <svg
                className="h-8 w-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        ),
    },
    {
        label: 'Pesanan',
        desc: 'Lihat dan kelola pesanan pelanggan',
        href: 'admin.orders.index',
        gradient: 'from-violet-500/10 to-purple-500/5',
        icon: (
            <svg
                className="h-8 w-8 text-violet-500"
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
        ),
    },
    {
        label: 'Reservasi',
        desc: 'Kelola pemesanan meja',
        href: 'admin.bookings.index',
        gradient: 'from-emerald-500/10 to-teal-500/5',
        icon: (
            <svg
                className="h-8 w-8 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
    },
    {
        label: 'Promo',
        desc: 'Atur diskon dan promo',
        href: 'admin.promos.index',
        gradient: 'from-rose-500/10 to-pink-500/5',
        icon: (
            <svg
                className="h-8 w-8 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
            </svg>
        ),
    },
    {
        label: 'Laporan',
        desc: 'Lihat laporan penjualan',
        href: 'admin.reports.index',
        gradient: 'from-emerald-500/10 to-teal-500/5',
        icon: (
            <svg
                className="h-8 w-8 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
    },
];

export default function AdminDashboard({ stats }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Dashboard
                </h2>
            }
        >
            <Head title="Admin | Dashboard" />

            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {statCards.map((card) => (
                        <Link
                            key={card.label}
                            href={route(card.href)}
                            className="group rounded-2xl border border-gold/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div
                                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}
                                >
                                    {card.icon}
                                </div>
                                <span className="text-3xl font-bold text-espresso">
                                    {stats[card.value]}
                                </span>
                            </div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-espresso/50">
                                {card.label}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Menu Grid */}
                <div>
                    <h3 className="mb-4 text-lg font-bold text-espresso">
                        Menu Admin
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {menuCards.map((card) => (
                            <Link
                                key={card.label}
                                href={route(card.href)}
                                className="group rounded-2xl border border-gold/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-center space-x-4">
                                    <div
                                        className={`h-14 w-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                                    >
                                        {card.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-espresso transition-colors group-hover:text-gold">
                                            {card.label}
                                        </h4>
                                        <p className="text-sm text-espresso/50">
                                            {card.desc}
                                        </p>
                                    </div>
                                    <svg
                                        className="ml-auto h-5 w-5 text-espresso/20 transition-colors group-hover:text-gold"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
