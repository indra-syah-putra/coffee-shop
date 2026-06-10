import { useCart } from '@/Contexts/CartContext';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Navbar({
    auth,
    cartCount: propCartCount,
    alwaysShow = false,
}) {
    const { settings: globalSettings } = usePage().props;
    const settings = globalSettings || {};
    const { cartCount: ctxCartCount } = useCart();
    const cartCount =
        propCartCount !== undefined ? propCartCount : ctxCartCount;
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
        <nav
            className={`fixed z-50 w-full transition-all duration-500 ${scrolled || alwaysShow ? 'glass-nav py-4' : 'bg-transparent py-6'}`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tighter md:text-3xl"
                >
                    <span
                        className={
                            scrolled || alwaysShow ? 'text-gold' : 'text-white'
                        }
                    >
                        {settings.store_name || 'KAFEIN'}
                    </span>
                </Link>

                <div className="hidden items-center space-x-10 md:flex">
                    <a
                        href="/#menu"
                        className="font-medium text-white transition-colors hover:text-gold"
                    >
                        Menu
                    </a>
                    <a
                        href="/#story"
                        className="font-medium text-white transition-colors hover:text-gold"
                    >
                        Cerita Kami
                    </a>
                    <a
                        href="/#reservation"
                        className="font-medium text-white transition-colors hover:text-gold"
                    >
                        Reservasi
                    </a>

                    {auth?.user ? (
                        <div className="flex items-center space-x-6">
                            <Link
                                href={route('cart')}
                                className="relative text-white transition-colors hover:text-gold"
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
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                                    />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-espresso">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowDropdown(!showDropdown)
                                    }
                                    className="flex items-center space-x-1 font-medium text-white transition-colors hover:text-gold"
                                >
                                    <span>Akun</span>
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
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {showDropdown && (
                                    <div
                                        className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gold/10 bg-white py-2 shadow-2xl"
                                        onMouseLeave={() =>
                                            setShowDropdown(false)
                                        }
                                    >
                                        <Link
                                            href={route('my-bookings')}
                                            className="block px-5 py-2.5 text-sm font-medium text-espresso transition-colors hover:bg-gold/5"
                                        >
                                            Riwayat Booking
                                        </Link>
                                        <Link
                                            href={route('my-orders')}
                                            className="block px-5 py-2.5 text-sm font-medium text-espresso transition-colors hover:bg-gold/5"
                                        >
                                            Riwayat Pemesanan
                                        </Link>
                                        <Link
                                            href={route('profile.edit')}
                                            className="block px-5 py-2.5 text-sm font-medium text-espresso transition-colors hover:bg-gold/5"
                                        >
                                            Profil
                                        </Link>
                                        <hr className="my-1 border-gold/10" />
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block w-full px-5 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                                        >
                                            Keluar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-6">
                            <Link
                                href={route('login')}
                                className="font-medium text-white transition-colors hover:text-gold"
                            >
                                Masuk
                            </Link>
                            <Link
                                href={route('register')}
                                className="btn-premium px-6 py-2 text-sm"
                            >
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
