import { usePage } from '@inertiajs/react';

export default function Hero() {
    const { settings: globalSettings } = usePage().props;
    const settings = globalSettings || {};
    return (
        <section className="relative flex h-screen items-center justify-center overflow-hidden">
            {/* Background Image / Video */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero.png"
                    alt="Brewing Coffee"
                    className="animate-slow-zoom h-full w-full scale-105 object-cover"
                    onError={(e) => {
                        e.target.src =
                            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-espresso/90"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <span className="animate-fade-in-up mb-6 block text-sm font-semibold uppercase tracking-[0.3em] text-gold md:text-base">
                    {settings.hero_subtitle || 'Dibuat dengan Sepenuh Hati'}
                </span>
                <h1 className="animate-fade-in-up mb-8 text-5xl leading-tight text-white delay-100 md:text-8xl">
                    {settings.hero_title || 'Nikmati Kopi Terbaik'}
                </h1>
                <p className="animate-fade-in-up mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-white/80 delay-200 md:text-xl">
                    {settings.hero_description ||
                        'Kopi artisanal dari perkebunan organik paling berkelanjutan di dunia, disangrai setiap hari di jantung kota.'}
                </p>
                <div className="animate-fade-in-up flex flex-col items-center justify-center gap-6 delay-300 sm:flex-row">
                    <a
                        href="#menu"
                        className="btn-premium w-full text-lg sm:w-auto"
                    >
                        Lihat Menu
                    </a>
                    <a
                        href="#reservation"
                        className="w-full rounded-full border border-white/30 px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-white/10 sm:w-auto"
                    >
                        Pesan Meja
                    </a>
                </div>
            </div>

            <button
                onClick={() => {
                    document
                        .getElementById('popular')
                        ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
                aria-label="Scroll ke Pilihan Terbaik"
            >
                <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/20 pt-2">
                    <div className="h-2 w-1 rounded-full bg-gold"></div>
                </div>
            </button>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s infinite alternate ease-in-out;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `,
                }}
            />
        </section>
    );
}
