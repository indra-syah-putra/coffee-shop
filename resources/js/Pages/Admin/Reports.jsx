import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const COLORS = [
    '#D4AF37',
    '#8B4513',
    '#CD853F',
    '#A0522D',
    '#DEB887',
    '#D2691E',
    '#F5DEB3',
    '#C4A265',
];
const formatRp = (v) => 'Rp ' + Number(v).toLocaleString('id-ID');

const sections = [
    { key: 'ringkasan', label: 'Ringkasan' },
    { key: 'menu-terlaris', label: 'Menu Terlaris' },
    { key: 'pendapatan', label: 'Pendapatan' },
    { key: 'kategori', label: 'Kategori' },
    { key: 'pesanan', label: 'Pesanan' },
];

function ChartCard({ title, children }) {
    return (
        <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-espresso">{title}</h3>
            {children}
        </div>
    );
}

export default function Reports({
    tab,
    startDate,
    endDate,
    stats,
    itemSales,
    dailyRevenue,
    dailyOrders,
    categoryDistribution,
}) {
    const [fromDate, setFromDate] = useState(startDate);
    const [toDate, setToDate] = useState(endDate);
    const activeSection = sections.find((s) => s.key === tab) || sections[0];
    const topItems = itemSales.slice(0, 10);

    const navigate = (key) => {
        router.get(route('admin.reports.index'), {
            start_date: fromDate,
            end_date: toDate,
            ...(key !== 'ringkasan' ? { tab: key } : {}),
        });
    };

    const filter = () => {
        router.get(route('admin.reports.index'), {
            start_date: fromDate,
            end_date: toDate,
            ...(tab !== 'ringkasan' ? { tab } : {}),
        });
    };

    const exportCsv = () => {
        window.open(
            route('admin.reports.export-csv', {
                start_date: fromDate,
                end_date: toDate,
            }),
            '_blank',
        );
    };

    const exportPdf = () => {
        window.open(
            route('admin.reports.export-pdf', {
                start_date: fromDate,
                end_date: toDate,
            }),
            '_blank',
        );
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Laporan
                </h2>
            }
        >
            <Head title="Admin | Laporan" />

            <div className="space-y-6">
                {/* Filter */}
                <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-end gap-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-espresso/40">
                                Dari Tanggal
                            </label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="rounded-xl border border-gold/10 bg-cream-dark p-3 text-espresso focus:ring-2 focus:ring-gold"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-espresso/40">
                                Sampai Tanggal
                            </label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="rounded-xl border border-gold/10 bg-cream-dark p-3 text-espresso focus:ring-2 focus:ring-gold"
                            />
                        </div>
                        <button
                            onClick={filter}
                            className="rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-3 text-sm font-bold text-espresso transition-all hover:shadow-lg"
                        >
                            Tampilkan
                        </button>
                        <button
                            onClick={exportCsv}
                            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-lg"
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
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span>Export CSV</span>
                        </button>
                        <button
                            onClick={exportPdf}
                            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-lg"
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
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                            <span>Export PDF</span>
                        </button>
                    </div>
                </div>

                {/* Section Tabs */}
                <div className="flex flex-wrap gap-2">
                    {sections.map((s) => (
                        <button
                            key={s.key}
                            onClick={() => navigate(s.key)}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                                activeSection.key === s.key
                                    ? 'bg-espresso text-cream shadow-lg'
                                    : 'border border-gold/10 bg-white text-espresso/50 hover:bg-cream-dark'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Stats bar (show on ringkasan + menu-terlaris) */}
                {(activeSection.key === 'ringkasan' ||
                    activeSection.key === 'menu-terlaris') && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-espresso/50">
                                Total Pendapatan
                            </p>
                            <p className="mt-2 text-3xl font-bold text-espresso">
                                Rp{' '}
                                {Number(stats.totalRevenue).toLocaleString(
                                    'id-ID',
                                )}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-espresso/50">
                                Total Pesanan
                            </p>
                            <p className="mt-2 text-3xl font-bold text-espresso">
                                {stats.totalOrders}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-espresso/50">
                                Total Diskon
                            </p>
                            <p className="mt-2 text-3xl font-bold text-rose-500">
                                Rp{' '}
                                {Number(stats.totalDiscount).toLocaleString(
                                    'id-ID',
                                )}
                            </p>
                        </div>
                    </div>
                )}

                {/* Ringkasan */}
                {activeSection.key === 'ringkasan' && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <ChartCard title="10 Menu Terlaris">
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart
                                    data={topItems}
                                    margin={{ bottom: 60, left: 0, right: 0 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0e6d3"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        angle={-20}
                                        textAnchor="end"
                                        tick={{ fontSize: 11, fill: '#6B4226' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                    />
                                    <Tooltip
                                        formatter={(v) => [v, 'Terjual']}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Bar
                                        dataKey="quantity"
                                        fill="#D4AF37"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                        <ChartCard title="Tren Pendapatan">
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart
                                    data={dailyRevenue}
                                    margin={{ bottom: 20, left: 0, right: 0 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0e6d3"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 11, fill: '#6B4226' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                        tickFormatter={(v) =>
                                            'Rp' + (v / 1000).toFixed(0) + 'k'
                                        }
                                    />
                                    <Tooltip
                                        formatter={(v) => [
                                            formatRp(v),
                                            'Pendapatan',
                                        ]}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#D4AF37"
                                        strokeWidth={3}
                                        dot={{ fill: '#D4AF37', r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartCard>
                        <ChartCard title="Distribusi Kategori">
                            <ResponsiveContainer width="100%" height={280}>
                                <PieChart>
                                    <Pie
                                        data={categoryDistribution}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {categoryDistribution.map((_, i) => (
                                            <Cell
                                                key={i}
                                                fill={COLORS[i % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(v, n) => [v + ' item', n]}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartCard>
                        <ChartCard title="Tren Pesanan">
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart
                                    data={dailyOrders}
                                    margin={{ bottom: 20, left: 0, right: 0 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0e6d3"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 11, fill: '#6B4226' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                        allowDecimals={false}
                                    />
                                    <Tooltip
                                        formatter={(v) => [v, 'Pesanan']}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#8B4513"
                                        strokeWidth={2}
                                        fill="#CD853F"
                                        fillOpacity={0.3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                )}

                {/* Menu Terlaris */}
                {activeSection.key === 'menu-terlaris' && (
                    <div className="space-y-6">
                        <ChartCard title="10 Menu Terlaris">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={topItems}
                                    margin={{ bottom: 80, left: 0, right: 0 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0e6d3"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        angle={-25}
                                        textAnchor="end"
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                    />
                                    <Tooltip
                                        formatter={(v) => [v, 'Terjual']}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Bar
                                        dataKey="quantity"
                                        fill="#D4AF37"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartCard>
                        <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-bold text-espresso">
                                Detail Menu Terlaris
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gold/10 text-xs uppercase tracking-widest text-espresso/40">
                                            <th className="pb-3 text-left font-semibold">
                                                Menu
                                            </th>
                                            <th className="pb-3 text-right font-semibold">
                                                Terjual
                                            </th>
                                            <th className="pb-3 text-right font-semibold">
                                                Pendapatan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemSales.map((item, i) => (
                                            <tr
                                                key={i}
                                                className="border-b border-gold/5"
                                            >
                                                <td className="py-3 font-medium text-espresso">
                                                    {item.name}
                                                </td>
                                                <td className="py-3 text-right text-espresso">
                                                    {item.quantity}
                                                </td>
                                                <td className="py-3 text-right font-bold text-gold">
                                                    Rp{' '}
                                                    {Number(
                                                        item.revenue,
                                                    ).toLocaleString('id-ID')}
                                                </td>
                                            </tr>
                                        ))}
                                        {itemSales.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="py-8 text-center italic text-espresso/40"
                                                >
                                                    Belum ada data penjualan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pendapatan */}
                {activeSection.key === 'pendapatan' && (
                    <div className="space-y-6">
                        <ChartCard title="Tren Pendapatan Harian">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    data={dailyRevenue}
                                    margin={{ bottom: 20, left: 0, right: 0 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0e6d3"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                        tickFormatter={(v) =>
                                            'Rp' + (v / 1000).toFixed(0) + 'k'
                                        }
                                    />
                                    <Tooltip
                                        formatter={(v) => [
                                            formatRp(v),
                                            'Pendapatan',
                                        ]}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#D4AF37"
                                        strokeWidth={3}
                                        dot={{ fill: '#D4AF37', r: 5 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                )}

                {/* Kategori */}
                {activeSection.key === 'kategori' && (
                    <div className="space-y-6">
                        <ChartCard title="Distribusi Penjualan per Kategori">
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={categoryDistribution}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={140}
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {categoryDistribution.map((_, i) => (
                                            <Cell
                                                key={i}
                                                fill={COLORS[i % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(v, n) => [v + ' item', n]}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                )}

                {/* Pesanan */}
                {activeSection.key === 'pesanan' && (
                    <div className="space-y-6">
                        <ChartCard title="Tren Pesanan Harian">
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart
                                    data={dailyOrders}
                                    margin={{ bottom: 20, left: 0, right: 0 }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0e6d3"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: '#6B4226' }}
                                        allowDecimals={false}
                                    />
                                    <Tooltip
                                        formatter={(v) => [v, 'Pesanan']}
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: '1px solid #D4AF37',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#8B4513"
                                        strokeWidth={2}
                                        fill="#CD853F"
                                        fillOpacity={0.3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartCard>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
