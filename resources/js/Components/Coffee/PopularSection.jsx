import { useEffect, useRef, useState } from 'react';
import MenuItemModal from './MenuItemModal';

const rankEmojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

export default function PopularSection({ items = [], auth }) {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [modalItem, setModalItem] = useState(null);
    const timer = useRef(null);

    const total = items.length;
    if (!total) return null;

    const goTo = (index) => {
        setCurrent(index);
        resetTimer();
    };

    const goNext = () => {
        setCurrent((prev) => (prev + 1) % total);
    };

    const resetTimer = () => {
        clearInterval(timer.current);
        timer.current = setInterval(goNext, 4000);
    };

    useEffect(() => {
        if (!isPaused) {
            timer.current = setInterval(goNext, 4000);
        }
        return () => clearInterval(timer.current);
    }, [total, isPaused]);

    const item = items[current];

    return (
        <section id="popular" className="relative overflow-hidden bg-gradient-to-br from-espresso via-espresso/95 to-espresso/90 py-20">
            <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-gold/5 blur-3xl"></div>
            <div className="absolute bottom-[-50px] left-[-50px] h-[200px] w-[200px] rounded-full bg-gold/5 blur-3xl"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="mb-12 text-center">
                    <span className="mb-3 inline-block rounded-full bg-gold/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gold">
                        Pilihan Terbaik
                    </span>
                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        Paling{' '}
                        <span className="text-gold">Populer</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-white/60">
                        Menu favorit yang paling sering dipesan pelanggan kami
                    </p>
                </div>

                {/* Carousel */}
                <div
                    className="relative mx-auto max-w-md"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Card */}
                    <div className="relative overflow-hidden rounded-2xl">
                        <div
                            key={item.id}
                            className="group bg-white/10 backdrop-blur-md transition-all duration-500"
                        >
                            {/* Rank badge */}
                            <div className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-espresso/80 text-lg shadow-lg backdrop-blur-sm">
                                {rankEmojis[current] || current + 1}
                            </div>

                            {current === 0 && (
                                <div className="absolute right-3 top-3 z-10 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-espresso shadow-lg">
                                    BEST SELLER
                                </div>
                            )}

                            {/* Image */}
                            <div className="relative h-56 w-full overflow-hidden sm:h-64">
                                <img
                                    src={item.image ? `/storage/${item.image}` : '/images/placeholder.png'}
                                    alt={item.name}
                                    className="h-full w-full object-cover transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src =
                                            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600&h=400';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="text-xs text-gold">
                                        #{current + 1} Populer
                                    </span>
                                    {item.category && (
                                        <span className="text-xs text-white/40">
                                            • {item.category.name}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mb-1 text-xl font-bold text-white">
                                    {item.name}
                                </h3>
                                <p className="mb-4 line-clamp-2 text-sm text-white/50">
                                    {item.description || 'Minuman favorit pelanggan'}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-gold">
                                        Rp{' '}
                                        {Number(item.price).toLocaleString(
                                            'id-ID',
                                        )}
                                    </span>
                                    <button
                                        onClick={() => setModalItem(item)}
                                        className="rounded-full bg-gold/20 px-5 py-2 text-sm font-semibold text-gold transition-all duration-300 hover:bg-gold hover:text-espresso"
                                    >
                                        Pesan Sekarang →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    index === current
                                        ? 'w-8 bg-gold'
                                        : 'w-2.5 bg-white/30 hover:bg-white/50'
                                }`}
                                aria-label={`Lihat ${items[index].name}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {modalItem && (
                <MenuItemModal
                    item={modalItem}
                    auth={auth}
                    onClose={() => setModalItem(null)}
                />
            )}
        </section>
    );
}
