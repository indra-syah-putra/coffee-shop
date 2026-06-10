import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const navItems = [
    {
        name: 'Dashboard',
        route: 'admin.dashboard',
        icon: (
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </svg>
        ),
    },
    {
        name: 'Kelola Menu',
        icon: (
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
                    d="M4 6h16M4 12h16M4 18h7"
                />
            </svg>
        ),
        children: [
            {
                name: 'Menu',
                route: 'admin.menu-items.index',
            },
            {
                name: 'Kategori',
                route: 'admin.categories.index',
            },
        ],
    },
    {
        name: 'Kelola Pemesanan',
        icon: (
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
        ),
        children: [
            {
                name: 'Pesanan',
                route: 'admin.orders.index',
            },
            {
                name: 'Reservasi',
                route: 'admin.bookings.index',
            },
        ],
    },
    {
        name: 'Promo',
        route: 'admin.promos.index',
        icon: (
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
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
            </svg>
        ),
    },
    {
        name: 'Laporan',
        icon: (
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        children: [
            {
                name: 'Ringkasan',
                route: 'admin.reports.index',
            },
            {
                name: 'Menu Terlaris',
                route: 'admin.reports.index',
                params: { tab: 'menu-terlaris' },
            },
            {
                name: 'Pendapatan',
                route: 'admin.reports.index',
                params: { tab: 'pendapatan' },
            },
            {
                name: 'Kategori',
                route: 'admin.reports.index',
                params: { tab: 'kategori' },
            },
            {
                name: 'Pesanan',
                route: 'admin.reports.index',
                params: { tab: 'pesanan' },
            },
        ],
    },
    {
        name: 'Pengaturan',
        route: 'admin.settings.index',
        icon: (
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
];

export default function AdminLayout({ header, children }) {
    const { auth, flash, url } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);
    const flashTimer = useRef(null);

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);
            clearTimeout(flashTimer.current);
            flashTimer.current = setTimeout(() => setShowFlash(false), 4000);
        }
        return () => clearTimeout(flashTimer.current);
    }, [flash?.success]);
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState([
        'Kelola Menu',
        'Kelola Pemesanan',
    ]);

    const toggleMenu = (name) => {
        setExpandedMenus((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name],
        );
    };

    const getSearchParams = () => {
        const idx = (url || '').indexOf('?');
        if (idx === -1) return {};
        return Object.fromEntries(new URLSearchParams(url.slice(idx)));
    };

    const isActive = (routeName, params) => {
        const current = (url || '').split('/').filter(Boolean);
        const search = getSearchParams();

        if (routeName === 'admin.dashboard')
            return current.length === 1 && current[0] === 'dashboardadmin';
        if (routeName === 'admin.menu-items.index')
            return current.includes('menu-items');
        if (routeName === 'admin.categories.index')
            return current.includes('categories');
        if (routeName === 'admin.bookings.index')
            return current.includes('bookings');
        if (routeName === 'admin.orders.index')
            return current.includes('orders');
        if (routeName === 'admin.promos.index')
            return current.includes('promos');
        if (routeName === 'admin.reports.index') {
            if (params?.tab)
                return current.includes('reports') && search.tab === params.tab;
            return current.includes('reports') && !search.tab;
        }
        if (routeName === 'admin.settings.index')
            return current.includes('settings');
        return false;
    };

    const isChildActive = (children) => {
        const current = (url || '').split('/').filter(Boolean);
        return children.some((child) => {
            const r = child.route;
            if (r === 'admin.menu-items.index')
                return current.includes('menu-items');
            if (r === 'admin.categories.index')
                return current.includes('categories');
            if (r === 'admin.orders.index') return current.includes('orders');
            if (r === 'admin.bookings.index')
                return current.includes('bookings');
            if (r === 'admin.reports.index') return current.includes('reports');
            return false;
        });
    };

    return (
        <div className="flex min-h-screen overflow-hidden bg-cream-dark">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-espresso transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex h-screen flex-col">
                    {/* Brand */}
                    <div className="flex items-center justify-between border-b border-gold/10 px-6 py-6">
                        <Link
                            href="/dashboardadmin"
                            className="flex items-center space-x-3"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold">
                                <span className="text-sm font-bold text-espresso">
                                    K
                                </span>
                            </div>
                            <div>
                                <span className="text-lg font-bold tracking-tighter text-white">
                                    KAFEIN
                                </span>
                                <span className="block text-xs uppercase tracking-widest text-gold/60">
                                    Admin Panel
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-cream/60 hover:text-cream lg:hidden"
                        >
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                        {navItems.map((item) => {
                            if (item.children) {
                                const expanded = expandedMenus.includes(
                                    item.name,
                                );
                                const childActive = isChildActive(
                                    item.children,
                                );
                                return (
                                    <div key={item.name}>
                                        <button
                                            onClick={() =>
                                                toggleMenu(item.name)
                                            }
                                            className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                                                childActive
                                                    ? 'bg-gold/20 font-semibold text-gold'
                                                    : 'text-cream/60 hover:bg-cream/5 hover:text-cream'
                                            }`}
                                        >
                                            <span
                                                className={
                                                    childActive
                                                        ? 'text-gold'
                                                        : 'text-cream/40'
                                                }
                                            >
                                                {item.icon}
                                            </span>
                                            <span className="text-sm">
                                                {item.name}
                                            </span>
                                            <svg
                                                className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                                                    expanded ? 'rotate-90' : ''
                                                } ${childActive ? 'text-gold' : 'text-cream/40'}`}
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
                                        </button>
                                        {expanded && (
                                            <div className="ml-4 mt-1 space-y-1 border-l border-gold/10 pl-3">
                                                {item.children.map(
                                                    (child, ci) => {
                                                        const active = isActive(
                                                            child.route,
                                                            child.params,
                                                        );
                                                        return (
                                                            <Link
                                                                key={
                                                                    child.route +
                                                                    (ci > 0
                                                                        ? ci
                                                                        : '')
                                                                }
                                                                href={
                                                                    child.params
                                                                        ? route(
                                                                              child.route,
                                                                              child.params,
                                                                          )
                                                                        : route(
                                                                              child.route,
                                                                          )
                                                                }
                                                                className={`flex items-center space-x-3 rounded-xl px-4 py-2.5 transition-all duration-200 ${
                                                                    active
                                                                        ? 'bg-gold/15 font-semibold text-gold'
                                                                        : 'text-cream/50 hover:bg-cream/5 hover:text-cream'
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-gold' : 'bg-cream/20'}`}
                                                                />
                                                                <span className="text-sm">
                                                                    {child.name}
                                                                </span>
                                                                {active && (
                                                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
                                                                )}
                                                            </Link>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            const active = isActive(item.route);
                            return (
                                <Link
                                    key={item.route}
                                    href={route(item.route)}
                                    className={`flex items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                                        active
                                            ? 'bg-gold/20 font-semibold text-gold'
                                            : 'text-cream/60 hover:bg-cream/5 hover:text-cream'
                                    }`}
                                >
                                    <span
                                        className={
                                            active
                                                ? 'text-gold'
                                                : 'text-cream/40'
                                        }
                                    >
                                        {item.icon}
                                    </span>
                                    <span className="text-sm">{item.name}</span>
                                    {active && (
                                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User */}
                    <div className="border-t border-gold/10 px-4 py-4">
                        <div className="flex items-center space-x-3 px-4 py-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
                                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-cream">
                                    {user?.name}
                                </p>
                                <Link
                                    href={route('admin.profile')}
                                    className="text-xs text-cream/40 transition-colors hover:text-gold"
                                >
                                    Profil
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2 px-4">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center space-x-2 rounded-lg px-4 py-2 text-xs text-cream/40 transition-all hover:bg-red-500/5 hover:text-red-400"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex h-screen flex-1 flex-col lg:ml-64">
                {/* Top Bar */}
                <header className="z-30 border-b border-gold/10 bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-espresso/60 hover:text-espresso lg:hidden"
                            >
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
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            {header}
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="hidden items-center space-x-2 rounded-lg px-4 py-2 text-sm text-espresso/50 transition-all hover:bg-gold/5 hover:text-gold sm:flex"
                            >
                                <span>Lihat Website</span>
                            </Link>
                            <div className="hidden h-6 w-px bg-gold/10 sm:block" />
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm text-espresso/50 transition-all hover:bg-red-50 hover:text-red-500"
                            >
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className="hidden sm:inline">Keluar</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Flash Message */}
                {showFlash && flash?.success && (
                    <div className="mx-6 mt-4 flex items-center space-x-3 rounded-xl border border-green-200 bg-green-50 px-6 py-4 text-sm font-medium text-green-700 transition-opacity duration-500">
                        <svg
                            className="h-5 w-5 shrink-0 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{flash.success}</span>
                        <button
                            onClick={() => setShowFlash(false)}
                            className="ml-auto text-green-500 hover:text-green-700"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Page Content */}
                <main className="min-h-0 flex-1 overflow-y-auto p-6">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-gold/10 px-6 py-4">
                    <p className="text-center text-xs text-espresso/30">
                        &copy; {new Date().getFullYear()} KAFEIN. All rights
                        reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
