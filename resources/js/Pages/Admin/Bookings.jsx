import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

const statusStyles = {
    pending: {
        bg: 'bg-amber-100',
        text: 'text-amber-700',
        dot: 'bg-amber-500',
        label: 'Menunggu',
    },
    confirmed: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-700',
        dot: 'bg-emerald-500',
        label: 'Dikonfirmasi',
    },
    cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        dot: 'bg-red-500',
        label: 'Dibatalkan',
    },
};

export default function AdminBookings({ bookings }) {
    const { delete: destroy } = useForm({});
    const [rejectId, setRejectId] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [changing, setChanging] = useState(null);

    const handleStatusChange = (id, newStatus) => {
        if (newStatus === 'cancelled') {
            setRejectId(id);
            setRejectReason('');
            return;
        }
        setChanging(id);
        router.put(
            route('admin.bookings.update', id),
            { status: newStatus, admin_notes: null },
            {
                onFinish: () => setChanging(null),
            },
        );
    };

    const submitReject = (id) => {
        if (!rejectReason.trim()) return;
        setChanging(id);
        setRejectId(null);
        router.put(
            route('admin.bookings.update', id),
            { status: 'cancelled', admin_notes: rejectReason },
            {
                onFinish: () => {
                    setChanging(null);
                    setRejectId(null);
                    setRejectReason('');
                },
            },
        );
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Kelola Reservasi
                </h2>
            }
        >
            <Head title="Admin | Bookings" />

            <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
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
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-espresso">
                            Daftar Reservasi
                        </h3>
                    </div>
                    <span className="rounded-full bg-cream-dark px-3 py-1 text-xs font-medium text-espresso/40">
                        {bookings.length} reservasi
                    </span>
                </div>

                <div className="space-y-4">
                    {bookings.map((booking) => {
                        const status =
                            statusStyles[booking.status] ||
                            statusStyles.pending;
                        return (
                            <div
                                key={booking.id}
                                className="rounded-xl border border-gold/5 bg-cream-dark p-5 transition-all hover:border-gold/20"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-espresso to-espresso-dark text-sm font-bold text-white">
                                            {booking.user.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-espresso">
                                                {booking.user.name}
                                            </h4>
                                            <span className="ml-2 font-mono text-[10px] font-bold text-gold/70">
                                                {booking.booking_number}
                                            </span>
                                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <span className="text-sm text-espresso/60">
                                                    {new Date(
                                                        booking.date,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                                <span className="text-espresso/20">
                                                    •
                                                </span>
                                                <span className="text-sm text-espresso/60">
                                                    {booking.start_time} -{' '}
                                                    {booking.end_time}
                                                </span>
                                                <span className="text-espresso/20">
                                                    •
                                                </span>
                                                <span className="text-sm text-espresso/60">
                                                    {booking.guests} tamu
                                                </span>
                                                <span className="text-espresso/20">
                                                    •
                                                </span>
                                                <span className="text-sm capitalize text-espresso/60">
                                                    {booking.table_type ===
                                                    'indoor'
                                                        ? 'Indoor'
                                                        : booking.table_type ===
                                                            'outdoor'
                                                          ? 'Outdoor'
                                                          : 'Balkon'}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center space-x-2">
                                                <span
                                                    className={`flex items-center space-x-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${status.bg} ${status.text}`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                                    />
                                                    <span>{status.label}</span>
                                                </span>
                                            </div>
                                            {booking.notes && (
                                                <p className="mt-2 rounded-lg border border-gold/5 bg-white/50 px-3 py-2 text-xs italic text-espresso/40">
                                                    "{booking.notes}"
                                                </p>
                                            )}
                                            {booking.admin_notes && (
                                                <p className="mt-2 rounded-lg border border-red-200/50 bg-red-50/50 px-3 py-2 text-xs text-red-600/70">
                                                    Ditolak: "
                                                    {booking.admin_notes}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex shrink-0 items-center space-x-2">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            booking.id,
                                                            'confirmed',
                                                        )
                                                    }
                                                    disabled={
                                                        changing === booking.id
                                                    }
                                                    className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-40"
                                                >
                                                    {changing === booking.id
                                                        ? '...'
                                                        : 'Konfirmasi'}
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setRejectId(booking.id)
                                                    }
                                                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
                                                >
                                                    Tolak
                                                </button>
                                            </>
                                        )}
                                        {(booking.status === 'confirmed' ||
                                            booking.status === 'cancelled') && (
                                            <span className="inline-flex items-center rounded-full border border-gold/20 bg-white/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-espresso/40">
                                                <svg className="mr-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                Final
                                            </span>
                                        )}
                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Hapus booking ini?',
                                                    )
                                                )
                                                    destroy(
                                                        route(
                                                            'admin.bookings.destroy',
                                                            booking.id,
                                                        ),
                                                    );
                                            }}
                                            className="rounded-lg p-2 text-espresso/30 transition-all hover:bg-red-50 hover:text-red-500"
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

                                {rejectId === booking.id && (
                                    <div className="mt-4 border-t border-red-200 pt-4">
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-espresso/40">
                                            Alasan Penolakan
                                        </label>
                                        <div className="flex space-x-3">
                                            <input
                                                type="text"
                                                value={rejectReason}
                                                onChange={(e) =>
                                                    setRejectReason(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan alasan penolakan..."
                                                className="flex-1 rounded-xl border border-red-300 bg-white p-3 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-400"
                                            />
                                            <button
                                                onClick={() =>
                                                    submitReject(booking.id)
                                                }
                                                disabled={!rejectReason.trim()}
                                                className="rounded-xl bg-red-500 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:opacity-40"
                                            >
                                                Kirim
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setRejectId(null)
                                                }
                                                className="rounded-xl border border-gold/20 px-4 py-2 text-sm font-medium text-espresso/50 transition-colors hover:text-espresso"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {bookings.length === 0 && (
                        <div className="py-16 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark">
                                <svg
                                    className="h-8 w-8 text-espresso/20"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <p className="italic text-espresso/40">
                                Belum ada reservasi.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
