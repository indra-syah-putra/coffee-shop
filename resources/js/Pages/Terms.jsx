import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Coffee/Navbar';
import Footer from '@/Components/Coffee/Footer';

export default function Terms({ auth, content }) {
    return (
        <>
            <Head title="Syarat & Ketentuan" />
            <div className="bg-cream-dark min-h-screen">
                <Navbar auth={auth} alwaysShow={true} />
                <main className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-3xl font-bold text-espresso mb-3">Syarat & Ketentuan</h1>
                        <Link href="/" className="inline-flex items-center text-espresso/60 hover:text-gold transition-colors text-sm font-medium mb-8">&larr; Kembali</Link>

                        <div className="bg-white rounded-[4px] shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-12 md:p-16 max-w-3xl mx-auto">
                            <div className="mb-10 pb-8 border-b-2 border-espresso/10">
                                <p className="text-espresso/40 text-sm">Terakhir diperbarui: 2026</p>
                            </div>

                            <div className="text-espresso/80 text-sm leading-[1.8] space-y-4">
                                {content ? (
                                    content.split('\n').map((line, i) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return <div key={i} className="h-2" />;
                                        if (trimmed.match(/^[A-Z][a-z]+/)) {
                                            return <h2 key={i} className="text-base font-bold text-espresso mt-8 mb-3">{trimmed}</h2>;
                                        }
                                        return <p key={i} className="text-justify">{trimmed}</p>;
                                    })
                                ) : (
                                    <div className="text-center py-16">
                                        <p className="text-espresso/40 italic mb-2">Belum ada konten</p>
                                        <p className="text-espresso/30 text-xs">Admin dapat mengisi halaman ini melalui menu Pengaturan di panel admin.</p>
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
