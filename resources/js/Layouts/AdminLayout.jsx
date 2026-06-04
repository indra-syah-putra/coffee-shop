import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navItems = [
    {
        name: 'Dashboard',
        route: 'admin.dashboard',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        name: 'Kelola Menu',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
        ),
    },
    {
        name: 'Laporan',
        route: 'admin.reports.index',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        name: 'Pengaturan',
        route: 'admin.settings.index',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

export default function AdminLayout({ header, children }) {
    const { auth, flash, url } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState(['Kelola Menu', 'Kelola Pemesanan']);

    const toggleMenu = (name) => {
        setExpandedMenus((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    };

    const isActive = (routeName) => {
        const current = (url || '').split('/').filter(Boolean);
        
        if (routeName === 'admin.dashboard') return current.length === 1 && current[0] === 'dashboardadmin';
        if (routeName === 'admin.menu-items.index') return current.includes('menu-items');
        if (routeName === 'admin.categories.index') return current.includes('categories');
        if (routeName === 'admin.bookings.index') return current.includes('bookings');
        if (routeName === 'admin.orders.index') return current.includes('orders');
        if (routeName === 'admin.promos.index') return current.includes('promos');
        if (routeName === 'admin.reports.index') return current.includes('reports');
        if (routeName === 'admin.settings.index') return current.includes('settings');
        return false;
    };

    const isChildActive = (routes) => {
        const current = (url || '').split('/').filter(Boolean);
        return routes.some((r) => {
            if (r === 'admin.menu-items.index') return current.includes('menu-items');
            if (r === 'admin.categories.index') return current.includes('categories');
            if (r === 'admin.orders.index') return current.includes('orders');
            if (r === 'admin.bookings.index') return current.includes('bookings');
            return false;
        });
    };

    return (
        <div className="min-h-screen bg-cream-dark flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-espresso transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-gold/10">
                        <Link href="/dashboardadmin" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                                <span className="text-espresso font-bold text-sm">K</span>
                            </div>
                            <div>
                                <span className="text-white font-bold text-lg tracking-tighter">KAFEIN</span>
                                <span className="block text-xs text-gold/60 uppercase tracking-widest">Admin Panel</span>
                            </div>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-cream/60 hover:text-cream">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            if (item.children) {
                                const expanded = expandedMenus.includes(item.name);
                                const childActive = isChildActive(item.children.map((c) => c.route));
                                return (
                                    <div key={item.name}>
                                        <button
                                            onClick={() => toggleMenu(item.name)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                                childActive
                                                    ? 'bg-gold/20 text-gold font-semibold'
                                                    : 'text-cream/60 hover:text-cream hover:bg-cream/5'
                                            }`}
                                        >
                                            <span className={childActive ? 'text-gold' : 'text-cream/40'}>{item.icon}</span>
                                            <span className="text-sm">{item.name}</span>
                                            <svg
                                                className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                                                    expanded ? 'rotate-90' : ''
                                                } ${childActive ? 'text-gold' : 'text-cream/40'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        {expanded && (
                                            <div className="ml-4 mt-1 space-y-1 border-l border-gold/10 pl-3">
                                                {item.children.map((child) => {
                                                    const active = isActive(child.route);
                                                    return (
                                                        <Link
                                                            key={child.route}
                                                            href={route(child.route)}
                                                            className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                                                                active
                                                                    ? 'bg-gold/15 text-gold font-semibold'
                                                                    : 'text-cream/50 hover:text-cream hover:bg-cream/5'
                                                            }`}
                                                        >
                                                            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-gold' : 'bg-cream/20'}`} />
                                                            <span className="text-sm">{child.name}</span>
                                                            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
                                                        </Link>
                                                    );
                                                })}
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
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                        active
                                            ? 'bg-gold/20 text-gold font-semibold'
                                            : 'text-cream/60 hover:text-cream hover:bg-cream/5'
                                    }`}
                                >
                                    <span className={active ? 'text-gold' : 'text-cream/40'}>{item.icon}</span>
                                    <span className="text-sm">{item.name}</span>
                                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User */}
                    <div className="border-t border-gold/10 px-4 py-4">
                        <div className="flex items-center space-x-3 px-4 py-3">
                            <div className="w-9 h-9 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-cream truncate">{user?.name}</p>
                                <Link href={route('profile.edit')} className="text-xs text-cream/40 hover:text-gold transition-colors">Profil</Link>
                            </div>
                        </div>
                        <div className="mt-2 px-4">
                            <Link href="/" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-cream/40 hover:text-cream hover:bg-cream/5 transition-all text-xs">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Kembali ke Website</span>
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-cream/40 hover:text-red-400 hover:bg-red-500/5 transition-all text-xs">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white shadow-sm border-b border-gold/10 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-espresso/60 hover:text-espresso">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            {header}
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg text-espresso/50 hover:text-gold hover:bg-gold/5 transition-all text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Website</span>
                            </Link>
                            <div className="h-6 w-px bg-gold/10 hidden sm:block" />
                            <Link href={route('logout')} method="post" as="button" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-espresso/50 hover:text-red-500 hover:bg-red-50 transition-all text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline">Keluar</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mx-6 mt-4 px-6 py-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>

                {/* Footer */}
                <footer className="px-6 py-4 border-t border-gold/10">
                    <p className="text-center text-xs text-espresso/30">&copy; {new Date().getFullYear()} KAFEIN. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}