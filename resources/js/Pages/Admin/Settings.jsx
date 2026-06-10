import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const inputClass =
    'w-full bg-cream-dark border border-gold/10 rounded-xl p-3 focus:ring-2 focus:ring-gold focus:border-gold text-espresso placeholder:text-espresso/30 transition-all';
const labelClass =
    'text-xs font-bold text-espresso/40 uppercase tracking-widest mb-1.5 block';

const groupLabels = {
    store: 'Toko',
    about: 'Tentang',
    social: 'Media Sosial',
    legal: 'Legal',
};

const groupIcons = {
    store: (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
        </svg>
    ),
    about: (
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
    social: (
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
        </svg>
    ),
    legal: (
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
        </svg>
    ),
};

export default function Settings({ settings }) {
    const { errors } = usePage().props;
    const [activeGroup, setActiveGroup] = useState('about');
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const groups = ['about', 'store', 'social', 'legal'];

    const { data, setData, put, processing } = useForm({
        settings: settings.reduce((acc, s) => {
            acc[s.id] = s.value ?? '';
            return acc;
        }, {}),
    });

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            settings: settings
                .filter((s) => !['image', 'images'].includes(s.type))
                .map((s) => ({ id: s.id, value: data.settings[s.id] })),
        };
        router.put(route('admin.settings.update'), payload, {
            preserveScroll: true,
        });
    };

    const handleUploadImages = (settingId, files) => {
        if (!files.length) return;
        setUploading(true);
        let completed = 0;
        for (const file of files) {
            const formData = new FormData();
            formData.append('id', settingId);
            formData.append('image', file);
            router.post(route('admin.settings.upload-image'), formData, {
                preserveScroll: true,
                onFinish: () => {
                    completed++;
                    if (completed === files.length) {
                        setUploading(false);
                    }
                },
            });
        }
    };

    const handleDeleteImage = (settingId, index) => {
        if (deleting) return;
        setDeleting(index);
        router.delete(route('admin.settings.delete-image'), {
            data: { id: settingId, index },
            preserveScroll: true,
            onFinish: () => setDeleting(null),
        });
    };

    const handleReorder = (settingId, images, fromIndex, toIndex) => {
        const reordered = [...images];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(toIndex, 0, moved);
        router.post(
            route('admin.settings.reorder-images'),
            {
                id: settingId,
                images: reordered,
            },
            { preserveScroll: true },
        );
    };

    const handleMoveUp = (settingId, images, index) => {
        if (index === 0) return;
        handleReorder(settingId, images, index, index - 1);
    };

    const handleMoveDown = (settingId, images, index) => {
        if (index === images.length - 1) return;
        handleReorder(settingId, images, index, index + 1);
    };

    const hiddenKeys = ['store_name', 'store_tagline'];
    const groupKeys = ['operating_hours'];
    const grouped = {
        operating_hours: ['operating_hours_weekday', 'operating_hours_weekend'],
    };
    const groupedLabels = {
        operating_hours: {
            label: 'Jam Operasional',
            sub: ['Senin - Jumat', 'Sabtu - Minggu'],
        },
    };
    const groupedIds = Object.values(grouped).flat();

    const subGroups = {
        about: [
            {
                label: 'Hero',
                keys: ['hero_title', 'hero_subtitle', 'hero_description'],
            },
            {
                label: 'Cerita Kami',
                keys: [
                    'about_subtitle',
                    'about_title',
                    'about_content',
                    'about_content_2',
                    'about_image',
                    'about_images',
                    'source_title',
                    'source_content',
                    'roasting_title',
                    'roasting_content',
                ],
            },
        ],
    };
    const currentSettings = settings.filter(
        (s) =>
            s.group === activeGroup &&
            !hiddenKeys.includes(s.key) &&
            !groupedIds.includes(s.key),
    );
    const currentGrouped = settings.filter(
        (s) => s.group === activeGroup && groupedIds.includes(s.key),
    );

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-espresso">
                    Pengaturan
                </h2>
            }
        >
            <Head title="Admin | Settings" />

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-4">
                <div className="lg:col-span-1">
                    <div className="rounded-2xl border border-gold/10 bg-white p-4 shadow-sm lg:sticky lg:top-0">
                        <nav className="space-y-1">
                            {groups.map((group) => (
                                <button
                                    key={group}
                                    onClick={() => setActiveGroup(group)}
                                    className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                                        activeGroup === group
                                            ? 'bg-gold/15 font-semibold text-gold'
                                            : 'text-espresso/60 hover:bg-cream-dark hover:text-espresso'
                                    }`}
                                >
                                    <span
                                        className={
                                            activeGroup === group
                                                ? 'text-gold'
                                                : 'text-espresso/30'
                                        }
                                    >
                                        {groupIcons[group]}
                                    </span>
                                    <span>{groupLabels[group] || group}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="min-h-0 lg:col-span-3">
                    <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                                {groupIcons[activeGroup]}
                            </div>
                            <h3 className="text-lg font-bold text-espresso">
                                {groupLabels[activeGroup]}
                            </h3>
                        </div>

                        <form onSubmit={submit} className="space-y-5">
                            {subGroups[activeGroup]
                                ? subGroups[activeGroup].map((sub) => {
                                      const subSettings = currentSettings.filter(
                                          (s) => sub.keys.includes(s.key),
                                      );
                                      return (
                                          <div
                                              key={sub.label}
                                              className="rounded-xl border border-gold/10 bg-cream-dark/50 p-5"
                                          >
                                              <label className="mb-4 block text-sm font-bold uppercase tracking-widest text-espresso/60">
                                                  {sub.label}
                                              </label>
                                              <div className="space-y-4">
                                                  {subSettings.map(
                                                      (setting) => (
                                                          <div key={setting.id}>
                                                              <label
                                                                  className={
                                                                      labelClass
                                                                  }
                                                              >
                                                                  {setting.label}
                                                              </label>
                                                              {setting.type ===
                                                              'textarea' ? (
                                                                  <textarea
                                                                      value={
                                                                          data
                                                                              .settings[
                                                                              setting
                                                                                  .id
                                                                          ] ??
                                                                          ''
                                                                      }
                                                                      onChange={(
                                                                          e,
                                                                      ) =>
                                                                          setData(
                                                                              `settings.${setting.id}`,
                                                                              e
                                                                                  .target
                                                                                  .value,
                                                                          )
                                                                      }
                                                                      className={
                                                                          inputClass
                                                                      }
                                                                      rows="4"
                                                                  />
                                                              ) : setting.type ===
                                                                'images' ? (
                                                                  <div>
                                                                      <div className="flex items-center space-x-3">
                                                                          <label className="cursor-pointer rounded-xl bg-gold px-4 py-2 text-sm font-bold text-espresso transition-all hover:bg-gold-light">
                                                                              + Tambah Gambar
                                                                              <input
                                                                                  type="file"
                                                                                  accept="image/*"
                                                                                  multiple
                                                                                  onChange={(
                                                                                      e,
                                                                                  ) =>
                                                                                      handleUploadImages(
                                                                                          setting.id,
                                                                                          [
                                                                                              ...e
                                                                                                  .target
                                                                                                  .files,
                                                                                          ],
                                                                                      )
                                                                                  }
                                                                                  className="hidden"
                                                                              />
                                                                          </label>
                                                                          {uploading && (
                                                                              <span className="text-xs text-gold">
                                                                                  Mengupload...
                                                                              </span>
                                                                          )}
                                                                      </div>
                                                                      {(() => {
                                                                          const images =
                                                                              (() => {
                                                                                  try {
                                                                                      return JSON.parse(
                                                                                          setting.value ||
                                                                                              '[]',
                                                                                      );
                                                                                  } catch {
                                                                                      return [];
                                                                                  }
                                                                              })();
                                                                          return (
                                                                              images.length >
                                                                                  0 && (
                                                                                  <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                                                                                      {images.map(
                                                                                          (
                                                                                              img,
                                                                                              idx,
                                                                                          ) => (
                                                                                              <div
                                                                                                  key={
                                                                                                      idx
                                                                                                  }
                                                                                                  className="group relative overflow-hidden rounded-xl border border-gold/10"
                                                                                              >
                                                                                                  <img
                                                                                                      src={`/storage/${img}`}
                                                                                                      alt={`Gambar ${idx + 1}`}
                                                                                                      className="h-32 w-full object-cover"
                                                                                                  />
                                                                                                  <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                                                                      {idx >
                                                                                                          0 && (
                                                                                                          <button
                                                                                                              type="button"
                                                                                                              onClick={() =>
                                                                                                                  handleMoveUp(
                                                                                                                      setting.id,
                                                                                                                      images,
                                                                                                                      idx,
                                                                                                                  )
                                                                                                              }
                                                                                                              className="rounded-lg bg-white/90 p-1.5 text-espresso transition-colors hover:bg-white"
                                                                                                              title="Geser ke kiri"
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
                                                                                                                      d="M15 19l-7-7 7-7"
                                                                                                                  />
                                                                                                              </svg>
                                                                                                          </button>
                                                                                                      )}
                                                                                                      {idx <
                                                                                                          images.length -
                                                                                                              1 && (
                                                                                                          <button
                                                                                                              type="button"
                                                                                                              onClick={() =>
                                                                                                                  handleMoveDown(
                                                                                                                      setting.id,
                                                                                                                      images,
                                                                                                                      idx,
                                                                                                                  )
                                                                                                              }
                                                                                                              className="rounded-lg bg-white/90 p-1.5 text-espresso transition-colors hover:bg-white"
                                                                                                              title="Geser ke kanan"
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
                                                                                                                      d="M9 5l7 7-7 7"
                                                                                                                  />
                                                                                                              </svg>
                                                                                                          </button>
                                                                                                      )}
                                                                                                      <button
                                                                                                          type="button"
                                                                                                          onClick={() =>
                                                                                                              handleDeleteImage(
                                                                                                                  setting.id,
                                                                                                                  idx,
                                                                                                              )
                                                                                                          }
                                                                                                          disabled={
                                                                                                              deleting ===
                                                                                                              idx
                                                                                                          }
                                                                                                          className="rounded-lg bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
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
                                                                                                  <span className="absolute left-1 top-1 rounded bg-espresso/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                                                                                      {idx +
                                                                                                          1}
                                                                                                  </span>
                                                                                              </div>
                                                                                          ),
                                                                                      )}
                                                                                  </div>
                                                                              )
                                                                          );
                                                                      })()}
                                                                      {errors[
                                                                          `settings.${setting.id}`
                                                                      ] && (
                                                                          <p className="mt-1.5 text-xs text-red-500">
                                                                              ⚠{' '}
                                                                              {
                                                                                  errors[
                                                                                      `settings.${setting.id}`
                                                                                  ]
                                                                              }
                                                                          </p>
                                                                      )}
                                                                  </div>
                                                              ) : setting.type ===
                                                                'image' ? (
                                                                  <div>
                                                                      <input
                                                                          type="file"
                                                                          accept="image/*"
                                                                          onChange={(
                                                                              e,
                                                                          ) => {
                                                                              const file =
                                                                                  e
                                                                                      .target
                                                                                      .files[0];
                                                                              if (
                                                                                  !file
                                                                              )
                                                                                  return;
                                                                              const formData =
                                                                                  new FormData();
                                                                              formData.append(
                                                                                  'id',
                                                                                  setting.id,
                                                                              );
                                                                              formData.append(
                                                                                  'image',
                                                                                  file,
                                                                              );
                                                                              router.post(
                                                                                  route(
                                                                                      'admin.settings.upload-image',
                                                                                  ),
                                                                                  formData,
                                                                                  {
                                                                                      preserveScroll: true,
                                                                                  },
                                                                              );
                                                                          }}
                                                                          className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-bold file:text-espresso hover:file:bg-gold-light`}
                                                                      />
                                                                      {setting.value && (
                                                                          <img
                                                                              src={`/storage/${setting.value}`}
                                                                              alt={
                                                                                  setting.label
                                                                              }
                                                                              className="mt-3 h-36 w-48 rounded-xl border border-gold/10 object-cover"
                                                                          />
                                                                      )}
                                                                  </div>
                                                              ) : (
                                                                  <input
                                                                      type="text"
                                                                      value={
                                                                          data
                                                                              .settings[
                                                                              setting
                                                                                  .id
                                                                          ] ??
                                                                          ''
                                                                      }
                                                                      onChange={(
                                                                          e,
                                                                      ) =>
                                                                          setData(
                                                                              `settings.${setting.id}`,
                                                                              e
                                                                                  .target
                                                                                  .value,
                                                                          )
                                                                      }
                                                                      className={
                                                                          inputClass
                                                                      }
                                                                  />
                                                              )}
                                                              {errors[
                                                                  `settings.${setting.id}`
                                                              ] && (
                                                                  <p className="mt-1.5 flex items-center space-x-1 text-xs text-red-500">
                                                                      <span>
                                                                          ⚠
                                                                      </span>
                                                                      <span>
                                                                          {
                                                                              errors[
                                                                                  `settings.${setting.id}`
                                                                              ]
                                                                          }
                                                                      </span>
                                                                  </p>
                                                              )}
                                                          </div>
                                                      ),
                                                  )}
                                              </div>
                                          </div>
                                      );
                                  })
                                : currentSettings.map((setting) => (
                                      <div key={setting.id}>
                                          <label className={labelClass}>
                                              {setting.label}
                                          </label>

                                          {setting.type === 'textarea' ? (
                                              <textarea
                                                  value={
                                                      data.settings[
                                                          setting.id
                                                      ] ?? ''
                                                  }
                                                  onChange={(e) =>
                                                      setData(
                                                          `settings.${setting.id}`,
                                                          e.target.value,
                                                      )
                                                  }
                                                  className={inputClass}
                                                  rows="4"
                                              />
                                          ) : setting.type === 'images' ? (
                                              /* images multi upload */
                                              <div>
                                                  <div className="flex items-center space-x-3">
                                                      <label className="cursor-pointer rounded-xl bg-gold px-4 py-2 text-sm font-bold text-espresso transition-all hover:bg-gold-light">
                                                          + Tambah Gambar
                                                          <input
                                                              type="file"
                                                              accept="image/*"
                                                              multiple
                                                              onChange={(e) =>
                                                                  handleUploadImages(
                                                                      setting.id,
                                                                      [
                                                                          ...e
                                                                              .target
                                                                              .files,
                                                                      ],
                                                                  )
                                                              }
                                                              className="hidden"
                                                          />
                                                      </label>
                                                      {uploading && (
                                                          <span className="text-xs text-gold">
                                                              Mengupload...
                                                          </span>
                                                      )}
                                                  </div>

                                                  {(() => {
                                                      const images = (() => {
                                                          try {
                                                              return JSON.parse(
                                                                  setting.value ||
                                                                      '[]',
                                                              );
                                                          } catch {
                                                              return [];
                                                          }
                                                      })();
                                                      return (
                                                          images.length > 0 && (
                                                              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                                                                  {images.map(
                                                                      (
                                                                          img,
                                                                          idx,
                                                                      ) => (
                                                                          <div
                                                                              key={
                                                                                  idx
                                                                              }
                                                                              className="group relative overflow-hidden rounded-xl border border-gold/10"
                                                                          >
                                                                              <img
                                                                                  src={`/storage/${img}`}
                                                                                  alt={`Gambar ${idx + 1}`}
                                                                                  className="h-32 w-full object-cover"
                                                                              />
                                                                              <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                                                  {idx >
                                                                                      0 && (
                                                                                      <button
                                                                                          type="button"
                                                                                          onClick={() =>
                                                                                              handleMoveUp(
                                                                                                  setting.id,
                                                                                                  images,
                                                                                                  idx,
                                                                                              )
                                                                                          }
                                                                                          className="rounded-lg bg-white/90 p-1.5 text-espresso transition-colors hover:bg-white"
                                                                                          title="Geser ke kiri"
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
                                                                                                  d="M15 19l-7-7 7-7"
                                                                                              />
                                                                                          </svg>
                                                                                      </button>
                                                                                  )}
                                                                                  {idx <
                                                                                      images.length -
                                                                                          1 && (
                                                                                      <button
                                                                                          type="button"
                                                                                          onClick={() =>
                                                                                              handleMoveDown(
                                                                                                  setting.id,
                                                                                                  images,
                                                                                                  idx,
                                                                                              )
                                                                                          }
                                                                                          className="rounded-lg bg-white/90 p-1.5 text-espresso transition-colors hover:bg-white"
                                                                                          title="Geser ke kanan"
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
                                                                                                  d="M9 5l7 7-7 7"
                                                                                              />
                                                                                          </svg>
                                                                                      </button>
                                                                                  )}
                                                                                  <button
                                                                                      type="button"
                                                                                      onClick={() =>
                                                                                          handleDeleteImage(
                                                                                              setting.id,
                                                                                              idx,
                                                                                          )
                                                                                      }
                                                                                      disabled={
                                                                                          deleting ===
                                                                                          idx
                                                                                      }
                                                                                      className="rounded-lg bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
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
                                                                              <span className="absolute left-1 top-1 rounded bg-espresso/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                                                                  {idx +
                                                                                      1}
                                                                              </span>
                                                                          </div>
                                                                      ),
                                                                  )}
                                                              </div>
                                                          )
                                                      );
                                                  })()}

                                                  {errors[
                                                      `settings.${setting.id}`
                                                  ] && (
                                                      <p className="mt-1.5 text-xs text-red-500">
                                                          ⚠{' '}
                                                          {
                                                              errors[
                                                                  `settings.${setting.id}`
                                                              ]
                                                          }
                                                      </p>
                                                  )}
                                              </div>
                                          ) : setting.type === 'image' ? (
                                              <div>
                                                  <input
                                                      type="file"
                                                      accept="image/*"
                                                      onChange={(e) => {
                                                          const file =
                                                              e.target.files[0];
                                                          if (!file) return;
                                                          const formData =
                                                              new FormData();
                                                          formData.append(
                                                              'id',
                                                              setting.id,
                                                          );
                                                          formData.append(
                                                              'image',
                                                              file,
                                                          );
                                                          router.post(
                                                              route(
                                                                  'admin.settings.upload-image',
                                                              ),
                                                              formData,
                                                              {
                                                                  preserveScroll: true,
                                                              },
                                                          );
                                                      }}
                                                      className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-gold file:px-4 file:py-2 file:text-sm file:font-bold file:text-espresso hover:file:bg-gold-light`}
                                                  />
                                                  {setting.value && (
                                                      <img
                                                          src={`/storage/${setting.value}`}
                                                          alt={setting.label}
                                                          className="mt-3 h-36 w-48 rounded-xl border border-gold/10 object-cover"
                                                      />
                                                  )}
                                              </div>
                                          ) : (
                                              <input
                                                  type="text"
                                                  value={
                                                      data.settings[
                                                          setting.id
                                                      ] ?? ''
                                                  }
                                                  onChange={(e) =>
                                                      setData(
                                                          `settings.${setting.id}`,
                                                          e.target.value,
                                                      )
                                                  }
                                                  className={inputClass}
                                              />
                                          )}

                                          {errors[
                                              `settings.${setting.id}`
                                          ] && (
                                              <p className="mt-1.5 flex items-center space-x-1 text-xs text-red-500">
                                                  <span>⚠</span>
                                                  <span>
                                                      {
                                                          errors[
                                                              `settings.${setting.id}`
                                                          ]
                                                      }
                                                  </span>
                                              </p>
                                          )}
                                      </div>
                                  ))}

                            {Object.keys(grouped).map((groupKey) => {
                                const groupSettings = currentGrouped.filter(
                                    (s) => grouped[groupKey].includes(s.key),
                                );
                                if (groupSettings.length === 0) return null;
                                const subLabels = groupedLabels[groupKey].sub;
                                return (
                                    <div
                                        key={groupKey}
                                        className="rounded-xl border border-gold/10 bg-cream-dark/50 p-5"
                                    >
                                        <label className="mb-4 block text-sm font-bold uppercase tracking-widest text-espresso/60">
                                            {groupedLabels[groupKey].label}
                                        </label>
                                        <div className="space-y-4">
                                            {groupSettings.map((s, i) => {
                                                const parts = (
                                                    data.settings[s.id] ?? ''
                                                ).split(' - ');
                                                const start = parts[0] || '';
                                                const end = parts[1] || '';
                                                return (
                                                    <div key={s.id}>
                                                        <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-espresso/40">
                                                            {subLabels[i] ||
                                                                s.label}
                                                        </label>
                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="time"
                                                                value={start}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        `settings.${s.id}`,
                                                                        e.target
                                                                            .value +
                                                                            ' - ' +
                                                                            end,
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                            <span className="font-bold text-espresso/40">
                                                                —
                                                            </span>
                                                            <input
                                                                type="time"
                                                                value={end}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        `settings.${s.id}`,
                                                                        start +
                                                                            ' - ' +
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    )
                                                                }
                                                                className={
                                                                    inputClass
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {(currentSettings.filter(
                                (s) => !['image', 'images'].includes(s.type),
                            ).length > 0 ||
                                currentGrouped.length > 0) && (
                                <div className="border-t border-gold/10 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-xl bg-gradient-to-r from-gold to-gold-light px-8 py-3 text-sm font-bold text-espresso transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Simpan Pengaturan'}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
