import { Head, useForm, router } from '@inertiajs/react';
import Navbar from '@/Components/Coffee/Navbar';
import Hero from '@/Components/Coffee/Hero';
import MenuSection from '@/Components/Coffee/MenuSection';
import StorySection from '@/Components/Coffee/StorySection';
import Footer from '@/Components/Coffee/Footer';
export default function Welcome({ auth, menuItems }) {
    const { data: bookingData, setData: setBooking, post: postBooking, processing: bookingProcessing, errors: bookingErrors } = useForm({
        date: '', start_time: '10:00', end_time: '12:00', guests: 2, table_type: 'indoor', notes: '',
    });

    const calcDuration = () => {
        if (!bookingData.start_time || !bookingData.end_time) return 0;
        const [sh, sm] = bookingData.start_time.split(':').map(Number);
        const [eh, em] = bookingData.end_time.split(':').map(Number);
        const diff = (eh * 60 + em) - (sh * 60 + sm);
        return diff > 0 ? Math.round(diff / 60 * 10) / 10 : 0;
    };

    const calcPrice = () => {
        const hours = calcDuration();
        if (hours <= 0) return 0;
        return Math.ceil(hours / 12) * 25000;
    };

    const submitBooking = (e) => {
        e.preventDefault();
        if (!auth.user) {
            router.get(route('login'));
            return;
        }
        postBooking(route('bookings.store'));
    };

    return (
        <>
            <Head title="Kafein | Kopi Artisanal Premium" />
            
            <div className="bg-cream min-h-screen">
                <Navbar auth={auth} />
                
                <main>
                    <Hero />
                    
                    {/* Promo Section (only for guests) */}
                    {!auth?.user && (
                        <section className="bg-light-brown/10 py-12 border-y border-gold/10">
                            <div className="max-w-7xl mx-auto px-6 text-center">
                                <p className="text-espresso font-semibold tracking-widest text-sm uppercase">
                                    Bergabung dengan program loyalitas & dapatkan <span className="text-gold font-bold">diskon 20%</span> untuk pesanan pertama
                                    <button onClick={() => router.get(route('register'))} className="ml-6 text-espresso underline font-bold hover:text-gold transition-colors">DAFTAR SEKARANG</button>
                                </p>
                            </div>
                        </section>
                    )}

                    <MenuSection auth={auth} items={menuItems} />
                    <StorySection />

                    {/* Reservation Section */}
                    <section id="reservation" className="section-spacing bg-white">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-5xl text-espresso mb-8">Booking Meja</h2>
                            <p className="text-espresso/60 mb-12 text-lg">
                                Nikmati suasana roastery kami. <span className="text-gold font-bold">Rp 25.000</span> per 12 jam.
                            </p>
                            {bookingErrors?.date && <p className="text-red-500 text-sm mb-2">{bookingErrors.date}</p>}
                            {bookingErrors?.start_time && <p className="text-red-500 text-sm mb-2">{bookingErrors.start_time}</p>}
                            {bookingErrors?.end_time && <p className="text-red-500 text-sm mb-2">{bookingErrors.end_time}</p>}
                            <form onSubmit={submitBooking} className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-2">Tanggal</label>
                                    <input type="date" value={bookingData.date} onChange={e => setBooking('date', e.target.value)}
                                        className="bg-light-brown/10 border border-light-brown/20 rounded-lg p-4 focus:ring-2 focus:ring-gold" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-2">Jam Mulai</label>
                                    <input type="time" value={bookingData.start_time} onChange={e => setBooking('start_time', e.target.value)}
                                        className="bg-light-brown/10 border border-light-brown/20 rounded-lg p-4 focus:ring-2 focus:ring-gold" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-2">Jam Selesai</label>
                                    <input type="time" value={bookingData.end_time} onChange={e => setBooking('end_time', e.target.value)}
                                        className="bg-light-brown/10 border border-light-brown/20 rounded-lg p-4 focus:ring-2 focus:ring-gold" required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-2">Jumlah Tamu</label>
                                    <select value={bookingData.guests} onChange={e => setBooking('guests', e.target.value)}
                                        className="bg-light-brown/10 border border-light-brown/20 rounded-lg p-4 focus:ring-2 focus:ring-gold">
                                        {[1, 2, 3, 4, 5, 6, 8, 10].map(n => <option key={n} value={n}>{n} Orang</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-2">Pilih Meja</label>
                                    <select value={bookingData.table_type} onChange={e => setBooking('table_type', e.target.value)}
                                        className="bg-light-brown/10 border border-light-brown/20 rounded-lg p-4 focus:ring-2 focus:ring-gold">
                                        <option value="indoor">Indoor</option>
                                        <option value="outdoor">Outdoor</option>
                                        <option value="balkon">Balkon</option>
                                    </select>
                                </div>
                                <div className="md:col-span-4 flex items-center justify-between bg-light-brown/5 rounded-xl p-4 border border-light-brown/10">
                                    <div>
                                        <p className="text-espresso/60 text-sm">
                                            Durasi: <span className="font-bold text-espresso">{calcDuration()} jam</span>
                                        </p>
                                        <p className="text-espresso/40 text-xs mt-1">
                                            Rp 25.000 / 12 jam &middot; {Math.ceil(calcDuration() / 12)} block
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-espresso/40 text-xs uppercase tracking-widest">Biaya Reservasi</p>
                                        <p className="text-gold font-bold text-2xl">Rp {calcPrice().toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                                <div className="md:col-span-4">
                                    <button type="submit" disabled={bookingProcessing}
                                        className="btn-premium w-full disabled:opacity-40">{auth?.user ? 'Booking Sekarang' : 'Masuk untuk Booking'}</button>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
