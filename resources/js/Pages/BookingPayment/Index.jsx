import { Head, router, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Coffee/Navbar';
import Footer from '@/Components/Coffee/Footer';

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

            <div className="bg-cream min-h-screen">
                <Navbar auth={auth} alwaysShow={true} />

                <main className="pt-32 pb-20">
                    <div className="max-w-2xl mx-auto px-6">
                        <h1 className="text-3xl font-bold text-espresso mb-8">Pembayaran Booking</h1>

                        <div className="bg-white rounded-2xl border border-gold/20 p-6 mb-6">
                            <h2 className="font-bold text-espresso text-lg mb-4">Detail Reservasi</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-espresso/5">
                                    <span className="text-espresso/60">Tanggal</span>
                                    <span className="font-semibold text-espresso">{booking.date}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-espresso/5">
                                    <span className="text-espresso/60">Jam</span>
                                    <span className="font-semibold text-espresso">{booking.start_time} - {booking.end_time}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-espresso/5">
                                    <span className="text-espresso/60">Meja</span>
                                    <span className="font-semibold text-espresso capitalize">{booking.table_type}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-espresso/5">
                                    <span className="text-espresso/60">Jumlah Tamu</span>
                                    <span className="font-semibold text-espresso">{booking.guests} orang</span>
                                </div>
                                {booking.notes && (
                                    <div className="flex justify-between py-2 border-b border-espresso/5">
                                        <span className="text-espresso/60">Catatan</span>
                                        <span className="font-semibold text-espresso italic">{booking.notes}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-center pt-4 mt-2 border-t border-gold/10">
                                <span className="font-bold text-espresso text-lg">Total</span>
                                <span className="text-gold font-bold text-2xl">Rp {Number(booking.price).toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gold/20 p-6 mb-6">
                            <h2 className="font-bold text-espresso text-lg mb-4">Metode Pembayaran</h2>
                            <div className="flex items-center space-x-4 p-4 bg-light-brown/10 rounded-xl border border-light-brown/20">
                                <svg className="w-8 h-8 text-espresso/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-espresso">Bayar di Tempat (Cash)</p>
                                    <p className="text-espresso/40 text-sm">Bayar langsung saat datang</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={submitPayment} disabled={processing}
                            className="btn-premium w-full text-center text-lg disabled:opacity-40">
                            {processing ? 'Memproses...' : `Konfirmasi & Bayar Rp ${Number(booking.price).toLocaleString('id-ID')}`}
                        </button>

                        <div className="text-center mt-4">
                            <button onClick={() => router.get('/#reservation')} className="text-espresso/40 hover:text-espresso transition-colors text-sm">
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
