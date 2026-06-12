<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\PromoController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingController;
use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Promo;
use App\Models\Setting;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/privacy', function () {
    return Inertia::render('Privacy', [
        'content' => Setting::where('key', 'privacy_policy')->value('value'),
    ]);
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Terms', [
        'content' => Setting::where('key', 'terms_conditions')->value('value'),
    ]);
})->name('terms');

Route::get('/', function () {
    $popularItems = MenuItem::with(['category', 'optionValues', 'toppings'])
        ->select('menu_items.*')
        ->selectRaw('COUNT(order_items.id) as total_orders')
        ->join('order_items', 'menu_items.id', '=', 'order_items.menu_item_id')
        ->join('orders', 'order_items.order_id', '=', 'orders.id')
        ->where('menu_items.active', true)
        ->whereHas('category', fn($q) => $q->where('active', true))
        ->whereIn('orders.status', ['confirmed', 'processing', 'completed'])
        ->groupBy('menu_items.id')
        ->orderByDesc('total_orders')
        ->limit(5)
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'menuItems' => MenuItem::with(['category', 'optionValues', 'toppings'])->where('active', true)->whereHas('category', fn($q) => $q->where('active', true))->orderBy('name')->get(),
        'categories' => Category::where('active', true)->orderBy('name')->pluck('name'),
        'promos' => Promo::active()->get(),
        'settings' => Setting::all()->keyBy('key')->map->value,
        'popularItems' => $popularItems,
    ]);
});

// Admin login portal
Route::middleware('guest')->prefix('dashboardadmin')->name('admin.')->group(function () {
    Route::get('/login', [App\Http\Controllers\Admin\Auth\AdminLoginController::class, 'create'])->name('login');
    Route::post('/login', [App\Http\Controllers\Admin\Auth\AdminLoginController::class, 'store'])->name('login.post');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Bookings
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}/payment', [BookingController::class, 'payment'])->name('bookings.payment');
    Route::post('/bookings/{booking}/pay', [BookingController::class, 'pay'])->name('bookings.pay');
    Route::get('/my-bookings', [BookingController::class, 'myBookings'])->name('my-bookings');

    // Cart
    Route::get('/cart', function () {
        return Inertia::render('Cart/Index');
    })->name('cart');

    // Checkout
    Route::get('/checkout', function () {
        return Inertia::render('Checkout/Index', [
            'promos' => Promo::active()->get(),
        ]);
    })->name('checkout');

    // Orders
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/my-orders', [OrderController::class, 'myOrders'])->name('my-orders');

    // Cart API
    Route::get('/cart/items', [CartController::class, 'index'])->name('cart.items');
    Route::post('/cart/items', [CartController::class, 'store'])->name('cart.items.store');
    Route::put('/cart/items/{cartItem}', [CartController::class, 'update'])->name('cart.items.update');
    Route::delete('/cart/items/{cartItem}', [CartController::class, 'destroy'])->name('cart.items.destroy');
    Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
});

// Admin dashboard
Route::middleware('admin')->prefix('dashboardadmin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [AdminController::class, 'profile'])->name('profile');
    Route::patch('/profile', [AdminController::class, 'updateProfile'])->name('profile.update');
    Route::get('/menu-items', [MenuItemController::class, 'index'])->name('menu-items.index');
    Route::post('/menu-items', [MenuItemController::class, 'store'])->name('menu-items.store');
    Route::put('/menu-items/{menuItem}', [MenuItemController::class, 'update'])->name('menu-items.update');
    Route::delete('/menu-items/{menuItem}', [MenuItemController::class, 'destroy'])->name('menu-items.destroy');
    Route::get('/bookings', [AdminBookingController::class, 'index'])->name('bookings.index');
    Route::put('/bookings/{booking}', [AdminBookingController::class, 'update'])->name('bookings.update');
    Route::delete('/bookings/{booking}', [AdminBookingController::class, 'destroy'])->name('bookings.destroy');
    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::put('/orders/{order}', [AdminOrderController::class, 'update'])->name('orders.update');
    Route::delete('/orders/{order}', [AdminOrderController::class, 'destroy'])->name('orders.destroy');

    // Menu item toppings
    Route::post('/menu-items/{menuItem}/toppings', [MenuItemController::class, 'storeTopping'])->name('menu-items.toppings.store');
    Route::put('/toppings/{topping}', [MenuItemController::class, 'updateTopping'])->name('toppings.update');
    Route::delete('/toppings/{topping}', [MenuItemController::class, 'destroyTopping'])->name('toppings.destroy');

    // Promos
    Route::get('/promos', [PromoController::class, 'index'])->name('promos.index');
    Route::post('/promos', [PromoController::class, 'store'])->name('promos.store');
    Route::put('/promos/{promo}', [PromoController::class, 'update'])->name('promos.update');
    Route::delete('/promos/{promo}', [PromoController::class, 'destroy'])->name('promos.destroy');

    // Categories
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/export-csv', [ReportController::class, 'exportCsv'])->name('reports.export-csv');
    Route::get('/reports/export-pdf', [ReportController::class, 'exportPdf'])->name('reports.export-pdf');

    // Settings
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
    Route::post('/settings/upload-image', [SettingController::class, 'uploadImage'])->name('settings.upload-image');
    Route::delete('/settings/delete-image', [SettingController::class, 'deleteImage'])->name('settings.delete-image');
    Route::post('/settings/reorder-images', [SettingController::class, 'reorderImages'])->name('settings.reorder-images');
});

require __DIR__.'/auth.php';
