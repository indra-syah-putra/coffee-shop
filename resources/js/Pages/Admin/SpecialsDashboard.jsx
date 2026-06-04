import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function SpecialsDashboard() {
    const [specials, setSpecials] = useState([
        { id: 1, name: 'Gold Flake Cappuccino', price: 'Rp 80.000', active: true },
        { id: 2, name: 'Truffle Croissant', price: 'Rp 125.000', active: false },
    ]);

    const toggleSpecial = (id) => {
        setSpecials(specials.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    return (
        <AdminLayout
            header={<h2 className="font-semibold text-xl text-espresso leading-tight">Daily Specials Manager</h2>}
        >
            <Head title="Admin | Daily Specials" />

            <div className="bg-white rounded-2xl border border-gold/10 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-espresso">Spesial Hari Ini</h3>
                    </div>
                    <button className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 text-sm flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Tambah Spesial Baru</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {specials.map(special => (
                        <div key={special.id} className="p-5 bg-cream-dark rounded-xl border border-gold/5 hover:border-gold/20 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${special.active ? 'bg-rose-100 text-rose-500' : 'bg-gray-100 text-gray-400'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-espresso">{special.name}</h4>
                                        <p className="text-gold font-semibold">{special.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                                        special.active
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {special.active ? 'Aktif' : 'Draf'}
                                    </span>
                                    <button
                                        onClick={() => toggleSpecial(special.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                            special.active
                                                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                        }`}
                                    >
                                        {special.active ? 'Nonaktifkan' : 'Aktifkan'}
                                    </button>
                                    <button className="p-2 rounded-lg text-espresso/30 hover:text-red-500 hover:bg-red-50 transition-all" title="Hapus">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
