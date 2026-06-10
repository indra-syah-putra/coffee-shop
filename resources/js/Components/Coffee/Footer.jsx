import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { settings: globalSettings } = usePage().props;
    const settings = globalSettings || {};
    const socialLinks = [
        { key: 'instagram', label: 'Instagram' },
        { key: 'facebook', label: 'Facebook' },
        { key: 'tiktok', label: 'TikTok' },
    ];

    const weekday = settings.operating_hours_weekday || '08:00 - 22:00';
    const weekend = settings.operating_hours_weekend || '09:00 - 23:00';

    return (
        <footer className="bg-espresso px-6 py-20 text-cream/50">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-3">
                <div>
                    <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                        Kontak Kami
                    </h4>
                    <ul className="space-y-4 text-sm">
                        {settings.store_phone && (
                            <li>
                                <span className="font-semibold text-gold">
                                    Telepon:
                                </span>{' '}
                                <span className="text-cream/70">
                                    {settings.store_phone}
                                </span>
                            </li>
                        )}
                        {settings.store_email && (
                            <li>
                                <span className="font-semibold text-gold">
                                    Email:
                                </span>{' '}
                                <span className="text-cream/70">
                                    {settings.store_email}
                                </span>
                            </li>
                        )}
                    </ul>
                    <div className="mt-8 flex space-x-6">
                        {socialLinks.map((social) =>
                            settings[social.key] ? (
                                <a
                                    key={social.key}
                                    href={settings[social.key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
                                >
                                    {social.label}
                                </a>
                            ) : null,
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                        Kunjungi Kami
                    </h4>
                    <ul className="space-y-4 text-sm">
                        {settings.store_address ? (
                            settings.store_address
                                .replace(/\\n/g, '\n')
                                .split('\n')
                                .map((l, i) => <li key={i}>{l}</li>)
                        ) : (
                            <>
                                <li>Jl. Kopi Nikmat No. 123</li>
                                <li>Kota Kafein, 12345</li>
                            </>
                        )}
                    </ul>
                </div>

                <div>
                    <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                        Jam Operasional
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex gap-4">
                            <span>Senin - Jumat</span>
                            <span className="text-white">{weekday}</span>
                        </li>
                        <li className="flex gap-4">
                            <span>Sabtu - Minggu</span>
                            <span className="text-white">{weekend}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between border-t border-white/5 pt-10 text-xs uppercase tracking-widest opacity-30 md:flex-row">
                <p>&copy; 2026 Kafein. Hak Cipta Dilindungi.</p>
                <div className="mt-4 flex space-x-8 md:mt-0">
                    <a href="/privacy">Kebijakan Privasi</a>
                    <a href="/terms">Syarat & Ketentuan</a>
                </div>
            </div>
        </footer>
    );
}
