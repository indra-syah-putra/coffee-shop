import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Coffee/Navbar';
import Footer from '@/Components/Coffee/Footer';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const initial = user.name.charAt(0).toUpperCase();

    return (
        <>
            <Head title="Profil" />

            <div className="bg-cream min-h-screen">
                <Navbar auth={auth} alwaysShow={true} />

                <main className="pt-32 pb-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-3xl font-bold text-espresso mb-3">Profil Saya</h1>
                        <Link href="/" className="inline-flex items-center text-espresso/60 hover:text-gold transition-colors text-sm font-medium mb-8">&larr; Kembali</Link>

                        <div className="bg-espresso rounded-2xl p-8 flex items-center gap-6 mb-8">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-2xl font-bold text-espresso shrink-0 overflow-hidden">
                                {user.photo_url ? (
                                    <img src={user.photo_url} alt={user.name} className="h-full w-full object-cover" />
                                ) : (
                                    initial
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-cream">{user.name}</h2>
                                <p className="text-cream/70 text-sm">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl border border-gold/20 p-6">
                                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                            </div>
                            <div className="bg-white rounded-2xl border border-gold/20 p-6">
                                <UpdatePasswordForm />
                            </div>
                            <div className="bg-white rounded-2xl border border-red-200 p-6">
                                <DeleteUserForm />
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
