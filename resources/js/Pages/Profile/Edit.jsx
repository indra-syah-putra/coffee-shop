import Footer from '@/Components/Coffee/Footer';
import Navbar from '@/Components/Coffee/Navbar';
import { Head, Link, usePage } from '@inertiajs/react';
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

            <div className="min-h-screen bg-cream">
                <Navbar auth={auth} alwaysShow={true} />

                <main className="pb-20 pt-32">
                    <div className="mx-auto max-w-4xl px-6">
                        <h1 className="mb-3 text-3xl font-bold text-espresso">
                            Profil Saya
                        </h1>
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center text-sm font-medium text-espresso/60 transition-colors hover:text-gold"
                        >
                            &larr; Kembali
                        </Link>

                        <div className="mb-8 flex items-center gap-6 rounded-2xl bg-espresso p-8">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold text-2xl font-bold text-espresso">
                                {user.photo_url ? (
                                    <img
                                        src={user.photo_url}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    initial
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-cream">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-cream/70">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-gold/20 bg-white p-6">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </div>
                            <div className="rounded-2xl border border-gold/20 bg-white p-6">
                                <UpdatePasswordForm />
                            </div>
                            <div className="rounded-2xl border border-red-200 bg-white p-6">
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
