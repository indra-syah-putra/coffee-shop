import Footer from '@/Components/Coffee/Footer';
import Navbar from '@/Components/Coffee/Navbar';
import { Head, router, useForm } from '@inertiajs/react';

export default function BookingPayment({ auth, booking }) {
    const { post, processing } = useForm({});

    const submitPayment = () => {
        if (!auth?.user) {
            router.get(route('login'));
            return;
        }
        post(route('bookings.pay', booking.id), {
            onSuccess: () => {
                router.get(route('my-bookings'));
            },
        });
    };

    return (
        <>
            <Head title="Pembayaran Booking" />

            <div className="min-h-screen bg-cream">
                <Navbar auth={auth} alwaysShow={true} />

                <main className="pb-20 pt-32">
                    <div className="mx-auto max-w-2xl px-6">
                        <h1 className="mb-8 text-3xl font-bold text-espresso">
                            Pembayaran Booking
                        </h1>

                        <div className="mb-6 rounded-2xl border border-gold/20 bg-white p-6">
                            <h2 className="mb-4 text-lg font-bold text-espresso">
                                Detail Reservasi
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-espresso/5 py-2">
                                    <span className="text-espresso/60">
                                        Kode Booking
                                    </span>
                                    <span className="font-mono font-bold text-gold">
                                        {booking.booking_number}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-espresso/5 py-2">
                                    <span className="text-espresso/60">
                                        Tanggal
                                    </span>
                                    <span className="font-semibold text-espresso">
                                        {new Date(
                                            booking.date,
                                        ).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-espresso/5 py-2">
                                    <span className="text-espresso/60">
                                        Jam
                                    </span>
                                    <span className="font-semibold text-espresso">
                                        {booking.start_time} -{' '}
                                        {booking.end_time}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-espresso/5 py-2">
                                    <span className="text-espresso/60">
                                        Meja
                                    </span>
                                    <span className="font-semibold capitalize text-espresso">
                                        {booking.table_type}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-espresso/5 py-2">
                                    <span className="text-espresso/60">
                                        Jumlah Tamu
                                    </span>
                                    <span className="font-semibold text-espresso">
                                        {booking.guests} orang
                                    </span>
                                </div>
                                {booking.notes && (
                                    <div className="flex justify-between border-b border-espresso/5 py-2">
                                        <span className="text-espresso/60">
                                            Catatan
                                        </span>
                                        <span className="font-semibold italic text-espresso">
                                            {booking.notes}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 flex items-center justify-between border-t border-gold/10 pt-4">
                                <span className="text-lg font-bold text-espresso">
                                    Total
                                </span>
                                <span className="text-2xl font-bold text-gold">
                                    Rp{' '}
                                    {Number(booking.price).toLocaleString(
                                        'id-ID',
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="mb-6 rounded-2xl border border-gold/20 bg-white p-6">
                            <h2 className="mb-4 text-lg font-bold text-espresso">
                                Metode Pembayaran
                            </h2>
                            <div className="flex items-center space-x-4 rounded-xl border border-light-brown/20 bg-light-brown/10 p-4">
                                <svg
                                    className="h-8 w-8 text-espresso/40"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <div>
                                    <p className="font-semibold text-espresso">
                                        Bayar di Tempat (Cash)
                                    </p>
                                    <p className="text-sm text-espresso/40">
                                        Bayar langsung saat datang
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={submitPayment}
                            disabled={processing}
                            className="btn-premium w-full text-center text-lg disabled:opacity-40"
                        >
                            {processing
                                ? 'Memproses...'
                                : `Konfirmasi & Bayar Rp ${Number(booking.price).toLocaleString('id-ID')}`}
                        </button>

                        <div className="mt-4 text-center">
                            <button
                                onClick={() => router.get('/#reservation')}
                                className="text-sm text-espresso/40 transition-colors hover:text-espresso"
                            >
                                &larr; Kembali
                            </button>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
