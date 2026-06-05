import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';
import MenuItemModal from './MenuItemModal';

export default function MenuSection({ auth, items = [] }) {
    const { addItem } = useCart();
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [filters, setFilters] = useState({ type: 'all', caffeine: 'all' });
    const [modalItem, setModalItem] = useState(null);
    const [categoryOpen, setCategoryOpen] = useState(false);

    const categories = ['Semua', ...new Set(items.map(i => i.category?.name).filter(Boolean))];

    const filteredItems = items.filter(item => {
        if (activeCategory !== 'Semua' && item.category?.name !== activeCategory) return false;
        if (filters.type !== 'all' && item.type && item.type !== filters.type) return false;
        if (filters.caffeine !== 'all' && item.caffeine !== undefined && (filters.caffeine === 'no' ? item.caffeine : !item.caffeine)) return false;
        return true;
    });

    const calcPrice = (item) => Number(item.price);

    return (
        <section id="menu" className="section-spacing bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-gold uppercase tracking-widest text-sm mb-4 block font-semibold">Pilihan Kami</span>
                    <h2 className="text-4xl md:text-5xl text-espresso mb-10">Menu Artisan</h2>
                    <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-10"></div>

                    {/* Category Filter Trigger */}
                    <div className="max-w-xs mx-auto relative">
                        <button
                            onClick={() => setCategoryOpen(!categoryOpen)}
                            className="w-full flex items-center justify-between px-5 py-3 rounded-xl border border-gold/20 text-espresso text-sm hover:border-gold hover:bg-cream-dark transition-all"
                        >
                            <span>{activeCategory}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${categoryOpen ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Categories - absolute overlay */}
                        {categoryOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} />
                                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-gold/10 shadow-lg overflow-hidden">
                                    <nav className="flex flex-col py-1">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => { setActiveCategory(cat); setCategoryOpen(false); }}
                                                className={`px-5 py-2.5 text-sm text-left transition-colors ${
                                                    activeCategory === cat
                                                        ? 'bg-gold/10 text-espresso font-semibold'
                                                        : 'text-espresso/60 hover:bg-cream-dark hover:text-espresso'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </nav>

                                    {/* Filters for Signature Drinks */}
                                    {activeCategory === 'Signature Drinks' && (
                                        <div className="border-t border-gold/10 px-5 py-3 space-y-3">
                                            <div>
                                                <span className="text-xs text-espresso/40 block mb-1.5">Suhu</span>
                                                <div className="flex flex-col space-y-0.5">
                                                    {['all', 'hot', 'cold'].map(t => (
                                                        <button
                                                            key={t}
                                                            onClick={() => setFilters({...filters, type: t})}
                                                            className={`text-sm px-3 py-1.5 rounded-lg text-left transition-colors ${
                                                                filters.type === t
                                                                    ? 'bg-gold/10 text-espresso font-semibold'
                                                                    : 'text-espresso/50 hover:text-espresso hover:bg-cream-dark'
                                                            }`}
                                                        >
                                                            {t === 'all' ? 'Semua' : t === 'hot' ? 'Panas' : 'Dingin'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-xs text-espresso/40 block mb-1.5">Kafein</span>
                                                <div className="flex flex-col space-y-0.5">
                                                    {['all', 'yes', 'no'].map(c => (
                                                        <button
                                                            key={c}
                                                            onClick={() => setFilters({...filters, caffeine: c})}
                                                            className={`text-sm px-3 py-1.5 rounded-lg text-left transition-colors ${
                                                                filters.caffeine === c
                                                                    ? 'bg-gold/10 text-espresso font-semibold'
                                                                    : 'text-espresso/50 hover:text-espresso hover:bg-cream-dark'
                                                            }`}
                                                        >
                                                            {c === 'all' ? 'Semua' : c === 'yes' ? 'Berkafein' : 'Bebas Kafein'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Products Grid */}
                {filteredItems.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-espresso/40 italic">Tidak ada item yang cocok dengan filter Anda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => {
                    const hasVariants = (item.option_values?.length > 0) || (item.toppings?.length > 0);
                    return (
                        <div key={item.id} className="card-premium group cursor-pointer" onClick={() => setModalItem(item)}>
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={item.image ? `/storage/${item.image}` : '/images/latte.png'}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-espresso">
                                    Rp {calcPrice(item).toLocaleString('id-ID')}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl text-espresso mb-2 text-center">{item.name}</h3>
                                <p className="text-espresso/50 text-sm mb-4 line-clamp-2 text-center">{item.description || 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.'}</p>

                                {hasVariants && (
                                    <div className="flex items-center justify-center pt-3 border-t border-gold/10">
                                        <span className="text-[10px] text-gold font-semibold uppercase tracking-widest">Pilih Varian &rarr;</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                    </div>
                )}
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
