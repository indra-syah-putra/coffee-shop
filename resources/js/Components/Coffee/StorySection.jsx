import React, { useState, useEffect, useCallback } from 'react';

export default function StorySection({ settings = {} }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const aboutImages = (() => {
        try { return JSON.parse(settings.about_images || '[]'); }
        catch { return []; }
    })();

    const hasCarousel = aboutImages.length > 0;
    const singleImage = settings.about_image || null;

    const nextSlide = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % aboutImages.length);
    }, [aboutImages.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + aboutImages.length) % aboutImages.length);
    }, [aboutImages.length]);

    useEffect(() => {
        if (!hasCarousel) return;
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [hasCarousel, nextSlide]);

    return (
        <section id="story" className="section-spacing bg-espresso text-cream overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 relative">
                    <div className="relative z-10 rounded-2xl overflow-hidden border border-gold/20">
                        {hasCarousel ? (
                            <div className="relative w-full aspect-square">
                                {aboutImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={`/storage/${img}`}
                                        alt={`Cerita Kami ${idx + 1}`}
                                        className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 ${
                                            idx === currentIndex
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-105'
                                        }`}
                                    />
                                ))}

                                {aboutImages.length > 1 && (
                                    <>
                                        <button onClick={prevSlide}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-espresso/60 hover:bg-espresso text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button onClick={nextSlide}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-espresso/60 hover:bg-espresso text-white flex items-center justify-center transition-all z-20 backdrop-blur-sm"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                                            {aboutImages.map((_, idx) => (
                                                <button key={idx} onClick={() => setCurrentIndex(idx)}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                                        idx === currentIndex
                                                            ? 'bg-gold w-8'
                                                            : 'bg-white/40 hover:bg-white/70'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : singleImage ? (
                            <img src={`/storage/${singleImage}`} alt="Cerita Kami" className="w-full aspect-square object-cover" />
                        ) : (
                            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" alt="Coffee" className="w-full aspect-square object-cover" />
                        )}
                    </div>

                    {/* Decorative */}
                    <div className="absolute -top-8 -left-8 w-64 h-64 border-2 border-gold/10 rounded-2xl -z-0"></div>
                    <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gold/5 rounded-2xl -z-0 blur-2xl"></div>

                    {hasCarousel && aboutImages.length > 0 && (
                        <div className="absolute bottom-12 -left-12 bg-gold p-8 rounded-2xl shadow-2xl hidden md:block">
                            <span className="text-5xl font-bold text-espresso block mb-1">{String(aboutImages.length).padStart(2, '0')}</span>
                            <span className="text-espresso/70 text-sm font-semibold uppercase tracking-widest">Momen Abadi</span>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <span className="text-gold uppercase tracking-[0.3em] text-sm mb-6 block font-semibold">Warisan Kami</span>
                    <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
                        {settings.about_title || 'Menyangrai dengan'}
                        <br />
                        <span className="italic font-light opacity-80">{settings.about_title ? '' : 'Integritas'}</span>
                    </h2>
                    <p className="text-cream/70 text-lg mb-8 leading-relaxed">
                        {settings.about_content || 'Di Kafein, kami percaya setiap cangkir kopi bercerita.'}
                    </p>
                    <p className="text-cream/70 text-lg mb-12 leading-relaxed">
                        {settings.about_content_2 || 'Biji kopi kami dipilih langsung karena profil rasa uniknya dan disangrai dengan sempurna oleh para ahli.'}
                    </p>

                    <div className="grid grid-cols-2 gap-12 border-t border-gold/20 pt-12">
                        <div>
                            <h4 className="text-gold font-bold mb-2 uppercase tracking-tighter">Sumber Langsung</h4>
                            <p className="text-cream/50 text-sm">Bekerja langsung dengan petani untuk memastikan upah yang adil dan kualitas premium.</p>
                        </div>
                        <div>
                            <h4 className="text-gold font-bold mb-2 uppercase tracking-tighter">Sangrai Harian</h4>
                            <p className="text-cream/50 text-sm">Kesegaran terjamin dengan sesi sangrai setiap pagi di rumah kami.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
