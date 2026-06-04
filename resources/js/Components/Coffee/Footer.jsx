import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-espresso text-cream/50 py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-white text-3xl font-bold mb-8 tracking-tighter">KAFEIN</h3>
                    <p className="text-cream/40 max-w-sm mb-8 text-lg">
                        Meningkatkan ritual kopi harian Anda dengan presisi, gairah, dan biji kopi organik terbaik di dunia.
                    </p>
                    <div className="flex space-x-6">
                        {['Instagram', 'Facebook', 'Twitter'].map(social => (
                            <a key={social} href="#" className="text-gold hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{social}</a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Kunjungi Kami</h4>
                    <ul className="space-y-4 text-sm">
                        <li>Jl. Kopi Nikmat No. 123</li>
                        <li>Kota Kafein, 12345</li>
                        <li className="text-gold pt-4">+62 812-3456-7890</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Jam Operasional</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between"><span>Sen - Jum</span> <span className="text-white">07.00 - 20.00</span></li>
                        <li className="flex justify-between"><span>Sabtu</span> <span className="text-white">08.00 - 21.00</span></li>
                        <li className="flex justify-between"><span>Minggu</span> <span className="text-white">08.00 - 18.00</span></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase opacity-30">
                <p>&copy; 2026 Kafein. Hak Cipta Dilindungi.</p>
                <div className="flex space-x-8 mt-4 md:mt-0">
                    <a href="#">Kebijakan Privasi</a>
                    <a href="#">Syarat & Ketentuan</a>
                </div>
            </div>
        </footer>
    );
}
