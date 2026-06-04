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
        route: 'admin.menu-items.index',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        ),
    },
    {
        name: 'Reservasi',
        route: 'admin.bookings.index',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        name: 'Pesanan',
        route: 'admin.orders.index',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
    },
    {
        name: 'Daily Specials',
        route: 'admin.specials',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        ),
    },
];

export default function AdminLayout({ header, children }) {
    const { auth, flash, url } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isActive = (routeName) => {
        // Ditambahkan fallback (url || '') untuk mencegah error 'undefined' sewaktu render awal
        const current = (url || '').split('/').filter(Boolean);
        
        if (routeName === 'admin.dashboard') return current.length === 1 && current[0] === 'dashboardadmin';
        if (routeName === 'admin.menu-items.index') return current.includes('menu-items');
        if (routeName === 'admin.bookings.index') return current.includes('bookings');
        if (routeName === 'admin.orders.index') return current.includes('orders');
        if (routeName === 'admin.specials') return current.includes('specials');
        return false;
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