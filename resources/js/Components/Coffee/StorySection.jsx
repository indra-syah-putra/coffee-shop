import { useCallback, useEffect, useState } from 'react';

export default function StorySection({ settings = {} }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const aboutImages = (() => {
        try {
            return JSON.parse(settings.about_images || '[]');
        } catch {
            return [];
        }
    })();

    const hasCarousel = aboutImages.length > 0;
    const singleImage = settings.about_image || null;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % aboutImages.length);
    }, [aboutImages.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex(
            (prev) => (prev - 1 + aboutImages.length) % aboutImages.length,
        );
    }, [aboutImages.length]);

    useEffect(() => {
        if (!hasCarousel) return;
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [hasCarousel, nextSlide]);

    return (
        <section
            id="story"
            className="section-spacing overflow-hidden bg-espresso text-cream"
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
                <div className="relative flex-1">
                    <div className="relative z-10 overflow-hidden rounded-2xl border border-gold/20">
                        {hasCarousel ? (
                            <div className="relative aspect-square w-full">
                                {aboutImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={`/storage/${img}`}
                                        alt={`Cerita Kami ${idx + 1}`}
                                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                                            idx === currentIndex
                                                ? 'scale-100 opacity-100'
                                                : 'scale-105 opacity-0'
                                        }`}
                                    />
                                ))}

                                {aboutImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-espresso/60 text-white backdrop-blur-sm transition-all hover:bg-espresso"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-espresso/60 text-white backdrop-blur-sm transition-all hover:bg-espresso"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
                                            {aboutImages.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() =>
                                                        setCurrentIndex(idx)
                                                    }
                                                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                                        idx === currentIndex
                                                            ? 'w-8 bg-gold'
                                                            : 'bg-white/40 hover:bg-white/70'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : singleImage ? (
                            <img
                                src={`/storage/${singleImage}`}
                                alt="Cerita Kami"
                                className="aspect-square w-full object-cover"
                            />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000"
                                alt="Coffee"
                                className="aspect-square w-full object-cover"
                            />
                        )}
                    </div>

                    {/* Decorative */}
                    <div className="absolute -left-8 -top-8 -z-0 h-64 w-64 rounded-2xl border-2 border-gold/10"></div>
                    <div className="absolute -bottom-8 -right-8 -z-0 h-64 w-64 rounded-2xl bg-gold/5 blur-2xl"></div>

                    {hasCarousel && aboutImages.length > 0 && (
                        <div className="absolute -left-12 bottom-12 hidden rounded-2xl bg-gold p-8 shadow-2xl md:block">
                            <span className="mb-1 block text-5xl font-bold text-espresso">
                                {String(aboutImages.length).padStart(2, '0')}
                            </span>
                            <span className="text-sm font-semibold uppercase tracking-widest text-espresso/70">
                                Momen Abadi
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <span className="mb-6 block text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                        {settings.about_subtitle || 'Warisan Kami'}
                    </span>
                    <h2 className="mb-8 text-4xl leading-tight md:text-6xl">
                        {settings.about_title || 'Menyangrai dengan'}
                        <br />
                        <span className="font-light italic opacity-80">
                            {settings.about_title ? '' : 'Integritas'}
                        </span>
                    </h2>
                    <p className="mb-8 text-lg leading-relaxed text-cream/70">
                        {settings.about_content ||
                            'Di Kafein, kami percaya setiap cangkir kopi bercerita.'}
                    </p>
                    <p className="mb-12 text-lg leading-relaxed text-cream/70">
                        {settings.about_content_2 ||
                            'Biji kopi kami dipilih langsung karena profil rasa uniknya dan disangrai dengan sempurna oleh para ahli.'}
                    </p>

                    <div className="grid grid-cols-2 gap-12 border-t border-gold/20 pt-12">
                        <div>
                            <h4 className="mb-2 font-bold uppercase tracking-tighter text-gold">
                                {settings.source_title || 'Sumber Langsung'}
                            </h4>
                            <p className="text-sm text-cream/50">
                                {settings.source_content ||
                                    'Bekerja langsung dengan petani untuk memastikan upah yang adil dan kualitas premium.'}
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-2 font-bold uppercase tracking-tighter text-gold">
                                {settings.roasting_title || 'Sangrai Harian'}
                            </h4>
                            <p className="text-sm text-cream/50">
                                {settings.roasting_content ||
                                    'Kesegaran terjamin dengan sesi sangrai setiap pagi di rumah kami.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
