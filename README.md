<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

<h1 align="center">☕ Coffee Shop</h1>
<p align="center">
Aplikasi manajemen kedai kopi berbasis web yang dibuat menggunakan Laravel 11, Inertia, dan React.
</p>

## Fitur Utama
 * **Manajemen Menu** — Kelola daftar menu kopi dan non-kopi lengkap dengan kategori, jenis, serta informasi kandungan kafein.
 * **Reservasi Tempat** — Booking meja secara online dengan memilih tanggal, jam, jumlah tamu, dan tipe meja.
 * **Sistem Order** — Pemesanan makanan dan minuman langsung lewat aplikasi.
 * **Dashboard Admin** — Halaman khusus admin untuk memantau dan mengelola data menu, reservasi, serta pesanan masuk.
 * **Autentikasi Pengguna** — Fitur login dan daftar akun, lengkap dengan pembagian peran (role) user dan admin.
 * **Keranjang & Checkout** — Alur belanja yang simpel untuk memudahkan proses pemesanan.

## Teknologi yang Digunakan
| Bagian | Teknologi |
|---|---|
| **Backend** | Laravel 11, PHP 8.2+ |
| **Frontend** | React 18, Inertia.js, Tailwind CSS |
| **Database** | MySQL |
| **Build Tool** | Vite, Laravel Vite Plugin |

## Features

- **Menu Management** — Browse coffee and non-coffee menus with categories, types, and caffeine info
- **Online Booking** — Reserve tables with date, time, guest count, and table type selection
- **Order System** — Place food & beverage orders online
- **Admin Dashboard** — Manage menu items, bookings, and orders
- **User Authentication** — Login/register with admin role support
- **Cart & Checkout** — Simple cart workflow for orders

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Backend  | Laravel 11, PHP 8.2+                |
| Frontend | React 18, Inertia.js, Tailwind CSS  |
| Database | MySQL (via Laravel migrations)      |
| Build    | Vite, Laravel Vite Plugin           |

## Requirements

- PHP ^8.2
- Composer
- Node.js & npm
- MySQL / MariaDB

## Installation

## Cara Instalasi
Ikuti langkah-langkah berikut untuk menjalankan project di lokal komputer kamu:
```bash
# 1. Clone repository ini
git clone https://github.com/your-username/coffe-shop.git
cd coffe-shop

# 2. Instal dependencies backend (PHP)
composer install

# 3. Instal dependencies frontend (JavaScript)
npm install

# 4. Setup environment file
cp .env.example .env
php artisan key:generate

# 5. Sesuaikan pengaturan database di file .env, lalu jalankan migrasi:
php artisan migrate

# 6. Build file assets frontend
npm run build

# 7. Jalankan server lokal
php artisan serve

```
## Mode Pengembangan (Development)
Untuk masuk ke mode pengembangan dan memantau perubahan kode secara real-time, jalankan perintah berikut:
```bash
npm run dev

```
Atau jika ingin menjalankan server Laravel dan Vite secara terpisah:
```bash
# Jalankan di terminal 1
php artisan serve

# Jalankan di terminal 2
npm run dev

```
## Akses Admin
Untuk masuk ke halaman admin, buat akun terlebih dahulu melalui menu registrasi biasa. Setelah itu, ubah nilai kolom is_admin menjadi 1 pada tabel users di database kamu.
Halaman admin dapat diakses melalui URL:
```text
/dashboardadmin/login

```
## Struktur Folder Project
```text
├── app/
│   ├── Http/Controllers/    # Controller untuk logika aplikasi & admin
│   ├── Models/              # Model Eloquent (Representasi tabel database)
│   └── Providers/           # Service providers bawaan Laravel
├── database/
│   └── migrations/          # File skema database
├── resources/
│   └── views/               # Root template Blade untuk Inertia
├── routes/
│   ├── web.php              # Rute utama aplikasi
│   └── auth.php             # Rute untuk fitur login & daftar
└── config/                  # File konfigurasi global Laravel

```
## License

[MIT](LICENSE)
