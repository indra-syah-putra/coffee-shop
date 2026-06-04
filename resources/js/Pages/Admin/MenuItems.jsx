import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const inputClass = "w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all";
const labelClass = "text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block";
const errorClass = "text-red-500 text-xs mt-1.5 flex items-center space-x-1";

export default function MenuItems({ items }) {
    const { errors } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [showSizes, setShowSizes] = useState(null);
    const [showToppings, setShowToppings] = useState(null);
    const { data, setData, post, put, delete: destroy, processing } = useForm({
        name: '', price: '', category: 'Signature Drinks', type: 'hot', caffeine: true,
        image: '', description: '', active: true, has_temperature: false, has_sugar_level: false,
    });

    const resetForm = () => {
        setData({
            name: '', price: '', category: 'Signature Drinks', type: 'hot', caffeine: true,
            image: '', description: '', active: true, has_temperature: false, has_sugar_level: false,
        });
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.menu-items.update', editing), { onSuccess: () => resetForm() });
        } else {
            post(route('admin.menu-items.store'), { onSuccess: () => resetForm() });
        }
    };

    const editItem = (item) => {
        setEditing(item.id);
        setData({
            name: item.name,
            price: String(item.price),
            category: item.category,
            type: item.type ?? 'hot',
            caffeine: item.caffeine ?? true,
            active: item.active ?? true,
            image: item.image ?? '',
            description: item.description ?? '',
            has_temperature: item.has_temperature ?? false,
            has_sugar_level: item.has_sugar_level ?? false,
        });
    };

    const SizeManager = ({ item }) => {
        const { data: sizeData, setData: setSize, post: postSize, processing: sizeProcessing } = useForm({ name: '', price: '' });
        const [editSizeId, setEditSizeId] = useState(null);
        const sizes = item.sizes || [];

        const submitSize = (e) => {
            e.preventDefault();
            postSize(route('admin.menu-items.sizes.store', item.id), {
                onSuccess: () => { setSize({ name: '', price: '' }); },
            });
        };

        return (
            <div className="mt-4 p-4 bg-cream-dark rounded-xl">
                <h5 className="text-sm font-bold text-espresso mb-3">Ukuran (Size)</h5>
                <form onSubmit={submitSize} className="flex space-x-2 mb-3">
                    <input value={sizeData.name} onChange={e => setSize('name', e.target.value)} placeholder="Small" className="flex-1 bg-white border border-gold/10 rounded-lg p-2 text-sm" />
                    <input type="number" step="0.01" value={sizeData.price} onChange={e => setSize('price', e.target.value)} placeholder="Harga" className="w-24 bg-white border border-gold/10 rounded-lg p-2 text-sm" />
                    <button type="submit" disabled={sizeProcessing} className="px-3 py-2 bg-gold text-espresso font-bold rounded-lg text-sm">Tambah</button>
                </form>
                <div className="space-y-1">
                    {sizes.map(s => (
                        <div key={s.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gold/5">
                            <span className="text-sm text-espresso font-medium">{s.name} — <span className="text-gold">Rp {Number(s.price).toLocaleString('id-ID')}</span></span>
                            <button onClick={() => { if (confirm('Hapus ukuran ini?')) router.delete(route('admin.sizes.destroy', s.id), { preserveScroll: true }); }}
                                className="text-red-400 hover:text-red-600 text-xs">Hapus</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const ToppingManager = ({ item }) => {
        const { data: topData, setData: setTop, post: postTop, processing: topProcessing } = useForm({ name: '', price: '' });
        const toppings = item.toppings || [];

        const submitTopping = (e) => {
            e.preventDefault();
            postTop(route('admin.menu-items.toppings.store', item.id), {
                onSuccess: () => { setTop({ name: '', price: '' }); },
            });
        };

        return (
            <div className="mt-4 p-4 bg-cream-dark rounded-xl">
                <h5 className="text-sm font-bold text-espresso mb-3">Topping</h5>
                <form onSubmit={submitTopping} className="flex space-x-2 mb-3">
                    <input value={topData.name} onChange={e => setTop('name', e.target.value)} placeholder="Nama topping" className="flex-1 bg-white border border-gold/10 rounded-lg p-2 text-sm" />
                    <input type="number" step="0.01" value={topData.price} onChange={e => setTop('price', e.target.value)} placeholder="Harga" className="w-24 bg-white border border-gold/10 rounded-lg p-2 text-sm" />
                    <button type="submit" disabled={topProcessing} className="px-3 py-2 bg-gold text-espresso font-bold rounded-lg text-sm">Tambah</button>
                </form>
                <div className="space-y-1">
                    {toppings.map(t => (
                        <div key={t.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-gold/5">
                            <span className="text-sm text-espresso font-medium">{t.name} — <span className="text-gold">Rp {Number(t.price).toLocaleString('id-ID')}</span></span>
                            <button onClick={() => { if (confirm('Hapus topping ini?')) router.delete(route('admin.toppings.destroy', t.id), { preserveScroll: true }); }}
                                className="text-red-400 hover:text-red-600 text-xs">Hapus</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-espresso leading-tight">Kelola Menu</h2>}>
            <Head title="Admin | Menu Items" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editing ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {editing ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-espresso">{editing ? 'Edit Item' : 'Tambah Item Baru'}</h3>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Nama Menu</label>
                                <input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Masukkan nama menu" className={inputClass} />
                                {errors.name && <p className={errorClass}><span>⚠</span><span>{errors.name}</span></p>}
                            </div>
                            <div>
                                <label className={labelClass}>Harga</label>
                                <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} placeholder="0" className={inputClass} />
                                {errors.price && <p className={errorClass}><span>⚠</span><span>{errors.price}</span></p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Kategori</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className={inputClass}>
                                        <option value="Signature Drinks">Signature Drinks</option>
                                        <option value="Pastries">Pastries</option>
                                        <option value="Beans">Beans</option>
                                    </select>
                                    {errors.category && <p className={errorClass}><span>⚠</span><span>{errors.category}</span></p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Tipe</label>
                                    <select value={data.type} onChange={e => setData('type', e.target.value)} className={inputClass}>
                                        <option value="hot">Panas</option>
                                        <option value="cold">Dingin</option>
                                        <option value="">Tidak Ada</option>
                                    </select>
                                    {errors.type && <p className={errorClass}><span>⚠</span><span>{errors.type}</span></p>}
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Gambar (URL)</label>
                                <input value={data.image} onChange={e => setData('image', e.target.value)} placeholder="https://..." className={inputClass} />
                                {errors.image && <p className={errorClass}><span>⚠</span><span>{errors.image}</span></p>}
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Deskripsi menu..." className={inputClass} rows="3" />
                                {errors.description && <p className={errorClass}><span>⚠</span><span>{errors.description}</span></p>}
                            </div>
                            <div className="flex items-center space-x-4 pt-2 pb-4 border-b border-gold/10 flex-wrap gap-y-2">
                                <label className="flex items-center space-x-2.5 cursor-pointer group">
                                    <input type="checkbox" checked={data.caffeine} onChange={e => setData('caffeine', e.target.checked)}
                                        className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold cursor-pointer" />
                                    <span className="text-sm text-espresso/70 group-hover:text-espresso transition-colors">Berkafein</span>
                                </label>
                                <label className="flex items-center space-x-2.5 cursor-pointer group">
                                    <input type="checkbox" checked={data.active} onChange={e => setData('active', e.target.checked)}
                                        className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold cursor-pointer" />
                                    <span className="text-sm text-espresso/70 group-hover:text-espresso transition-colors">Aktif</span>
                                </label>
                                <label className="flex items-center space-x-2.5 cursor-pointer group">
                                    <input type="checkbox" checked={data.has_temperature} onChange={e => setData('has_temperature', e.target.checked)}
                                        className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold cursor-pointer" />
                                    <span className="text-sm text-espresso/70 group-hover:text-espresso transition-colors">Pilih Suhu</span>
                                </label>
                                <label className="flex items-center space-x-2.5 cursor-pointer group">
                                    <input type="checkbox" checked={data.has_sugar_level} onChange={e => setData('has_sugar_level', e.target.checked)}
                                        className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold cursor-pointer" />
                                    <span className="text-sm text-espresso/70 group-hover:text-espresso transition-colors">Pilih Gula</span>
                                </label>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" disabled={processing}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-espresso font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50 text-sm">
                                    {processing ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            <span>Menyimpan...</span>
                                        </span>
                                    ) : (editing ? 'Simpan Perubahan' : 'Tambah Menu')}
                                </button>
                                {editing && (
                                    <button type="button" onClick={resetForm}
                                        className="px-6 py-3 rounded-xl border border-gold/20 text-espresso/60 hover:text-espresso hover:border-gold transition-all text-sm font-medium">
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Menu List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-espresso">Daftar Menu</h3>
                            </div>
                            <span className="text-xs text-espresso/40 bg-cream-dark px-3 py-1 rounded-full font-medium">{items.length} item</span>
                        </div>

                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div key={item.id} className="group bg-cream-dark rounded-xl border border-gold/5 hover:border-gold/20 hover:shadow-sm transition-all">
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center text-amber-600 font-bold text-sm">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2.5">
                                                    <h4 className="font-bold text-espresso">{item.name}</h4>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                                    }`}>{item.active ? 'Aktif' : 'Nonaktif'}</span>
                                                </div>
                                                <div className="flex items-center space-x-3 mt-0.5">
                                                    <span className="text-gold font-bold text-sm">Rp {Number(item.price).toLocaleString('id-ID')}</span>
                                                    <span className="text-espresso/20">|</span>
                                                    <span className="text-espresso/40 text-xs">{item.category}</span>
                                                    {item.type && (<><span className="text-espresso/20">|</span><span className="text-espresso/40 text-xs capitalize">{item.type === 'hot' ? 'Panas' : 'Dingin'}</span></>)}
                                                    {item.has_temperature && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Suhu</span>}
                                                    {item.has_sugar_level && <span className="text-[10px] bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded">Gula</span>}
                                                </div>
                                                {(item.sizes?.length > 0 || item.toppings?.length > 0) && (
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        {item.sizes?.length > 0 && <span className="text-[10px] text-espresso/40">{item.sizes.length} ukuran</span>}
                                                        {item.toppings?.length > 0 && <span className="text-[10px] text-espresso/40">{item.toppings.length} topping</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={() => setShowSizes(showSizes === item.id ? null : item.id)}
                                                className="p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors" title="Sizes">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                </svg>
                                            </button>
                                            <button onClick={() => setShowToppings(showToppings === item.id ? null : item.id)}
                                                className="p-2 rounded-lg bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors" title="Toppings">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => editItem(item)}
                                                className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Edit">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => { if (confirm('Hapus item ini?')) destroy(route('admin.menu-items.destroy', item.id)); }}
                                                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Hapus">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    {showSizes === item.id && <SizeManager item={item} />}
                                    {showToppings === item.id && <ToppingManager item={item} />}
                                </div>
                            ))}
                            {items.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-dark flex items-center justify-center">
                                        <svg className="w-8 h-8 text-espresso/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <p className="text-espresso/40 italic">Belum ada item menu.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
