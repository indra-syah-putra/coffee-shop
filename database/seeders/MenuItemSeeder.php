<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['id' => 1, 'name' => 'Espresso Gold', 'price' => 45000, 'category' => 'Signature Drinks', 'type' => 'hot', 'caffeine' => true, 'image' => '/images/latte.png', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
            ['id' => 2, 'name' => 'Midnight Brew', 'price' => 50000, 'category' => 'Signature Drinks', 'type' => 'hot', 'caffeine' => true, 'image' => 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
            ['id' => 3, 'name' => 'Creamy Cloud Latte', 'price' => 65000, 'category' => 'Signature Drinks', 'type' => 'hot', 'caffeine' => true, 'image' => '/images/latte.png', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
            ['id' => 4, 'name' => 'Iced Velvet Mocha', 'price' => 70000, 'category' => 'Signature Drinks', 'type' => 'cold', 'caffeine' => true, 'image' => 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
            ['id' => 5, 'name' => 'Honey Lavender Tea', 'price' => 55000, 'category' => 'Signature Drinks', 'type' => 'hot', 'caffeine' => false, 'image' => 'https://images.unsplash.com/photo-1544787210-2211d7c309c7?auto=format&fit=crop&q=80&w=600', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
            ['id' => 6, 'name' => 'Butter Croissant', 'price' => 35000, 'category' => 'Pastries', 'type' => null, 'caffeine' => null, 'image' => '/images/pastries.png', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
            ['id' => 7, 'name' => 'Gold-Leaf Macarons', 'price' => 120000, 'category' => 'Pastries', 'type' => null, 'caffeine' => null, 'image' => 'https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&q=80&w=600', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
            ['id' => 8, 'name' => 'Ethiopian Yirgacheffe', 'price' => 220000, 'category' => 'Beans', 'type' => null, 'caffeine' => null, 'image' => 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600', 'description' => 'Dipilih dan disiapkan dengan presisi untuk cita rasa terbaik.', 'active' => true],
        ];

        \DB::table('menu_items')->insert($items);
    }
}
