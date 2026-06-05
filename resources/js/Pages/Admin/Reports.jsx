import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Reports({ startDate, endDate, stats, itemSales }) {
    const [fromDate, setFromDate] = useState(startDate);
    const [toDate, setToDate] = useState(endDate);

    const filter = () => {
        router.get(route('admin.reports.index'), { start_date: fromDate, end_date: toDate }, { preserveState: true });
    };

    const exportCsv = () => {
        window.open(route('admin.reports.export-csv', { start_date: fromDate, end_date: toDate }), '_blank');
    };

    const exportPdf = () => {
        window.open(route('admin.reports.export-pdf', { start_date: fromDate, end_date: toDate }), '_blank');
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-espresso leading-tight">Laporan Penjualan</h2>}>
            <Head title="Admin | Reports" />

            <div className="space-y-6">
                {/* Filter */}
                <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                    <div className="flex items-end gap-4 flex-wrap">
                        <div>
                            <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block">Dari Tanggal</label>
                            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                                className="bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold text-espresso" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block">Sampai Tanggal</label>
                            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                                className="bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold text-espresso" />
                        </div>
                        <button onClick={filter}
                            className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-espresso font-bold rounded-xl hover:shadow-lg transition-all text-sm">
                            Tampilkan
                        </button>
                        <button onClick={exportCsv}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Export CSV</span>
                        </button>
                        <button onClick={exportPdf}
                            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all text-sm flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span>Export PDF</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                        <p className="text-espresso/50 text-xs font-semibold uppercase tracking-widest">Total Pendapatan</p>
                        <p className="text-3xl font-bold text-espresso mt-2">Rp {Number(stats.totalRevenue).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                        <p className="text-espresso/50 text-xs font-semibold uppercase tracking-widest">Total Pesanan</p>
                        <p className="text-3xl font-bold text-espresso mt-2">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                        <p className="text-espresso/50 text-xs font-semibold uppercase tracking-widest">Total Diskon</p>
                        <p className="text-3xl font-bold text-rose-500 mt-2">Rp {Number(stats.totalDiscount).toLocaleString('id-ID')}</p>
                    </div>
                </div>

                {/* Item Sales */}
                <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-espresso mb-4">Menu Terlaris</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gold/10 text-espresso/40 text-xs uppercase tracking-widest">
                                    <th className="text-left pb-3 font-semibold">Menu</th>
                                    <th className="text-right pb-3 font-semibold">Terjual</th>
                                    <th className="text-right pb-3 font-semibold">Pendapatan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemSales.map((item, i) => (
                                    <tr key={i} className="border-b border-gold/5">
                                        <td className="py-3 text-espresso font-medium">{item.name}</td>
                                        <td className="py-3 text-right text-espresso">{item.quantity}</td>
                                        <td className="py-3 text-right text-gold font-bold">Rp {Number(item.revenue).toLocaleString('id-ID')}</td>
                                    </tr>
                                ))}
                                {itemSales.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-8 text-center text-espresso/40 italic">Belum ada data penjualan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
