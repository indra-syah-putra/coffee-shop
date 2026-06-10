import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const inputClass =
    'w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all';
const labelClass =
    'text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block';
const errorClass = 'text-red-500 text-xs mt-1.5 flex items-center space-x-1';

const formatPrice = (value) => {
    if (!value && value !== 0) return '';
    return Number(value).toLocaleString('id-ID');
};

const parsePrice = (formatted) => {
    return String(formatted).replace(/\./g, '');
};

const chipClass = (selected) =>
    `px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
        selected
            ? 'bg-espresso text-white border-espresso shadow-sm'
            : 'border-gold/20 text-espresso/60 hover:border-gold hover:text-espresso'
    }`;

const groupLabelClass =
    'text-[10px] font-bold text-espresso/40 uppercase tracking-widest block mb-2';

const priceInputClass =
    'w-28 bg-cream-dark border border-gold/10 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-gold focus:border-gold text-espresso text-center';

export default function MenuItems({
    items,
    categories,
    sizeOptions,
    temperatureOptions,
    sugarLevelOptions,
}) {
    const { errors } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [preview, setPreview] = useState(null);
    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        transform,
    } = useForm({
        name: '',
        price: '',
        category_id: '',
        image: '',
        description: '',
        option_values: [],
        option_prices: {},
    });

    const toggleOption = (id) => {
        const current = data.option_values || [];
        const isSelected = current.includes(id);
        const newOptionValues = isSelected
            ? current.filter((v) => v !== id)
            : [...current, id];
        const newPrices = { ...data.option_prices };
        if (isSelected) {
            delete newPrices[id];
        }
        setData({
            ...data,
            option_values: newOptionValues,
            option_prices: newPrices,
        });
    };

    const setOptionPrice = (id, value) => {
        setData('option_prices', { ...data.option_prices, [id]: value });
    };

    const resetForm = () => {
        setData({
            name: '',
            price: '',
            category_id: '',
            image: '',
            description: '',
            option_values: [],
            option_prices: {},
        });
        setPreview(null);
        setEditing(null);
    };

    const submit = (e) => {
        e.preventDefault();
        const prices = {};
        for (const [id, val] of Object.entries(data.option_prices || {})) {
            prices[id] = parsePrice(val);
        }
        transform((formData) => ({
            ...formData,
            price: parsePrice(formData.price),
            option_prices: prices,
            ...(editing ? { _method: 'PUT' } : {}),
        }));
        post(editing
            ? route('admin.menu-items.update', editing)
            : route('admin.menu-items.store'), {
            onSuccess: () => resetForm(),
            preserveScroll: true,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const editItem = (item) => {
        const prices = {};
        (item.option_values || []).forEach((ov) => {
            if (ov.pivot?.price) {
                prices[ov.id] = String(Math.round(Number(ov.pivot.price)));
            }
        });
        setEditing(item.id);
        setData({
            name: item.name,
            price: String(Math.round(Number(item.price))),
            category_id: item.category_id ?? '',
            image: null,
            description: item.description ?? '',
            option_values: (item.option_values || []).map((ov) => ov.id),
            option_prices: prices,
        });
        setPreview(item.image ? `/storage/${item.image}` : null);
    };

    const optionLabel = (type) => {
        const map = {
            size: 'Ukuran',
            temperature: 'Suhu',
            sugar_level: 'Level Gula',
        };
        return map[type] || type;
    };

    const hasPrice = (type) => type === 'size' || type === 'temperature';

    const renderOptionGroup = (options, type) => {
        if (!options.length) return null;
        return (
            <div>
                <span className={groupLabelClass}>{optionLabel(type)}</span>
                <div className="flex flex-wrap gap-1.5">
                    {options.map((opt) => {
                        const selected = (data.option_values || []).includes(
                            opt.id,
                        );
                        return (
                            <div key={opt.id} className="flex flex-col gap-1">
                                <div
                                    onClick={() => toggleOption(opt.id)}
                                    className={chipClass(selected)}
                                >
                                    {opt.name}
                                </div>
                                {selected && hasPrice(type) && (
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={formatPrice(
                                            data.option_prices?.[opt.id],
                                        )}
                                        onChange={(e) =>
                                            setOptionPrice(
                                                opt.id,
                                                parsePrice(e.target.value),
                                            )
                                        }
                                        placeholder="Tambah"
                                        className={priceInputClass}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Kelola Menu
                </h2>
            }
        >
            <Head title="Admin | Menu Items" />

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Form */}
                <div className="min-h-0 lg:col-span-1">
                    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-gold/10 bg-white p-6 shadow-sm lg:sticky lg:top-0">
                        <div className="mb-6 flex items-center space-x-3">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ${editing ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}
                            >
                                {editing ? (
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-espresso">
                                {editing ? 'Edit Item' : 'Tambah Item Baru'}
                            </h3>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className={labelClass}>Nama Menu</label>
                                <input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Masukkan nama menu"
                                    className={inputClass}
                                />
                                {errors.name && (
                                    <p className={errorClass}>
                                        <span>⚠</span>
                                        <span>{errors.name}</span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Harga (Rp)</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={formatPrice(data.price)}
                                    onChange={(e) =>
                                        setData(
                                            'price',
                                            parsePrice(e.target.value),
                                        )
                                    }
                                    placeholder="0"
                                    className={inputClass}
                                />
                                {errors.price && (
                                    <p className={errorClass}>
                                        <span>⚠</span>
                                        <span>{errors.price}</span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Kategori</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData('category_id', e.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className={errorClass}>
                                        <span>⚠</span>
                                        <span>{errors.category_id}</span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Gambar</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-bold file:text-espresso hover:file:bg-gold-light`}
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-2 h-32 w-32 rounded-xl border border-gold/10 object-cover"
                                    />
                                )}
                                {errors.image && (
                                    <p className={errorClass}>
                                        <span>⚠</span>
                                        <span>{errors.image}</span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Deskripsi menu..."
                                    className={inputClass}
                                    rows="3"
                                />
                                {errors.description && (
                                    <p className={errorClass}>
                                        <span>⚠</span>
                                        <span>{errors.description}</span>
                                    </p>
                                )}
                            </div>

                            {/* Variasi Options */}
                            {[
                                sizeOptions,
                                temperatureOptions,
                                sugarLevelOptions,
                            ].some((g) => g.length > 0) && (
                                <div className="space-y-4 border-t border-gold/10 pb-2 pt-2">
                                    {renderOptionGroup(sizeOptions, 'size')}
                                    {renderOptionGroup(
                                        temperatureOptions,
                                        'temperature',
                                    )}
                                    {renderOptionGroup(
                                        sugarLevelOptions,
                                        'sugar_level',
                                    )}
                                </div>
                            )}

                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-3 text-sm font-bold text-espresso transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                />
                                            </svg>
                                            <span>Menyimpan...</span>
                                        </span>
                                    ) : editing ? (
                                        'Simpan Perubahan'
                                    ) : (
                                        'Tambah Menu'
                                    )}
                                </button>
                                {editing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-xl border border-gold/20 px-6 py-3 text-sm font-medium text-espresso/60 transition-all hover:border-gold hover:text-espresso"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Menu List */}
                <div className="min-h-0 lg:col-span-2">
                    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-espresso">
                                    Daftar Menu
                                </h3>
                            </div>
                            <span className="rounded-full bg-cream-dark px-3 py-1 text-xs font-medium text-espresso/40">
                                {items.length} item
                            </span>
                        </div>

                        <div className="space-y-3">
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group rounded-xl border border-gold/5 bg-cream-dark transition-all hover:border-gold/20 hover:shadow-sm"
                                >
                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/10 text-sm font-bold text-amber-600">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-espresso">
                                                    {item.name}
                                                </h4>
                                                <div className="mt-0.5 flex items-center space-x-3">
                                                    <span className="text-sm font-bold text-gold">
                                                        Rp{' '}
                                                        {Number(
                                                            item.price,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </span>
                                                    <span className="text-espresso/20">
                                                        |
                                                    </span>
                                                    <span className="text-xs text-espresso/40">
                                                        {item.category?.name ||
                                                            'Tanpa Kategori'}
                                                    </span>
                                                </div>
                                                {item.option_values?.length >
                                                    0 && (
                                                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                                        {item.option_values.map(
                                                            (ov) => (
                                                                <span
                                                                    key={ov.id}
                                                                    className="rounded bg-espresso/10 px-1.5 py-0.5 text-[10px] text-espresso/60"
                                                                >
                                                                    {ov.name}
                                                                    {ov.pivot
                                                                        ?.price
                                                                        ? ` (+Rp ${Number(ov.pivot.price).toLocaleString('id-ID')})`
                                                                        : ''}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => editItem(item)}
                                                className="rounded-lg bg-amber-50 p-2 text-amber-600 transition-colors hover:bg-amber-100"
                                                title="Edit"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            'Hapus item ini?',
                                                        )
                                                    )
                                                        destroy(
                                                            route(
                                                                'admin.menu-items.destroy',
                                                                item.id,
                                                            ),
                                                        );
                                                }}
                                                className="rounded-lg bg-red-50 p-2 text-red-500 transition-colors hover:bg-red-100"
                                                title="Hapus"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {items.length === 0 && (
                                <div className="py-16 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream-dark">
                                        <svg
                                            className="h-8 w-8 text-espresso/20"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                    <p className="italic text-espresso/40">
                                        Belum ada item menu.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
