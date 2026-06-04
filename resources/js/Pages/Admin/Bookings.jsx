import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

const statusStyles = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Menunggu' },
    confirmed: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Dikonfirmasi' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: 'Dibatalkan' },
};

export default function AdminBookings({ bookings }) {
    const { delete: destroy } = useForm({});
    const [rejectId, setRejectId] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [changing, setChanging] = useState(null);
    const [selected, setSelected] = useState({});

    const handleStatusChange = (id, newStatus) => {
        if (newStatus === 'cancelled') {
            setRejectId(id);
            setRejectReason('');
            return;
        }
        setChanging(id);
        setSelected(prev => ({ ...prev, [id]: newStatus }));
        router.put(route('admin.bookings.update', id), { status: newStatus, admin_notes: null }, {
            onFinish: () => setChanging(null),
        });
    };

    const submitReject = (id) => {
        if (!rejectReason.trim()) return;
        setChanging(id);
        setSelected(prev => ({ ...prev, [id]: 'cancelled' }));
        router.put(route('admin.bookings.update', id), { status: 'cancelled', admin_notes: rejectReason }, {
            onFinish: () => { setChanging(null); setRejectId(null); setRejectReason(''); },
        });
    };

    return (
        <AdminLayout
            header={<h2 className="font-semibold text-xl text-espresso leading-tight">Kelola Reservasi</h2>}
        >
            <Head title="Admin | Bookings" />

            <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-espresso">Daftar Reservasi</h3>
                    </div>
                    <span className="text-xs text-espresso/40 bg-cream-dark px-3 py-1 rounded-full font-medium">{bookings.length} reservasi</span>
                </div>

                <div className="space-y-4">
                    {bookings.map(booking => {
                        const status = statusStyles[booking.status] || statusStyles.pending;
                        return (
                            <div key={booking.id} className="p-5 bg-cream-dark rounded-xl border border-gold/5 hover:border-gold/20 transition-all">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-espresso to-espresso-dark flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {booking.user.name?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-espresso">{booking.user.name}</h4>
                                            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1">
                                                <span className="text-espresso/60 text-sm">{booking.date}</span>
                                                <span className="text-espresso/20">•</span>
                                                <span className="text-espresso/60 text-sm">{booking.start_time} - {booking.end_time}</span>
                                                <span className="text-espresso/20">•</span>
                                                <span className="text-espresso/60 text-sm">{booking.guests} tamu</span>
                                                <span className="text-espresso/20">•</span>
                                                <span className="capitalize text-espresso/60 text-sm">{booking.table_type === 'indoor' ? 'Indoor' : booking.table_type === 'outdoor' ? 'Outdoor' : 'Balkon'}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <span className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                    <span>{status.label}</span>
                                                </span>
                                            </div>
                                            {booking.notes && (
                                                <p className="text-espresso/40 text-xs italic mt-2 bg-white/50 px-3 py-2 rounded-lg border border-gold/5">
                                                    "{booking.notes}"
                                                </p>
                                            )}
                                            {booking.admin_notes && (
                                                <p className="text-red-600/70 text-xs mt-2 bg-red-50/50 px-3 py-2 rounded-lg border border-red-200/50">
                                                    Ditolak: "{booking.admin_notes}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 shrink-0 ml-4">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                                    disabled={changing === booking.id}
                                                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 disabled:opacity-40 transition-colors"
                                                >
                                                    {changing === booking.id ? '...' : 'Konfirmasi'}
                                                </button>
                                                <button
                                                    onClick={() => setRejectId(booking.id)}
                                                    className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors"
                                                >
                                                    Tolak
                                                </button>
                                            </>
                                        )}
                                        {(booking.status === 'confirmed' || booking.status === 'cancelled') && (
                                            <select
                                                value={selected[booking.id] || ''}
                                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                                disabled={changing === booking.id}
                                                className="bg-white border border-gold/10 rounded-lg p-2 text-sm min-w-[8rem] focus:ring-2 focus:ring-gold"
                                            >
                                                <option value="" disabled>Ubah Status</option>
                                                <option value="confirmed">Dikonfirmasi</option>
                                                <option value="cancelled">Dibatalkan</option>
                                            </select>
                                        )}
                                        <button onClick={() => { if (confirm('Hapus booking ini?')) destroy(route('admin.bookings.destroy', booking.id)); }}
                                            className="p-2 rounded-lg text-espresso/30 hover:text-red-500 hover:bg-red-50 transition-all"
                                            title="Hapus"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {rejectId === booking.id && (
                                    <div className="mt-4 pt-4 border-t border-red-200">
                                        <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-2 block">Alasan Penolakan</label>
                                        <div className="flex space-x-3">
                                            <input type="text" value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                                                placeholder="Masukkan alasan penolakan..."
                                                className="flex-1 bg-white border border-red-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-400 focus:border-red-400" />
                                            <button onClick={() => submitReject(booking.id)} disabled={!rejectReason.trim()}
                                                className="bg-red-500 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-600 disabled:opacity-40 transition-colors">Kirim</button>
                                            <button onClick={() => setRejectId(null)}
                                                className="px-4 py-2 rounded-xl border border-gold/20 text-espresso/50 hover:text-espresso text-sm font-medium transition-colors">Batal</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {bookings.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-dark flex items-center justify-center">
                                <svg className="w-8 h-8 text-espresso/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-espresso/40 italic">Belum ada reservasi.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
