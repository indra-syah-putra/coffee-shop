<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('settings')->insert([
            [
                'key' => 'about_subtitle',
                'label' => 'Subjudul Cerita Kami',
                'value' => 'Warisan Kami',
                'type' => 'text',
                'group' => 'about',
            ],
            [
                'key' => 'source_title',
                'label' => 'Judul Sumber',
                'value' => 'Sumber Langsung',
                'type' => 'text',
                'group' => 'about',
            ],
            [
                'key' => 'source_content',
                'label' => 'Konten Sumber',
                'value' => 'Bekerja langsung dengan petani untuk memastikan upah yang adil dan kualitas premium.',
                'type' => 'textarea',
                'group' => 'about',
            ],
            [
                'key' => 'roasting_title',
                'label' => 'Judul Sangrai',
                'value' => 'Sangrai Harian',
                'type' => 'text',
                'group' => 'about',
            ],
            [
                'key' => 'roasting_content',
                'label' => 'Konten Sangrai',
                'value' => 'Kesegaran terjamin dengan sesi sangrai setiap pagi di rumah kami.',
                'type' => 'textarea',
                'group' => 'about',
            ],
        ]);
    }

    public function down(): void
    {
        DB::table('settings')->whereIn('key', [
            'about_subtitle', 'source_title', 'source_content', 'roasting_title', 'roasting_content',
        ])->delete();
    }
};
