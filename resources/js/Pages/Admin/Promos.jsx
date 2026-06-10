import Modal from '@/Components/Modal';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const inputClass =
    'w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all';
const labelClass =
    'text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block';

export default function Promos({ promos }) {
    const { errors } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [confirmingDeactivate, setConfirmingDeactivate] = useState(false);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
    } = useForm({
        name: '',
        description: '',
        discount_type: 'percentage',
        discount_value: '',
        start_date: '',
        end_date: '',
        active: true,
    });

    const resetForm = () => {
        setData({
            name: '',
            description: '',
            discount_type: 'percentage',
            discount_value: '',
            start_date: '',
            end_date: '',
            active: true,
        });
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('admin.promos.update', editing), {
                onSuccess: () => resetForm(),
            });
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
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Kelola Promo
                </h2>
            }
        >
            <Head title="Admin | Promos" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center space-x-3">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${editing ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'}`}
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
                                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-espresso">
                                {editing ? 'Edit Promo' : 'Tambah Promo Baru'}
                            </h3>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Nama Promo</label>
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
                            <div>
                                <label className={labelClass}>Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className={inputClass}
                                    rows="2"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        Tipe Diskon
                                    </label>
                                    <select
                                        value={data.discount_type}
                                        onChange={(e) =>
                                            setData(
                                                'discount_type',
                                                e.target.value,
                                            )
                                        }
                                        className={inputClass}
                                    >
                                        <option value="percentage">
                                            Persen (%)
                                        </option>
                                        <option value="fixed">
                                            Nominal (Rp)
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        Nilai Diskon
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.discount_value}
                                        onChange={(e) =>
                                            setData(
                                                'discount_value',
                                                e.target.value,
                                            )
                                        }
                                        className={inputClass}
                                    />
                                    {errors.discount_value && (
                                        <p className="mt-1 text-xs text-red-500">
                                            ⚠ {errors.discount_value}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData(
                                                'start_date',
                                                e.target.value,
                                            )
                                        }
                                        className={inputClass}
                                    />
                                    {errors.start_date && (
                                        <p className="mt-1 text-xs text-red-500">
                                            ⚠ {errors.start_date}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        Tanggal Berakhir
                                    </label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) =>
                                            setData('end_date', e.target.value)
                                        }
                                        className={inputClass}
                                    />
                                    {errors.end_date && (
                                        <p className="mt-1 text-xs text-red-500">
                                            ⚠ {errors.end_date}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <input
                                    type="checkbox"
                                    checked={data.active}
                                    onChange={(e) => {
                                        if (!e.target.checked && editing) {
                                            setConfirmingDeactivate(true);
                                            return;
                                        }
                                        setData('active', e.target.checked);
                                    }}
                                    className="h-4 w-4 cursor-pointer rounded border-gold/30 text-gold focus:ring-gold"
                                />
                                <span className="text-sm text-espresso/70">
                                    Aktif
                                </span>
                                {!data.active && (
                                    <span className="text-xs font-medium text-yellow-600">
                                        (draft)
                                    </span>
                                )}
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-lg disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Menyimpan...'
                                        : editing
                                          ? 'Simpan Perubahan'
                                          : 'Tambah Promo'}
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
                    <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
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
                                            d="M4 6h16M4 12h16M4 18h7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-espresso">
                                    Daftar Promo
                                </h3>
                            </div>
                            <span className="rounded-full bg-cream-dark px-3 py-1 text-xs font-medium text-espresso/40">
                                {promos.length} promo
                            </span>
                        </div>

                        <div className="space-y-3">
                            {promos.map((promo) => {
                                const isDraft = !promo.active;
                                const isExpired =
                                    !isDraft &&
                                    new Date(promo.end_date) < new Date();
                                const isActive =
                                    !isDraft &&
                                    !isExpired &&
                                    new Date(promo.start_date) <= new Date();
                                const statusLabel = isDraft
                                    ? 'Draft'
                                    : isExpired
                                      ? 'Kadaluarsa'
                                      : 'Berlaku';
                                const statusClass = isDraft
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : isExpired
                                      ? 'bg-gray-100 text-gray-500'
                                      : 'bg-emerald-100 text-emerald-700';
                                const iconBg = isDraft
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : isExpired
                                      ? 'bg-gray-100 text-gray-400'
                                      : 'bg-emerald-100 text-emerald-600';
                                return (
                                    <div
                                        key={promo.id}
                                        className="group flex items-center justify-between rounded-xl border border-gold/5 bg-cream-dark p-4 transition-all hover:border-gold/20"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}
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
                                                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2.5">
                                                    <h4 className="font-bold text-espresso">
                                                        {promo.name}
                                                    </h4>
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusClass}`}
                                                    >
                                                        {statusLabel}
                                                    </span>
                                                </div>
                                                <div className="mt-0.5 flex items-center space-x-3">
                                                    <span className="text-sm font-bold text-rose-500">
                                                        {promo.discount_type ===
                                                        'percentage'
                                                            ? `${Number(promo.discount_value)}%`
                                                            : `Rp ${Number(promo.discount_value).toLocaleString('id-ID')}`}
                                                    </span>
                                                    <span className="text-espresso/20">
                                                        |
                                                    </span>
                                                    <span className="text-xs text-espresso/40">
                                                        {promo.start_date} —{' '}
                                                        {promo.end_date}
                                                    </span>
                                                </div>
                                                {promo.description && (
                                                    <p className="mt-0.5 text-xs text-espresso/30">
                                                        {promo.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button
                                                onClick={() => editPromo(promo)}
                                                className="rounded-lg bg-amber-50 p-2 text-amber-600 transition-colors hover:bg-amber-100"
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
                                                            'Hapus promo ini?',
                                                        )
                                                    )
                                                        destroy(
                                                            route(
                                                                'admin.promos.destroy',
                                                                promo.id,
                                                            ),
                                                        );
                                                }}
                                                className="rounded-lg bg-red-50 p-2 text-red-500 transition-colors hover:bg-red-100"
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
                            {promos.length === 0 && (
                                <div className="py-16 text-center">
                                    <p className="italic text-espresso/40">
                                        Belum ada promo.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={confirmingDeactivate}
                onClose={() => setConfirmingDeactivate(false)}
                maxWidth="sm"
            >
                <div className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                        <svg
                            className="h-7 w-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-espresso">
                        Nonaktifkan Promo?
                    </h3>
                    <p className="mb-6 text-sm text-espresso/60">
                        Promo akan disimpan sebagai draft dan tidak muncul di
                        halaman web. Yakin ingin menonaktifkan?
                    </p>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => {
                                setConfirmingDeactivate(false);
                                setData('active', false);
                            }}
                            className="flex-1 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-rose-600"
                        >
                            Iya
                        </button>
                        <button
                            onClick={() => setConfirmingDeactivate(false)}
                            className="flex-1 rounded-xl border border-gold/20 px-4 py-2.5 text-sm font-medium text-espresso/60 transition-all hover:text-espresso"
                        >
                            Tidak
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
