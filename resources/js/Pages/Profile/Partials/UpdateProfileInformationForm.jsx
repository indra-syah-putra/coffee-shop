import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    updateRoute,
}) {
    const user = usePage().props.auth.user;
    const [preview, setPreview] = useState(null);
    const fileRef = useRef();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            _method: 'PATCH',
            name: '',
            photo: null,
        });

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route(updateRoute || 'profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreview(null);
                if (fileRef.current) fileRef.current.value = '';
                setData('name', '');
            },
        });
    };

    return (
        <section>
            <header>
                <h2 className="font-serif text-xl font-bold text-espresso">
                    Informasi Profil
                </h2>
                <p className="mt-1 text-sm text-light-brown">
                    Perbarui informasi profil Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Photo */}
                <div>
                    <InputLabel value="Foto Profil" />
                    <div className="mt-2 flex items-center gap-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 text-2xl font-bold text-espresso/40 shrink-0 overflow-hidden">
                            {preview ? (
                                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            )}
                        </div>
                        <div>
                            <label className="cursor-pointer rounded-lg border border-gold/30 bg-cream-dark px-4 py-2 text-sm font-medium text-espresso transition hover:bg-gold/10">
                                Pilih Foto
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handlePhoto}
                                    className="hidden"
                                />
                            </label>
                            <p className="mt-1 text-xs text-light-brown">JPEG, PNG, or WebP. Maks 2MB.</p>
                        </div>
                    </div>
                    <InputError className="mt-2" message={errors.photo} />
                </div>

                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-lg border border-gold/20 bg-cream-dark p-4">
                        <p className="text-sm text-espresso/80">
                            Alamat email Anda belum diverifikasi.
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-700"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-700"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-medium text-green-700">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
