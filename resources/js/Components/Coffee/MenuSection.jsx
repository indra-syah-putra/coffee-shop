import { useCart } from '@/Contexts/CartContext';
import { useState } from 'react';
import MenuItemModal from './MenuItemModal';

export default function MenuSection({
    auth,
    items = [],
    categories: propCategories,
}) {
    const { addItem } = useCart();
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [filters, setFilters] = useState({ type: 'all', caffeine: 'all' });
    const [modalItem, setModalItem] = useState(null);
    const [categoryOpen, setCategoryOpen] = useState(false);

    const categories = propCategories?.length
        ? ['Semua', ...propCategories]
        : [
              'Semua',
              ...new Set(items.map((i) => i.category?.name).filter(Boolean)),
          ];

    const filteredItems = items.filter((item) => {
        if (
            activeCategory !== 'Semua' &&
            item.category?.name !== activeCategory
        )
            return false;
        if (filters.type !== 'all' && item.type && item.type !== filters.type)
            return false;
        if (
            filters.caffeine !== 'all' &&
            item.caffeine !== undefined &&
            (filters.caffeine === 'no' ? item.caffeine : !item.caffeine)
        )
            return false;
        return true;
    });

    const calcPrice = (item) => Number(item.price);

    return (
        <section id="menu" className="section-spacing bg-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-gold">
                        Pilihan Kami
                    </span>
                    <h2 className="mb-10 text-4xl text-espresso md:text-5xl">
                        Menu Artisan
                    </h2>
                    <div className="mx-auto mb-10 h-1 w-24 rounded-full bg-gold"></div>

                    {/* Category Filter Trigger */}
                    <div className="relative mx-auto max-w-xs">
                        <button
                            onClick={() => setCategoryOpen(!categoryOpen)}
                            className="flex w-full items-center justify-between rounded-xl border border-gold/20 px-5 py-3 text-sm text-espresso transition-all hover:border-gold hover:bg-cream-dark"
                        >
                            <span>{activeCategory}</span>
                            <svg
                                className={`h-4 w-4 transition-transform duration-300 ${categoryOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Categories - absolute overlay */}
                        {categoryOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setCategoryOpen(false)}
                                />
                                <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-2xl border border-gold/10 bg-white shadow-lg">
                                    <nav className="flex max-h-40 flex-col overflow-y-auto py-1">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setActiveCategory(cat);
                                                    setCategoryOpen(false);
                                                }}
                                                className={`px-5 py-2.5 text-left text-sm transition-colors ${
                                                    activeCategory === cat
                                                        ? 'bg-gold/10 font-semibold text-espresso'
                                                        : 'text-espresso/60 hover:bg-cream-dark hover:text-espresso'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </nav>

                                    {/* Filters for Signature Drinks */}
                                    {activeCategory === 'Signature Drinks' && (
                                        <div className="space-y-3 border-t border-gold/10 px-5 py-3">
                                            <div>
                                                <span className="mb-1.5 block text-xs text-espresso/40">
                                                    Suhu
                                                </span>
                                                <div className="flex flex-col space-y-0.5">
                                                    {['all', 'hot', 'cold'].map(
                                                        (t) => (
                                                            <button
                                                                key={t}
                                                                onClick={() =>
                                                                    setFilters({
                                                                        ...filters,
                                                                        type: t,
                                                                    })
                                                                }
                                                                className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                                                                    filters.type ===
                                                                    t
                                                                        ? 'bg-gold/10 font-semibold text-espresso'
                                                                        : 'text-espresso/50 hover:bg-cream-dark hover:text-espresso'
                                                                }`}
                                                            >
                                                                {t === 'all'
                                                                    ? 'Semua'
                                                                    : t ===
                                                                        'hot'
                                                                      ? 'Panas'
                                                                      : 'Dingin'}
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="mb-1.5 block text-xs text-espresso/40">
                                                    Kafein
                                                </span>
                                                <div className="flex flex-col space-y-0.5">
                                                    {['all', 'yes', 'no'].map(
                                                        (c) => (
                                                            <button
                                                                key={c}
                                                                onClick={() =>
                                                                    setFilters({
                                                                        ...filters,
                                                                        caffeine:
                                                                            c,
                                                                    })
                                                                }
                                                                className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                                                                    filters.caffeine ===
                                                                    c
                                                                        ? 'bg-gold/10 font-semibold text-espresso'
                                                                        : 'text-espresso/50 hover:bg-cream-dark hover:text-espresso'
                                                                }`}
                                                            >
                                                                {c === 'all'
                                                                    ? 'Semua'
                                                                    : c ===
                                                                        'yes'
                                                                      ? 'Berkafein'
                                                                      : 'Bebas Kafein'}
                                                            </button>
                                                        ),
                                                    )}
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
                    <div className="py-24 text-center">
                        <p className="italic text-espresso/40">
                            Tidak ada item yang cocok dengan filter Anda.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="card-premium group cursor-pointer"
                                onClick={() => setModalItem(item)}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-[#D4C5B5]" />
                                    )}
                                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-espresso backdrop-blur-sm">
                                        Rp{' '}
                                        {calcPrice(item).toLocaleString(
                                            'id-ID',
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-2 text-center text-xl text-espresso">
                                        {item.name}
                                    </h3>
                                    <p className="mb-4 line-clamp-2 text-center text-sm text-espresso/50">
                                        {item.description ||
                                            'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.'}
                                    </p>

                                    <div className="flex items-center justify-center border-t border-gold/10 pt-3">
                                        <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
                                            Pesan Sekarang &rarr;
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
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
