import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';

export default function AdminProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <AdminLayout header={
            <h2 className="font-semibold text-xl text-espresso leading-tight">Profil Saya</h2>
        }>
            <Head title="Profil" />

            <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-espresso rounded-2xl p-8 flex items-center gap-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold text-2xl font-bold text-espresso shrink-0 overflow-hidden">
                        {user.photo_url ? (
                            <img src={user.photo_url} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            user.name.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-cream">{user.name}</h2>
                        <p className="text-cream/70 text-sm">{user.email}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gold/20 p-6">
                    <UpdateProfileInformationForm updateRoute="admin.profile.update" />
                </div>

                <div className="bg-white rounded-2xl border border-gold/20 p-6">
                    <UpdatePasswordForm />
                </div>

                <div className="bg-white rounded-2xl border border-red-200 p-6">
                    <DeleteUserForm />
                </div>
            </div>
        </AdminLayout>
    );
}
