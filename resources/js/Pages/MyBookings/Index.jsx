import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Coffee/Navbar';
import Footer from '@/Components/Coffee/Footer';

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

            <div className="bg-cream min-h-screen">
                <Navbar auth={auth} alwaysShow={true} />

                <main className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-10">
                            <h1 className="text-3xl font-bold text-espresso">Riwayat Booking</h1>
                            <Link href="/" className="text-espresso/60 hover:text-gold transition-colors text-sm font-medium">&larr; Kembali</Link>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-espresso/40 italic mb-6">Anda belum memiliki reservasi.</p>
                                <Link href="/#reservation" className="btn-premium">Booking Sekarang</Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map(booking => (
                                    <div key={booking.id} className="bg-white rounded-2xl border border-gold/20 p-6 flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-espresso text-lg">{booking.date}</p>
                                            <p className="text-espresso/40 text-sm">{booking.start_time} - {booking.end_time} &middot; {booking.guests} tamu &middot; <span className="capitalize">{booking.table_type}</span></p>
                                            {booking.notes && <p className="text-espresso/40 text-sm italic">"{booking.notes}"</p>}
                                            {booking.admin_notes && (
                                                <p className="text-red-500/70 text-xs italic mt-1">Alasan ditolak: "{booking.admin_notes}"</p>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gold font-bold">Rp {Number(booking.price).toLocaleString('id-ID')}</span>
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest ${statusClass(booking.status)}`}>
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
