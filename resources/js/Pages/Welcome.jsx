import Footer from '@/Components/Coffee/Footer';
import Hero from '@/Components/Coffee/Hero';
import MenuSection from '@/Components/Coffee/MenuSection';
import Navbar from '@/Components/Coffee/Navbar';
import PopularSection from '@/Components/Coffee/PopularSection';
import StorySection from '@/Components/Coffee/StorySection';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
export default function Welcome({
    auth,
    menuItems,
    categories,
    settings,
    popularItems,
}) {
    useEffect(() => {
        const interval = setInterval(() => {
            if (!document.hidden) {
                router.reload({ only: ['menuItems', 'popularItems', 'promos'] });
            }
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    const { flash } = usePage().props;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setToast(flash.success);
            if (flash.redirect_section) {
                setTimeout(() => {
                    document
                        .getElementById(flash.redirect_section)
                        ?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);
    const {
        data: bookingData,
        setData: setBooking,
        post: postBooking,
        processing: bookingProcessing,
        errors: bookingErrors,
    } = useForm({
        date: '',
        start_time: '10:00',
        end_time: '12:00',
        guests: 2,
        table_type: 'indoor',
        notes: '',
    });

    const calcDuration = () => {
        if (!bookingData.start_time || !bookingData.end_time) return 0;
        const [sh, sm] = bookingData.start_time.split(':').map(Number);
        const [eh, em] = bookingData.end_time.split(':').map(Number);
        let minutes = eh * 60 + em - (sh * 60 + sm);
        if (minutes <= 0) minutes += 24 * 60;
        return minutes / 60;
    };

    const calcPrice = () => {
        const hours = calcDuration();
        if (hours <= 0) return 0;
        return Math.ceil(hours / 6) * 15000;
    };

    const addHours = (time, hours) => {
        if (!time) return '';
        const [h, m] = time.split(':').map(Number);
        const d = new Date();
        d.setHours(h + hours, m, 0, 0);
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    const handleDateChange = (value) => {
        setBooking('date', value);
        const today = new Date().toLocaleDateString('en-CA');
        if (value === today) {
            const now = new Date();
            now.setHours(now.getHours() + 2);
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            const start = `${hh}:${mm}`;
            setBooking('start_time', start);
            setBooking('end_time', addHours(start, 3));
        }
    };

    const handleStartTimeChange = (value) => {
        setBooking('start_time', value);
        setBooking('end_time', addHours(value, 3));
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

            <div className="min-h-screen bg-cream">
                {toast && (
                    <div className="animate-fade-in-up fixed bottom-6 right-6 z-50">
                        <div className="flex items-center space-x-3 rounded-2xl border border-green-200 bg-white px-6 py-4 shadow-lg shadow-green-900/10">
                            <svg
                                className="h-6 w-6 shrink-0 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-sm font-medium text-espresso">
                                {toast}
                            </p>
                            <button
                                onClick={() => setToast(null)}
                                className="ml-4 text-espresso/30 hover:text-espresso"
                            >
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                <Navbar auth={auth} />

                <main>
                    <Hero />

                    <PopularSection items={popularItems} auth={auth} />

                    {/* Promo Section (only for guests) */}
                    {!auth?.user && (
                        <section className="border-y border-gold/10 bg-light-brown/10 py-12">
                            <div className="mx-auto max-w-7xl px-6 text-center">
                                <p className="text-sm font-semibold uppercase tracking-widest text-espresso">
                                    Bergabung dengan program loyalitas &
                                    dapatkan{' '}
                                    <span className="font-bold text-gold">
                                        diskon 20%
                                    </span>{' '}
                                    untuk pesanan pertama
                                    <button
                                        onClick={() =>
                                            router.get(route('register'))
                                        }
                                        className="ml-6 font-bold text-espresso underline transition-colors hover:text-gold"
                                    >
                                        DAFTAR SEKARANG
                                    </button>
                                </p>
                            </div>
                        </section>
                    )}

                    <MenuSection
                        auth={auth}
                        items={menuItems}
                        categories={categories}
                    />
                    <StorySection settings={settings} />

                    {/* Reservation Section */}
                    <section
                        id="reservation"
                        className="section-spacing bg-white"
                    >
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="mb-8 text-4xl text-espresso md:text-5xl">
                                Booking Meja
                            </h2>
                            <p className="mb-12 text-lg text-espresso/60">
                                Nikmati suasana roastery kami.{' '}
                                <span className="font-bold text-gold">
                                    Rp 15.000
                                </span>{' '}
                                per 6 jam.
                            </p>
                            {bookingErrors?.date && (
                                <p className="mb-2 text-sm text-red-500">
                                    {bookingErrors.date}
                                </p>
                            )}
                            {bookingErrors?.start_time && (
                                <p className="mb-2 text-sm text-red-500">
                                    {bookingErrors.start_time}
                                </p>
                            )}
                            {bookingErrors?.end_time && (
                                <p className="mb-2 text-sm text-red-500">
                                    {bookingErrors.end_time}
                                </p>
                            )}
                            <form
                                onSubmit={submitBooking}
                                className="grid grid-cols-1 gap-6 text-left md:grid-cols-4"
                            >
                                <div className="flex flex-col">
                                    <label className="mb-2 text-xs font-bold uppercase tracking-widest text-espresso/40">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        value={bookingData.date}
                                        onChange={(e) =>
                                            handleDateChange(e.target.value)
                                        }
                                        className="rounded-lg border border-light-brown/20 bg-light-brown/10 p-4 focus:ring-2 focus:ring-gold"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 text-xs font-bold uppercase tracking-widest text-espresso/40">
                                        Jam Mulai
                                    </label>
                                    <input
                                        type="time"
                                        value={bookingData.start_time}
                                        onChange={(e) =>
                                            handleStartTimeChange(
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-lg border border-light-brown/20 bg-light-brown/10 p-4 focus:ring-2 focus:ring-gold"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 text-xs font-bold uppercase tracking-widest text-espresso/40">
                                        Jam Selesai
                                    </label>
                                    <input
                                        type="time"
                                        value={bookingData.end_time}
                                        onChange={(e) =>
                                            setBooking(
                                                'end_time',
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-lg border border-light-brown/20 bg-light-brown/10 p-4 focus:ring-2 focus:ring-gold"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 text-xs font-bold uppercase tracking-widest text-espresso/40">
                                        Jumlah Tamu
                                    </label>
                                    <select
                                        value={bookingData.guests}
                                        onChange={(e) =>
                                            setBooking('guests', e.target.value)
                                        }
                                        className="rounded-lg border border-light-brown/20 bg-light-brown/10 p-4 focus:ring-2 focus:ring-gold"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                                            <option key={n} value={n}>
                                                {n} Orang
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 text-xs font-bold uppercase tracking-widest text-espresso/40">
                                        Pilih Tempat
                                    </label>
                                    <select
                                        value={bookingData.table_type}
                                        onChange={(e) =>
                                            setBooking(
                                                'table_type',
                                                e.target.value,
                                            )
                                        }
                                        className="rounded-lg border border-light-brown/20 bg-light-brown/10 p-4 focus:ring-2 focus:ring-gold"
                                    >
                                        <option value="indoor">Indoor</option>
                                        <option value="outdoor">Outdoor</option>
                                        <option value="balkon">Balkon</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between rounded-xl border border-light-brown/10 bg-light-brown/5 p-4 md:col-span-4">
                                    <div>
                                        <p className="text-sm text-espresso/60">
                                            Durasi:{' '}
                                            <span className="font-bold text-espresso">
                                                {calcDuration()} jam
                                            </span>
                                        </p>
                                        <p className="mt-1 text-xs text-espresso/40">
                                            Rp 15.000 / 6 jam
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs uppercase tracking-widest text-espresso/40">
                                            Biaya Reservasi
                                        </p>
                                        <p className="text-2xl font-bold text-gold">
                                            Rp{' '}
                                            {calcPrice().toLocaleString(
                                                'id-ID',
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="md:col-span-4">
                                    <button
                                        type="submit"
                                        disabled={bookingProcessing}
                                        className="btn-premium w-full disabled:opacity-40"
                                    >
                                        {auth?.user
                                            ? 'Booking Sekarang'
                                            : 'Masuk untuk Booking'}
                                    </button>
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
