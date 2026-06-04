import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';

export default function MenuSection({ auth, items = [] }) {
    const { addItem } = useCart();
    const [activeCategory, setActiveCategory] = useState('Signature Drinks');
    const [filters, setFilters] = useState({ type: 'all', caffeine: 'all' });

    const filteredItems = items.filter(item => {
        if (item.category !== activeCategory) return false;
        if (filters.type !== 'all' && item.type && item.type !== filters.type) return false;
        if (filters.caffeine !== 'all' && item.caffeine !== undefined && (filters.caffeine === 'no' ? item.caffeine : !item.caffeine)) return false;
        return true;
    });

    return (
        <section id="menu" className="section-spacing bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold uppercase tracking-widest text-sm mb-4 block font-semibold">Pilihan Kami</span>
                    <h2 className="text-4xl md:text-5xl text-espresso mb-6">Menu Artisan</h2>
                    <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {[
                        { key: 'Signature Drinks', label: 'Minuman Signature' },
                        { key: 'Pastries', label: 'Kue Kering' },
                        { key: 'Beans', label: 'Biji Kopi' },
                    ].map(cat => (
                        <button 
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`px-8 py-2 rounded-full border transition-all duration-300 ${activeCategory === cat.key ? 'bg-espresso text-white border-espresso' : 'border-espresso/10 text-espresso hover:border-gold'}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Filters (only for drinks) */}
                {activeCategory === 'Signature Drinks' && (
                    <div className="flex flex-wrap justify-center gap-8 mb-12 p-6 bg-light-brown/10 rounded-2xl">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-semibold text-espresso/60">SUHU:</span>
                            {['all', 'hot', 'cold'].map(t => (
                                <button 
                                    key={t}
                                    onClick={() => setFilters({...filters, type: t})}
                                    className={`text-sm uppercase tracking-tighter ${filters.type === t ? 'text-gold font-bold underline underline-offset-8' : 'text-espresso/40 hover:text-espresso'}`}
                                >
                                    {t === 'all' ? 'Semua' : t === 'hot' ? 'Panas' : 'Dingin'}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-semibold text-espresso/60">KAFEIN:</span>
                            {['all', 'yes', 'no'].map(c => (
                                <button 
                                    key={c}
                                    onClick={() => setFilters({...filters, caffeine: c})}
                                    className={`text-sm uppercase tracking-tighter ${filters.caffeine === c ? 'text-gold font-bold underline underline-offset-8' : 'text-espresso/40 hover:text-espresso'}`}
                                >
                                    {c === 'all' ? 'Semua' : c === 'yes' ? 'Berkafein' : 'Bebas Kafein'}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredItems.map(item => (
                        <div key={item.id} className="card-premium group">
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={item.image || '/images/latte.png'} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-espresso">
                                    Rp {(item.price).toLocaleString('id-ID')}
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl text-espresso mb-2">{item.name}</h3>
                                <p className="text-espresso/50 text-sm mb-4 line-clamp-2">{item.description || 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.'}</p>
                                {auth?.user && (
                                    <div className="flex items-center justify-center space-x-4">
                                        <button onClick={() => addItem(item)}
                                            className="text-gold hover:text-espresso transition-colors" title="Tambah ke Keranjang">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => {
                                            localStorage.setItem('checkoutItems', JSON.stringify([{ ...item, quantity: 1 }]));
                                            router.get(route('checkout'));
                                        }} className="text-espresso/40 hover:text-gold transition-colors" title="Beli Langsung">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-espresso/40 italic">Tidak ada item yang cocok dengan filter Anda.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
