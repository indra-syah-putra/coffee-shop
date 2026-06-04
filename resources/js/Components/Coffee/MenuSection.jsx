import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';

export default function MenuSection({ auth, items = [] }) {
    const { addItem } = useCart();
    const [activeCategory, setActiveCategory] = useState('Signature Drinks');
    const [filters, setFilters] = useState({ type: 'all', caffeine: 'all' });
    const [selectedSizes, setSelectedSizes] = useState({});
    const [selectedTemps, setSelectedTemps] = useState({});
    const [selectedSugars, setSelectedSugars] = useState({});
    const [selectedToppings, setSelectedToppings] = useState({});
    const [itemPrices, setItemPrices] = useState({});

    const filteredItems = items.filter(item => {
        if (item.category !== activeCategory) return false;
        if (filters.type !== 'all' && item.type && item.type !== filters.type) return false;
        if (filters.caffeine !== 'all' && item.caffeine !== undefined && (filters.caffeine === 'no' ? item.caffeine : !item.caffeine)) return false;
        return true;
    });

    const calcPrice = (item) => {
        const sizeName = selectedSizes[item.id];
        const size = (item.sizes || []).find(s => s.name === sizeName);
        let price = size ? Number(size.price) : Number(item.price);
        (selectedToppings[item.id] || []).forEach(tId => {
            const top = (item.toppings || []).find(t => String(t.id) === String(tId));
            if (top) price += Number(top.price);
        });
        return price;
    };

    const getDisplayName = (item) => {
        const parts = [item.name];
        if (selectedSizes[item.id]) parts.push(`(${selectedSizes[item.id]})`);
        return parts.join(' ');
    };

    const handleAddToCart = (item) => {
        const price = calcPrice(item);
        addItem({
            id: item.id,
            name: getDisplayName(item),
            price,
            image: item.image,
            size: selectedSizes[item.id] || null,
            temperature: selectedTemps[item.id] || null,
            sugar_level: selectedSugars[item.id] || null,
            toppings: selectedToppings[item.id] || [],
        });
    };

    const handleBuyNow = (item) => {
        const price = calcPrice(item);
        const cartItem = {
            id: item.id,
            name: getDisplayName(item),
            price,
            image: item.image,
            quantity: 1,
            size: selectedSizes[item.id] || null,
            temperature: selectedTemps[item.id] || null,
            sugar_level: selectedSugars[item.id] || null,
            toppings: selectedToppings[item.id] || [],
        };
        localStorage.setItem('checkoutItems', JSON.stringify([cartItem]));
        router.get(route('checkout'));
    };

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
                    {filteredItems.map(item => {
                        const price = calcPrice(item);
                        const hasVariants = (item.sizes?.length > 0) || item.has_temperature || item.has_sugar_level || (item.toppings?.length > 0);
                        return (
                            <div key={item.id} className="card-premium group">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image || '/images/latte.png'}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-espresso">
                                        Rp {price.toLocaleString('id-ID')}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl text-espresso mb-2 text-center">{item.name}</h3>
                                    <p className="text-espresso/50 text-sm mb-4 line-clamp-2 text-center">{item.description || 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.'}</p>

                                    {/* Variants */}
                                    {hasVariants && (
                                        <div className="space-y-3 mb-4 pt-3 border-t border-gold/10">
                                            {item.sizes?.length > 0 && (
                                                <div>
                                                    <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest block mb-1">Ukuran</label>
                                                    <div className="flex gap-1.5 flex-wrap">
                                                        {item.sizes.map(s => (
                                                            <button key={s.id}
                                                                onClick={() => setSelectedSizes({...selectedSizes, [item.id]: s.name})}
                                                                className={`px-3 py-1 text-xs rounded-lg border transition-all ${selectedSizes[item.id] === s.name ? 'bg-espresso text-white border-espresso' : 'border-gold/20 text-espresso/60 hover:border-gold'}`}
                                                            >{s.name} <span className="opacity-60">Rp{Number(s.price).toLocaleString('id-ID')}</span></button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.has_temperature && (
                                                <div>
                                                    <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest block mb-1">Suhu</label>
                                                    <div className="flex gap-1.5 flex-wrap">
                                                        {['hot', 'cold'].map(t => (
                                                            <button key={t}
                                                                onClick={() => setSelectedTemps({...selectedTemps, [item.id]: t})}
                                                                className={`px-3 py-1 text-xs rounded-lg border transition-all ${selectedTemps[item.id] === t ? 'bg-espresso text-white border-espresso' : 'border-gold/20 text-espresso/60 hover:border-gold'}`}
                                                            >{t === 'hot' ? '☕ Panas' : '🧊 Dingin'}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.has_sugar_level && (
                                                <div>
                                                    <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest block mb-1">Level Gula</label>
                                                    <div className="flex gap-1.5 flex-wrap">
                                                        {['0%', '25%', '50%', '75%', '100%'].map(l => (
                                                            <button key={l}
                                                                onClick={() => setSelectedSugars({...selectedSugars, [item.id]: l})}
                                                                className={`px-3 py-1 text-xs rounded-lg border transition-all ${selectedSugars[item.id] === l ? 'bg-espresso text-white border-espresso' : 'border-gold/20 text-espresso/60 hover:border-gold'}`}
                                                            >{l}</button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {item.toppings?.length > 0 && (
                                                <div>
                                                    <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest block mb-1">Topping</label>
                                                    <div className="flex gap-1.5 flex-wrap">
                                                        {item.toppings.map(t => {
                                                            const isSelected = (selectedToppings[item.id] || []).includes(String(t.id));
                                                            return (
                                                                <button key={t.id}
                                                                    onClick={() => {
                                                                        const current = selectedToppings[item.id] || [];
                                                                        setSelectedToppings({
                                                                            ...selectedToppings,
                                                                            [item.id]: isSelected ? current.filter(x => x !== String(t.id)) : [...current, String(t.id)],
                                                                        });
                                                                    }}
                                                                    className={`px-3 py-1 text-xs rounded-lg border transition-all ${isSelected ? 'bg-espresso text-white border-espresso' : 'border-gold/20 text-espresso/60 hover:border-gold'}`}
                                                                >+{t.name} Rp{Number(t.price).toLocaleString('id-ID')}</button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {auth?.user ? (
                                        <div className="flex items-center justify-center space-x-4 pt-2 border-t border-gold/10">
                                            <button onClick={() => handleAddToCart(item)}
                                                className="text-gold hover:text-espresso transition-colors" title="Tambah ke Keranjang">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleBuyNow(item)}
                                                className="text-espresso/40 hover:text-gold transition-colors" title="Beli Langsung">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center pt-2 border-t border-gold/10">
                                            <button onClick={() => router.get(route('login'))}
                                                className="text-xs text-gold hover:text-espresso transition-colors font-medium">Masuk untuk memesan</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
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
