import Footer from '@/Components/Coffee/Footer';
import Navbar from '@/Components/Coffee/Navbar';
import { Head, Link } from '@inertiajs/react';

export default function Privacy({ auth, content }) {
    return (
        <>
            <Head title="Kebijakan Privasi" />
            <div className="min-h-screen bg-cream-dark">
                <Navbar auth={auth} alwaysShow={true} />
                <main className="pb-20 pt-32">
                    <div className="mx-auto max-w-4xl px-6">
                        <h1 className="mb-3 text-3xl font-bold text-espresso">
                            Kebijakan Privasi
                        </h1>
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center text-sm font-medium text-espresso/60 transition-colors hover:text-gold"
                        >
                            &larr; Kembali
                        </Link>

                        <div className="mx-auto max-w-3xl rounded-[4px] bg-white p-12 shadow-[0_2px_20px_rgba(0,0,0,0.08)] md:p-16">
                            <div className="mb-10 border-b-2 border-espresso/10 pb-8">
                                <p className="text-sm text-espresso/40">
                                    Terakhir diperbarui: 2026
                                </p>
                            </div>

                            <div className="space-y-4 text-sm leading-[1.8] text-espresso/80">
                                {content ? (
                                    content.split('\n').map((line, i) => {
                                        const trimmed = line.trim();
                                        if (!trimmed)
                                            return (
                                                <div key={i} className="h-2" />
                                            );
                                        if (trimmed.match(/^[A-Z][a-z]+/)) {
                                            return (
                                                <h2
                                                    key={i}
                                                    className="mb-3 mt-8 text-base font-bold text-espresso"
                                                >
                                                    {trimmed}
                                                </h2>
                                            );
                                        }
                                        return (
                                            <p key={i} className="text-justify">
                                                {trimmed}
                                            </p>
                                        );
                                    })
                                ) : (
                                    <div className="py-16 text-center">
                                        <p className="mb-2 italic text-espresso/40">
                                            Belum ada konten
                                        </p>
                                        <p className="text-xs text-espresso/30">
                                            Admin dapat mengisi halaman ini
                                            melalui menu Pengaturan di panel
                                            admin.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
