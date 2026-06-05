<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('settings')->insert([
            [
                'key' => 'privacy_policy',
                'value' => null,
                'group' => 'legal',
                'label' => 'Kebijakan Privasi',
                'type' => 'textarea',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'terms_conditions',
                'value' => null,
                'group' => 'legal',
                'label' => 'Syarat & Ketentuan',
                'type' => 'textarea',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        DB::table('settings')->whereIn('key', ['privacy_policy', 'terms_conditions'])->delete();
    }
};
