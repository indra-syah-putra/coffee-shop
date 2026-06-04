import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Coffee/Navbar';
import Footer from '@/Components/Coffee/Footer';
import { useCart } from '@/Contexts/CartContext';

export default function Cart({ auth }) {
    const { items, updateQuantity, removeItem, total, makeKey } = useCart();
    const [selected, setSelected] = useState(() => items.map(i => makeKey(i)));

    const toggleItem = (key) => {
        setSelected(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key]);
    };

    const toggleAll = () => {
        setSelected(prev => prev.length === items.length ? [] : items.map(i => makeKey(i)));
    };

    const selectedItems = items.filter(i => selected.includes(makeKey(i)));
    const selectedTotal = selectedItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const variantLabel = (item) => {
        const parts = [];
        if (item.size) parts.push(item.size);
        if (item.temperature) parts.push(item.temperature === 'hot' ? 'Panas' : 'Dingin');
        if (item.sugar_level) parts.push('Gula ' + item.sugar_level);
        return parts.length > 0 ? parts.join(' · ') : null;
    };

    const checkout = () => {
        if (!auth?.user) {
            router.get(route('login'));
            return;
        }
        if (selectedItems.length === 0) return;
        localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
        router.get(route('checkout'));
    };

    return (
        <>
            <Head title="Keranjang Belanja" />
            <div className="bg-cream min-h-screen">
                <Navbar auth={auth} alwaysShow={true} />
                <main className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-3xl font-bold text-espresso mb-8">Keranjang Belanja</h1>

                        {items.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-espresso/40 italic mb-6">Keranjang Anda masih kosong.</p>
                                <a href="/#menu" className="btn-premium">Mulai Belanja</a>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/10">
                                    <label className="flex items-center space-x-3 text-espresso/60 text-sm font-medium cursor-pointer">
                                        <input type="checkbox" checked={selected.length === items.length} onChange={toggleAll}
                                            className="w-5 h-5 rounded border-2 border-espresso/30 checked:bg-gold checked:border-gold focus:ring-gold cursor-pointer" />
                                        <span>Pilih Semua</span>
                                    </label>
                                    <span className="text-espresso/40 text-sm">{items.length} item</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {items.map(item => {
                                        const key = makeKey(item);
                                        return (
                                            <div key={key} className="bg-white rounded-2xl border border-gold/10 p-5 flex items-center gap-4">
                                                <input type="checkbox" checked={selected.includes(key)} onChange={() => toggleItem(key)}
                                                    className="w-5 h-5 rounded border-2 border-espresso/30 checked:bg-gold checked:border-gold focus:ring-gold shrink-0 cursor-pointer" />
                                                {item.image && (
                                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-espresso truncate">{item.name}</h3>
                                                    {variantLabel(item) && <p className="text-espresso/40 text-xs">{variantLabel(item)}</p>}
                                                    {item.toppings?.length > 0 && (
                                                        <p className="text-espresso/30 text-xs">+ {item.toppings.map(t => {
                                                            const found = item.toppings?.find(x => String(x.id) === String(t));
                                                            return typeof t === 'string' ? t : t.name;
                                                        }).filter(Boolean).join(', ')}</p>
                                                    )}
                                                    <p className="text-gold font-semibold text-sm mt-0.5">Rp {Number(item.price).toLocaleString('id-ID')}</p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center border border-gold/20 rounded-lg">
                                                        <button onClick={() => updateQuantity(key, item.quantity - 1)}
                                                            className="px-3 py-1.5 text-espresso hover:bg-gold/5 transition-colors text-sm font-bold">-</button>
                                                        <span className="px-3 py-1.5 text-espresso font-bold text-sm border-x border-gold/20 min-w-[2.5rem] text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(key, item.quantity + 1)}
                                                            className="px-3 py-1.5 text-espresso hover:bg-gold/5 transition-colors text-sm font-bold">+</button>
                                                    </div>
                                                    <p className="text-espresso font-bold text-sm w-24 text-right">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                                    <button onClick={() => removeItem(key)}
                                                        className="text-red-400 hover:text-red-600 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="bg-white rounded-2xl border border-gold/20 p-6 sticky bottom-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-espresso/60 text-sm">{selectedItems.length} dari {items.length} item dipilih</span>
                                        <span className="text-espresso font-bold">Total: <span className="text-gold text-xl ml-2">Rp {selectedTotal.toLocaleString('id-ID')}</span></span>
                                    </div>
                                    <button onClick={checkout} disabled={selectedItems.length === 0}
                                        className="btn-premium w-full text-center disabled:opacity-40">Checkout ({selectedItems.length} item)</button>
                                </div>
                            </>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
