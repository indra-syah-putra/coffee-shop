import AdminLayout from '@/Layouts/AdminLayout';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import { Head, usePage } from '@inertiajs/react';

export default function AdminProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Profil Saya
                </h2>
            }
        >
            <Head title="Profil" />

            <div className="mx-auto max-w-3xl space-y-6">
                <div className="flex items-center gap-6 rounded-2xl bg-espresso p-8">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gold text-2xl font-bold text-espresso">
                        {user.photo_url ? (
                            <img
                                src={user.photo_url}
                                alt={user.name}
                                loading="lazy"
                                onError={(e) => { e.target.style.display = 'none' }}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            user.name.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-cream">
                            {user.name}
                        </h2>
                        <p className="text-sm text-cream/70">{user.email}</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-gold/20 bg-white p-6">
                    <UpdateProfileInformationForm updateRoute="admin.profile.update" />
                </div>

                <div className="rounded-2xl border border-gold/20 bg-white p-6">
                    <UpdatePasswordForm />
                </div>

                <div className="rounded-2xl border border-red-200 bg-white p-6">
                    <DeleteUserForm />
                </div>
            </div>
        </AdminLayout>
    );
}
