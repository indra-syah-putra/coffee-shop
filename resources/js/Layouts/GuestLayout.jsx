import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-cream pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link
                    href="/"
                    className="text-3xl font-bold tracking-tighter text-espresso"
                >
                    KAFEIN
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden border border-gold/10 bg-white px-8 py-10 shadow-2xl sm:max-w-md sm:rounded-2xl">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-espresso">Kafein</h2>
                    <p className="text-sm text-espresso/40">
                        Selamat datang kembali
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
}
