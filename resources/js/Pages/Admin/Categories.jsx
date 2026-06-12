import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const inputClass =
    'w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all';
const labelClass =
    'text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block';

export default function Categories({ categories }) {
    const { errors } = usePage().props;
    const [editing, setEditing] = useState(null);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
    } = useForm({ name: '', active: true });

    const resetForm = () => {
        setData({ name: '', active: true });
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.categories.update', editing), {
                onSuccess: () => resetForm(),
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => resetForm(),
            });
        }
    };

    const editCat = (cat) => {
        setEditing(cat.id);
        setData({ name: cat.name, active: cat.active });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center space-x-4">
                    <a
                        href={route('admin.menu-items.index')}
                        className="rounded-lg p-2 text-espresso/40 transition-all hover:bg-cream-dark hover:text-espresso"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </a>
                    <h2 className="text-xl font-semibold leading-tight text-espresso">
                        Kelola Kategori
                    </h2>
                </div>
            }
        >
            <Head title="Admin | Kategori" />

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="min-h-0 lg:col-span-1">
                    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-gold/10 bg-white p-6 shadow-sm lg:sticky lg:top-0">
                        <h3 className="mb-6 text-lg font-bold text-espresso">
                            {editing ? 'Edit Kategori' : 'Tambah Kategori'}
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className={labelClass}>
                                    Nama Kategori
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className={inputClass}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        ⚠ {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <input
                                    type="checkbox"
                                    checked={data.active}
                                    onChange={(e) =>
                                        setData('active', e.target.checked)
                                    }
                                    className="h-4 w-4 cursor-pointer rounded border-gold/30 text-gold focus:ring-gold"
                                />
                                <span className="text-sm text-espresso/70">
                                    Aktif
                                </span>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-3 text-sm font-bold text-espresso transition-all hover:shadow-lg disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : editing
                                          ? 'Simpan'
                                          : 'Tambah'}
                                </button>
                                {editing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-xl border border-gold/20 px-6 py-3 text-sm font-medium text-espresso/60 transition-all hover:text-espresso"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="min-h-0 lg:col-span-2">
                    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-espresso">
                                Daftar Kategori
                            </h3>
                            <a
                                href={route('admin.menu-items.index')}
                                className="text-xs font-semibold text-gold transition-colors hover:text-espresso"
                            >
                                ← Kembali ke Menu
                            </a>
                        </div>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="flex items-center justify-between rounded-xl border border-gold/5 bg-cream-dark p-4"
                                >
                                    <div className="flex items-center space-x-3">
                                        <h4 className="font-bold text-espresso">
                                            {cat.name}
                                        </h4>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cat.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                                        >
                                            {cat.active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                        <span className="text-xs text-espresso/40">
                                            {cat.menu_items_count} item
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => editCat(cat)}
                                            className="rounded-lg bg-amber-50 p-2 text-amber-600 hover:bg-amber-100"
                                            title="Edit"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Hapus kategori?'))
                                                    destroy(
                                                        route(
                                                            'admin.categories.destroy',
                                                            cat.id,
                                                        ),
                                                    );
                                            }}
                                            className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100"
                                            title="Hapus"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
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
