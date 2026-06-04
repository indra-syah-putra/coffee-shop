import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const inputClass = "w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all";
const labelClass = "text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block";

export default function Promos({ promos }) {
    const { errors } = usePage().props;
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, delete: destroy, processing } = useForm({
        name: '', description: '', discount_type: 'percentage', discount_value: '',
        start_date: '', end_date: '', active: true,
    });

    const resetForm = () => {
        setData({ name: '', description: '', discount_type: 'percentage', discount_value: '', start_date: '', end_date: '', active: true });
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.promos.update', editing), { onSuccess: () => resetForm() });
        } else {
            post(route('admin.promos.store'), { onSuccess: () => resetForm() });
        }
    };

    const editPromo = (promo) => {
        setEditing(promo.id);
        setData({
            name: promo.name,
            description: promo.description || '',
            discount_type: promo.discount_type,
            discount_value: String(promo.discount_value),
            start_date: promo.start_date,
            end_date: promo.end_date,
            active: promo.active,
        });
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-espresso leading-tight">Kelola Promo</h2>}>
            <Head title="Admin | Promos" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editing ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-espresso">{editing ? 'Edit Promo' : 'Tambah Promo Baru'}</h3>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Nama Promo</label>
                                <input value={data.name} onChange={e => setData('name', e.target.value)} className={inputClass} />
                                {errors.name && <p className="text-red-500 text-xs mt-1">⚠ {errors.name}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} className={inputClass} rows="2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Tipe Diskon</label>
                                    <select value={data.discount_type} onChange={e => setData('discount_type', e.target.value)} className={inputClass}>
                                        <option value="percentage">Persen (%)</option>
                                        <option value="fixed">Nominal (Rp)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>Nilai Diskon</label>
                                    <input type="number" step="0.01" value={data.discount_value} onChange={e => setData('discount_value', e.target.value)} className={inputClass} />
                                    {errors.discount_value && <p className="text-red-500 text-xs mt-1">⚠ {errors.discount_value}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Tanggal Mulai</label>
                                    <input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className={inputClass} />
                                    {errors.start_date && <p className="text-red-500 text-xs mt-1">⚠ {errors.start_date}</p>}
                                </div>
                                <div>
                                    <label className={labelClass}>Tanggal Berakhir</label>
                                    <input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className={inputClass} />
                                    {errors.end_date && <p className="text-red-500 text-xs mt-1">⚠ {errors.end_date}</p>}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <input type="checkbox" checked={data.active} onChange={e => setData('active', e.target.checked)}
                                    className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold cursor-pointer" />
                                <span className="text-sm text-espresso/70">Aktif</span>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" disabled={processing}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-sm">
                                    {processing ? 'Menyimpan...' : (editing ? 'Simpan Perubahan' : 'Tambah Promo')}
                                </button>
                                {editing && (
                                    <button type="button" onClick={resetForm}
                                        className="px-6 py-3 rounded-xl border border-gold/20 text-espresso/60 hover:text-espresso transition-all text-sm font-medium">
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-espresso">Daftar Promo</h3>
                            </div>
                            <span className="text-xs text-espresso/40 bg-cream-dark px-3 py-1 rounded-full font-medium">{promos.length} promo</span>
                        </div>

                        <div className="space-y-3">
                            {promos.map(promo => {
                                const isActive = promo.active && new Date(promo.start_date) <= new Date() && new Date(promo.end_date) >= new Date();
                                return (
                                    <div key={promo.id} className="group flex items-center justify-between p-4 bg-cream-dark rounded-xl border border-gold/5 hover:border-gold/20 transition-all">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2.5">
                                                    <h4 className="font-bold text-espresso">{promo.name}</h4>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                                        {isActive ? 'Berlaku' : 'Tidak Aktif'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-3 mt-0.5">
                                                    <span className="text-rose-500 font-bold text-sm">
                                                        {promo.discount_type === 'percentage' ? `${promo.discount_value}%` : `Rp ${Number(promo.discount_value).toLocaleString('id-ID')}`}
                                                    </span>
                                                    <span className="text-espresso/20">|</span>
                                                    <span className="text-espresso/40 text-xs">{promo.start_date} — {promo.end_date}</span>
                                                </div>
                                                {promo.description && <p className="text-espresso/30 text-xs mt-0.5">{promo.description}</p>}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => editPromo(promo)}
                                                className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Edit">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => { if (confirm('Hapus promo ini?')) destroy(route('admin.promos.destroy', promo.id)); }}
                                                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Hapus">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            {promos.length === 0 && (
                                <div className="text-center py-16">
                                    <p className="text-espresso/40 italic">Belum ada promo.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
