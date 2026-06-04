import React from 'react';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image / Video */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/hero.png" 
                    alt="Brewing Coffee" 
                    className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-espresso/90"></div>
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <span className="text-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6 block font-semibold animate-fade-in-up">Dibuat dengan Sepenuh Hati</span>
                <h1 className="text-5xl md:text-8xl text-white mb-8 leading-tight animate-fade-in-up delay-100">
                    Nikmati <br />
                    <span className="italic font-light opacity-90">Kopi Terbaik</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                    Kopi artisanal dari perkebunan organik paling berkelanjutan di dunia, disangrai setiap hari di jantung kota.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
                    <a href="#menu" className="btn-premium w-full sm:w-auto text-lg">Lihat Menu</a>
                    <a href="#reservation" className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto font-medium">Pesan Meja</a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-gold rounded-full"></div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
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
            `}} />
        </section>
    );
}
