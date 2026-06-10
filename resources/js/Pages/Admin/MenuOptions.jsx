import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const inputClass =
    'w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all';
const labelClass =
    'text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block';

const typeLabels = {
    size: 'Ukuran',
    temperature: 'Suhu',
    sugar_level: 'Level Gula',
};

const typeColors = {
    size: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        dot: 'bg-blue-500',
        gradient: 'from-blue-500 to-cyan-500',
    },
    temperature: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        dot: 'bg-orange-500',
        gradient: 'from-orange-500 to-red-500',
    },
    sugar_level: {
        bg: 'bg-pink-100',
        text: 'text-pink-600',
        dot: 'bg-pink-500',
        gradient: 'from-pink-500 to-rose-500',
    },
};

export default function MenuOptions({ sizes, temperatures, sugarLevels }) {
    const { errors } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [activeTab, setActiveTab] = useState('size');
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
    } = useForm({ name: '', active: true });

    const allOptions = {
        size: sizes,
        temperature: temperatures,
        sugar_level: sugarLevels,
    };

    const resetForm = () => {
        setData({ name: '', active: true });
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        setData('type', activeTab);
        if (editing) {
            put(route('admin.menu-options.update', editing), {
                onSuccess: () => resetForm(),
            });
        } else {
            post(route('admin.menu-options.store'), {
                onSuccess: () => resetForm(),
            });
        }
    };

    const editOption = (opt) => {
        setEditing(opt.id);
        setData({ name: opt.name, active: opt.active });
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Kelola Opsi Menu
                </h2>
            }
        >
            <Head title="Admin | Menu Options" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                        <h3 className="mb-6 text-lg font-bold text-espresso">
                            {editing ? 'Edit' : 'Tambah'}{' '}
                            {typeLabels[activeTab]}
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Nama</label>
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

                <div className="lg:col-span-2">
                    {/* Tabs */}
                    <div className="mb-6 flex space-x-1 rounded-xl bg-cream-dark p-1">
                        {Object.entries(typeLabels).map(([key, label]) => {
                            const c = typeColors[key];
                            return (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveTab(key);
                                        resetForm();
                                    }}
                                    className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${activeTab === key ? `${c.bg} ${c.text} shadow-sm` : 'text-espresso/40 hover:text-espresso'}`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    {/* List */}
                    <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                        <div className="space-y-2">
                            {allOptions[activeTab].map((opt) => {
                                const c = typeColors[activeTab];
                                return (
                                    <div
                                        key={opt.id}
                                        className="flex items-center justify-between rounded-xl border border-gold/5 bg-cream-dark p-4"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center text-xs font-bold text-white`}
                                            >
                                                {opt.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <h4 className="font-bold text-espresso">
                                                {opt.name}
                                            </h4>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${opt.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                                            >
                                                {opt.active
                                                    ? 'Aktif'
                                                    : 'Nonaktif'}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => editOption(opt)}
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
                                                    if (
                                                        confirm(
                                                            'Hapus opsi ini?',
                                                        )
                                                    )
                                                        destroy(
                                                            route(
                                                                'admin.menu-options.destroy',
                                                                opt.id,
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
                                );
                            })}
                            {allOptions[activeTab].length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="italic text-espresso/40">
                                        Belum ada data.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
