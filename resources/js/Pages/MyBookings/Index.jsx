import Footer from '@/Components/Coffee/Footer';
import Navbar from '@/Components/Coffee/Navbar';
import { Head, Link } from '@inertiajs/react';

export default function MyBookings({ auth, bookings }) {
    const statusLabel = (status) => {
        const map = {
            pending: 'Menunggu Konfirmasi Admin',
            confirmed: 'Dikonfirmasi',
            cancelled: 'Dibatalkan',
        };
        return map[status] || status;
    };

    const statusClass = (status) => {
        const map = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700',
        };
        return map[status] || 'bg-gray-100 text-gray-500';
    };

    return (
        <>
            <Head title="Riwayat Booking" />

            <div className="min-h-screen bg-cream">
                <Navbar auth={auth} alwaysShow={true} />

                <main className="pb-20 pt-32">
                    <div className="mx-auto max-w-4xl px-6">
                        <h1 className="mb-3 text-3xl font-bold text-espresso">
                            Riwayat Booking
                        </h1>
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center text-sm font-medium text-espresso/60 transition-colors hover:text-gold"
                        >
                            &larr; Kembali
                        </Link>

                        {bookings.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className="mb-6 italic text-espresso/40">
                                    Anda belum memiliki reservasi.
                                </p>
                                <Link
                                    href="/#reservation"
                                    className="btn-premium"
                                >
                                    Booking Sekarang
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="flex items-center justify-between rounded-2xl border border-gold/20 bg-white p-6"
                                    >
                                        <div>
                                            <p className="text-lg font-bold text-espresso">
                                                <span className="font-mono text-base font-bold text-gold">
                                                    {booking.booking_number}
                                                </span>
                                            </p>
                                            <p className="text-sm text-espresso/40">
                                                {new Date(
                                                    booking.date,
                                                ).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                                {booking.start_time} -{' '}
                                                {booking.end_time} &middot;{' '}
                                                {booking.guests} tamu &middot;{' '}
                                                <span className="capitalize">
                                                    {booking.table_type}
                                                </span>
                                            </p>
                                            {booking.notes && (
                                                <p className="text-sm italic text-espresso/40">
                                                    "{booking.notes}"
                                                </p>
                                            )}
                                            {booking.admin_notes && (
                                                <p className="mt-1 text-xs italic text-red-500/70">
                                                    Alasan ditolak: "
                                                    {booking.admin_notes}"
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="font-bold text-gold">
                                                Rp{' '}
                                                {Number(
                                                    booking.price,
                                                ).toLocaleString('id-ID')}
                                            </span>
                                            <span
                                                className={`rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-widest ${statusClass(booking.status)}`}
                                            >
                                                {statusLabel(booking.status)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
