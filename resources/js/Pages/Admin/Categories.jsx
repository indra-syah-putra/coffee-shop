import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const inputClass = "w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all";
const labelClass = "text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block";

export default function Categories({ categories }) {
    const { errors } = usePage().props;
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, delete: destroy, processing } = useForm({ name: '', active: true });

    const resetForm = () => {
        setData({ name: '', active: true });
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.categories.update', editing), { onSuccess: () => resetForm() });
        } else {
            post(route('admin.categories.store'), { onSuccess: () => resetForm() });
        }
    };

    const editCat = (cat) => {
        setEditing(cat.id);
        setData({ name: cat.name, active: cat.active });
    };

    return (
        <AdminLayout header={
            <div className="flex items-center space-x-4">
                <a href={route('admin.menu-items.index')} className="p-2 rounded-lg hover:bg-cream-dark text-espresso/40 hover:text-espresso transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </a>
                <h2 className="font-semibold text-xl text-espresso leading-tight">Kelola Kategori</h2>
            </div>
        }>
            <Head title="Admin | Categories" />

            <div className="min-h-0 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 min-h-0">
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm lg:sticky lg:top-0 overflow-y-auto max-h-[calc(100vh-12rem)]">
                        <h3 className="text-lg font-bold text-espresso mb-6">{editing ? 'Edit Kategori' : 'Tambah Kategori'}</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Nama Kategori</label>
                                <input value={data.name} onChange={e => setData('name', e.target.value)} className={inputClass} />
                                {errors.name && <p className="text-red-500 text-xs mt-1">⚠ {errors.name}</p>}
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <input type="checkbox" checked={data.active} onChange={e => setData('active', e.target.checked)}
                                    className="w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold cursor-pointer" />
                                <span className="text-sm text-espresso/70">Aktif</span>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" disabled={processing}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-espresso font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-sm">
                                    {processing ? 'Menyimpan...' : (editing ? 'Simpan' : 'Tambah')}
                                </button>
                                {editing && (
                                    <button type="button" onClick={resetForm}
                                        className="px-6 py-3 rounded-xl border border-gold/20 text-espresso/60 hover:text-espresso transition-all text-sm font-medium">Batal</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 min-h-0">
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm overflow-y-auto max-h-[calc(100vh-12rem)]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-espresso">Daftar Kategori</h3>
                            <a href={route('admin.menu-items.index')} className="text-xs text-gold hover:text-espresso font-semibold transition-colors">← Kembali ke Menu</a>
                        </div>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <div key={cat.id} className="flex items-center justify-between p-4 bg-cream-dark rounded-xl border border-gold/5">
                                    <div className="flex items-center space-x-3">
                                        <h4 className="font-bold text-espresso">{cat.name}</h4>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cat.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {cat.active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                        <span className="text-xs text-espresso/40">{cat.menu_items_count} item</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => editCat(cat)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100" title="Edit">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => { if (confirm('Hapus kategori?')) destroy(route('admin.categories.destroy', cat.id)); }}
                                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100" title="Hapus">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
