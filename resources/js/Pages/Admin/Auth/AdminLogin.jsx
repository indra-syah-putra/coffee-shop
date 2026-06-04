import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function AdminLogin({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-cream pt-6 sm:justify-center sm:pt-0">
            <Head title="Admin | Masuk" />

            <div className="mb-6">
                <span className="text-3xl font-bold tracking-tighter text-espresso">KAFEIN</span>
                <span className="block text-center text-xs text-espresso/40 mt-1 uppercase tracking-widest">Admin Panel</span>
            </div>

            <div className="w-full overflow-hidden bg-white px-8 py-10 shadow-2xl sm:max-w-md sm:rounded-2xl border border-gold/20">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-espresso">Masuk Admin</h2>
                    <p className="text-espresso/60 text-sm">Akses panel administrasi</p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-espresso/70" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-cream-dark border-light-brown/20 text-espresso"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-espresso/70" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-cream-dark border-light-brown/20 text-espresso"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6">
                        <PrimaryButton className="w-full justify-center" disabled={processing}>
                            Masuk
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
