import { Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/Contexts/CartContext';

export default function Navbar({ auth, cartCount: propCartCount, alwaysShow = false }) {
    const { cartCount: ctxCartCount } = useCart();
    const cartCount = propCartCount !== undefined ? propCartCount : ctxCartCount;
    const [scrolled, setScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || alwaysShow ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tighter">
                    <span className={scrolled || alwaysShow ? 'text-gold' : 'text-white'}>KAFEIN</span>
                </Link>

                <div className="hidden md:flex items-center space-x-10">
                    <a href="/#menu" className="text-white hover:text-gold transition-colors font-medium">Menu</a>
                    <a href="/#story" className="text-white hover:text-gold transition-colors font-medium">Cerita Kami</a>
                    <a href="/#reservation" className="text-white hover:text-gold transition-colors font-medium">Reservasi</a>

                    {auth?.user ? (
                        <div className="flex items-center space-x-6">
                            <Link href={route('cart')} className="relative text-white hover:text-gold transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gold text-espresso text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
                                )}
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="text-white hover:text-gold transition-colors font-medium flex items-center space-x-1"
                                >
                                    <span>Akun</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gold/10 py-2 z-50"
                                        onMouseLeave={() => setShowDropdown(false)}>
                                        <Link href={route('my-bookings')} className="block px-5 py-2.5 text-espresso hover:bg-gold/5 transition-colors text-sm font-medium">Riwayat Booking</Link>
                                        <Link href={route('my-orders')} className="block px-5 py-2.5 text-espresso hover:bg-gold/5 transition-colors text-sm font-medium">Riwayat Pemesanan</Link>
                                        <Link href={route('profile.edit')} className="block px-5 py-2.5 text-espresso hover:bg-gold/5 transition-colors text-sm font-medium">Profil</Link>
                                        <hr className="my-1 border-gold/10" />
                                        <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-5 py-2.5 text-red-500 hover:bg-red-50 transition-colors text-sm font-medium">Keluar</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-6">
                            <Link href={route('login')} className="text-white hover:text-gold transition-colors font-medium">Masuk</Link>
                            <Link href={route('register')} className="btn-premium py-2 px-6 text-sm">Daftar</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
