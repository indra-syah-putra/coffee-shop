import React from 'react';

export default function StorySection() {
    return (
        <section id="story" className="section-spacing bg-espresso text-cream overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 relative">
                    <div className="relative z-10 rounded-2xl overflow-hidden border border-gold/20">
                        <img 
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
                            alt="Coffee Sourcing" 
                            className="w-full aspect-square object-cover"
                        />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-8 -left-8 w-64 h-64 border-2 border-gold/10 rounded-2xl -z-0"></div>
                    <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gold/5 rounded-2xl -z-0 blur-2xl"></div>
                    
                    <div className="absolute bottom-12 -left-12 bg-gold p-8 rounded-2xl shadow-2xl hidden md:block">
                        <span className="text-4xl font-bold text-espresso block mb-1">100%</span>
                        <span className="text-espresso/70 text-sm font-semibold uppercase tracking-widest">Organic Certified</span>
                    </div>
                </div>

                <div className="flex-1">
                    <span className="text-gold uppercase tracking-[0.3em] text-sm mb-6 block font-semibold">Warisan Kami</span>
                    <h2 className="text-4xl md:text-6xl mb-8 leading-tight">Menyangrai dengan <br /> <span className="italic font-light opacity-80">Integritas</span></h2>
                    <p className="text-cream/70 text-lg mb-8 leading-relaxed">
                        Di Kafein, kami percaya setiap cangkir kopi bercerita. Dari perkebunan dataran tinggi Ethiopia hingga roastery kecil kami, kami mengutamakan hubungan perdagangan langsung dan praktik berkelanjutan.
                    </p>
                    <p className="text-cream/70 text-lg mb-12 leading-relaxed">
                        Biji kopi kami dipilih langsung karena profil rasa uniknya dan disangrai dengan sempurna oleh para ahli, memastikan setiap tegukan adalah eksplorasi cita rasa dan tradisi.
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
