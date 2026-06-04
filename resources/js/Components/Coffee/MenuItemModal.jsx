import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';

export default function MenuItemModal({ item, onClose, auth }) {
    const { addItem } = useCart();
    const [size, setSize] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [iceLevel, setIceLevel] = useState(null);
    const [sugarLevel, setSugarLevel] = useState(null);
    const [toppings, setToppings] = useState([]);
    const [qty, setQty] = useState(1);

    const getOptionByType = (type) => (item.option_values || []).filter(ov => ov.type === type);

    const sizes = getOptionByType('size');
    const temperatures = getOptionByType('temperature');
    const iceLevels = getOptionByType('ice_level');
    const sugarLevels = getOptionByType('sugar_level');

    const calcPrice = () => {
        let price = Number(item.price);
        if (size) {
            const s = sizes.find(s => s.id === size);
            if (s?.pivot?.price) price = Number(s.pivot.price);
        }
        if (temperature) {
            const t = temperatures.find(t => t.id === temperature);
            if (t?.pivot?.price) price = Number(t.pivot.price);
        }
        toppings.forEach(tId => {
            const top = (item.toppings || []).find(t => String(t.id) === String(tId));
            if (top) price += Number(top.price);
        });
        return price * qty;
    };

    const getUnitPrice = () => {
        let price = Number(item.price);
        if (size) {
            const s = sizes.find(s => s.id === size);
            if (s?.pivot?.price) price = Number(s.pivot.price);
        }
        if (temperature) {
            const t = temperatures.find(t => t.id === temperature);
            if (t?.pivot?.price) price = Number(t.pivot.price);
        }
        toppings.forEach(tId => {
            const top = (item.toppings || []).find(t => String(t.id) === String(tId));
            if (top) price += Number(top.price);
        });
        return price;
    };

    const getDisplayName = () => {
        const parts = [item.name];
        const sizeName = sizes.find(s => s.id === size)?.name;
        if (sizeName) parts.push(`(${sizeName})`);
        return parts.join(' ');
    };

    const handleAddToCart = () => {
        const unitPrice = getUnitPrice();
        for (let i = 0; i < qty; i++) {
            addItem({
                id: item.id,
                name: getDisplayName(),
                price: unitPrice,
                image: item.image,
                size: sizes.find(s => s.id === size)?.name || null,
                temperature: temperatures.find(t => t.id === temperature)?.name || null,
                ice_level: iceLevels.find(i => i.id === iceLevel)?.name || null,
                sugar_level: sugarLevels.find(s => s.id === sugarLevel)?.name || null,
                toppings,
            });
        }
        onClose();
    };

    const handleBuyNow = () => {
        const unitPrice = getUnitPrice();
        const items = [];
        for (let i = 0; i < qty; i++) {
            items.push({
                id: item.id,
                name: getDisplayName(),
                price: unitPrice,
                image: item.image,
                quantity: 1,
                size: sizes.find(s => s.id === size)?.name || null,
                temperature: temperatures.find(t => t.id === temperature)?.name || null,
                ice_level: iceLevels.find(i => i.id === iceLevel)?.name || null,
                sugar_level: sugarLevels.find(s => s.id === sugarLevel)?.name || null,
                toppings,
            });
        }
        localStorage.setItem('checkoutItems', JSON.stringify(items));
        router.get(route('checkout'));
    };

    const toggleTopping = (tId) => {
        setToppings(prev =>
            prev.includes(tId) ? prev.filter(x => x !== tId) : [...prev, tId]
        );
    };

    const chipClass = (selected) =>
        `px-4 py-2 text-sm rounded-xl border transition-all cursor-pointer ${
            selected
                ? 'bg-espresso text-white border-espresso shadow-sm'
                : 'border-gold/20 text-espresso/60 hover:border-gold hover:text-espresso'
        }`;

    const groupLabel = (text) =>
        <span className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest block mb-2">{text}</span>;

    const price = calcPrice();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Close */}
                <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-espresso/60 hover:text-espresso shadow-sm transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <img
                        src={item.image ? `/storage/${item.image}` : '/images/latte.png'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                        <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                        {item.description && (
                            <p className="text-white/70 text-sm mt-1 line-clamp-1">{item.description}</p>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-5">
                    {/* Size */}
                    {sizes.length > 0 && (
                        <div>
                            {groupLabel('Pilih Ukuran')}
                            <div className="flex gap-2 flex-wrap">
                                {sizes.map(s => (
                                    <button key={s.id} onClick={() => setSize(s.id)}
                                        className={chipClass(size === s.id)}>
                                        {s.name}
                                        {s.pivot?.price ? <span className="ml-1.5 opacity-60">Rp {Number(s.pivot.price).toLocaleString('id-ID')}</span> : ''}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Temperature */}
                    {temperatures.length > 0 && (
                        <div>
                            {groupLabel('Pilih Suhu')}
                            <div className="flex gap-2 flex-wrap">
                                {temperatures.map(t => (
                                    <button key={t.id} onClick={() => { setTemperature(t.id); if (t.name !== 'Dingin') setIceLevel(null); }}
                                        className={chipClass(temperature === t.id)}>
                                        {t.name}
                                        {t.pivot?.price ? <span className="ml-1.5 opacity-60">Rp {Number(t.pivot.price).toLocaleString('id-ID')}</span> : ''}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Ice Level (only if temperature is Dingin) */}
                    {temperature && iceLevels.length > 0 && (() => {
                        const tempName = temperatures.find(t => t.id === temperature)?.name;
                        if (tempName !== 'Dingin') return null;
                        return (
                            <div>
                                {groupLabel('Level Es Batu')}
                                <div className="flex gap-2 flex-wrap">
                                    {iceLevels.map(i => (
                                        <button key={i.id} onClick={() => setIceLevel(i.id)}
                                            className={chipClass(iceLevel === i.id)}>
                                            {i.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}

                    {/* Sugar Level */}
                    {sugarLevels.length > 0 && (
                        <div>
                            {groupLabel('Level Gula')}
                            <div className="flex gap-2 flex-wrap">
                                {sugarLevels.map(s => (
                                    <button key={s.id} onClick={() => setSugarLevel(s.id)}
                                        className={chipClass(sugarLevel === s.id)}>
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Toppings */}
                    {item.toppings?.length > 0 && (
                        <div>
                            {groupLabel('Topping')}
                            <div className="flex gap-2 flex-wrap">
                                {item.toppings.map(t => {
                                    const selected = toppings.includes(String(t.id));
                                    return (
                                        <button key={t.id} onClick={() => toggleTopping(String(t.id))}
                                            className={chipClass(selected)}>
                                            +{t.name} Rp {Number(t.price).toLocaleString('id-ID')}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div className="text-center">
                        {groupLabel('Jumlah')}
                        <div className="flex items-center justify-center space-x-4">
                            <button onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-10 rounded-xl border border-gold/20 flex items-center justify-center text-espresso hover:border-gold hover:bg-gold/5 transition-all font-bold text-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="text-2xl font-bold text-espresso w-12 text-center">{qty}</span>
                            <button onClick={() => setQty(qty + 1)}
                                className="w-10 h-10 rounded-xl border border-gold/20 flex items-center justify-center text-espresso hover:border-gold hover:bg-gold/5 transition-all font-bold text-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="pt-4 border-t border-gold/10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-espresso/60 text-sm">Total Harga</span>
                            <span className="text-2xl font-bold text-gold">Rp {price.toLocaleString('id-ID')}</span>
                        </div>

                        {auth?.user ? (
                            <div className="flex space-x-3">
                                <button onClick={handleAddToCart}
                                    className="flex-1 px-6 py-3 border-2 border-espresso text-espresso font-bold rounded-xl hover:bg-espresso hover:text-white transition-all duration-300 text-sm">
                                    + Keranjang
                                </button>
                                <button onClick={handleBuyNow}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-espresso font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 text-sm">
                                    Beli Sekarang
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => router.get(route('login'))}
                                className="w-full px-6 py-3 bg-espresso text-white font-bold rounded-xl hover:bg-espresso/90 transition-all text-sm">
                                Masuk untuk Memesan
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
