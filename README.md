<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
</p>

<h1 align="center">☕ Coffee Shop</h1>

<p align="center">
  A web-based coffee shop management system built with Laravel 11 + Inertia + React.
</p>

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

```bash
# Clone the repository
git clone https://github.com/your-username/coffe-shop.git
cd coffe-shop

# Install PHP dependencies
composer install

# Install frontend dependencies
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Configure your database in .env, then run:
php artisan migrate

# Build assets
npm run build

# Start the development server
php artisan serve
```

## Development

```bash
# Start all dev servers (Laravel + queue + logs + Vite)
npm run dev
```

Or run manually:

```bash
php artisan serve
npm run dev
```

## Admin Access

After migrating, set `is_admin = 1` for a user in the `users` table to access:

```
/dashboardadmin/login
```

## Project Structure

```
├── app/
│   ├── Http/Controllers/    # Application & admin controllers
│   ├── Models/              # Eloquent models
│   └── Providers/           # Service providers
├── database/
│   └── migrations/          # Table schemas
├── resources/
│   └── views/               # Blade layout (Inertia)
├── routes/
│   ├── web.php              # Web routes
│   └── auth.php             # Auth routes
└── config/                  # Laravel configuration
```

## License

[MIT](LICENSE)
