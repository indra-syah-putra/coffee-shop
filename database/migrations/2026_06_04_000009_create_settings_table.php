<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('group')->default('general');
            $table->string('label')->nullable();
            $table->string('type')->default('text');
            $table->timestamps();
        });

        $defaults = [
            ['key' => 'store_name', 'value' => 'Kafein', 'group' => 'store', 'label' => 'Nama Toko', 'type' => 'text'],
            ['key' => 'store_tagline', 'value' => 'Meningkatkan ritual kopi harian Anda dengan presisi, gairah, dan biji kopi organik terbaik di dunia.', 'group' => 'store', 'label' => 'Tagline', 'type' => 'textarea'],
            ['key' => 'store_address', 'value' => 'Jl. Kopi Nikmat No. 123, Jakarta', 'group' => 'store', 'label' => 'Alamat', 'type' => 'textarea'],
            ['key' => 'store_phone', 'value' => '+62 812-3456-7890', 'group' => 'store', 'label' => 'Telepon', 'type' => 'text'],
            ['key' => 'store_email', 'value' => 'hello@kafein.coffee', 'group' => 'store', 'label' => 'Email', 'type' => 'text'],
            ['key' => 'operating_hours_weekday', 'value' => '08:00 - 22:00', 'group' => 'store', 'label' => 'Jam Operasional (Senin - Jumat)', 'type' => 'text'],
            ['key' => 'operating_hours_weekend', 'value' => '09:00 - 23:00', 'group' => 'store', 'label' => 'Jam Operasional (Sabtu - Minggu)', 'type' => 'text'],
            ['key' => 'about_title', 'value' => 'Cerita Kami', 'group' => 'about', 'label' => 'Judul Cerita Kami', 'type' => 'text'],
            ['key' => 'about_content', 'value' => 'Berdiri sejak 2020, Kafein hadir untuk menjadi ruang ketiga bagi para pencinta kopi. Kami menyajikan kopi pilihan dari petani lokal dengan teknik brewing terbaik, menciptakan pengalaman ngopi yang tak terlupakan.', 'group' => 'about', 'label' => 'Konten Cerita Kami', 'type' => 'textarea'],
            ['key' => 'about_image', 'value' => null, 'group' => 'about', 'label' => 'Gambar Cerita Kami', 'type' => 'image'],
            ['key' => 'about_content_2', 'value' => 'Biji kopi kami dipilih langsung karena profil rasa uniknya dan disangrai dengan sempurna oleh para ahli.', 'group' => 'about', 'label' => 'Konten Cerita Kami (paragraf 2)', 'type' => 'textarea'],
            ['key' => 'about_images', 'value' => '[]', 'group' => 'about', 'label' => 'Galeri Cerita Kami', 'type' => 'images'],
            ['key' => 'hero_title', 'value' => 'Nikmati Kopi Terbaik', 'group' => 'about', 'label' => 'Judul Hero', 'type' => 'text'],
            ['key' => 'hero_subtitle', 'value' => 'Dibuat dengan Sepenuh Hati', 'group' => 'about', 'label' => 'Subjudul Hero', 'type' => 'text'],
            ['key' => 'hero_description', 'value' => 'Kopi artisanal dari perkebunan organik paling berkelanjutan di dunia, disangrai setiap hari di jantung kota.', 'group' => 'about', 'label' => 'Deskripsi Hero', 'type' => 'textarea'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/kafein', 'group' => 'social', 'label' => 'Instagram', 'type' => 'text'],
            ['key' => 'facebook', 'value' => 'https://facebook.com/kafein', 'group' => 'social', 'label' => 'Facebook', 'type' => 'text'],
            ['key' => 'tiktok', 'value' => 'https://tiktok.com/@kafein', 'group' => 'social', 'label' => 'TikTok', 'type' => 'text'],
        ];

        foreach ($defaults as $setting) {
            DB::table('settings')->insert($setting + [
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
