<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:superadmin'])->prefix('superadmin')->name('superadmin.')->group(function () {
    Route::get('/notifications', [App\Http\Controllers\SuperAdmin\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/mark-as-read', [App\Http\Controllers\SuperAdmin\NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
    Route::post('/notifications/mark-all-as-read', [App\Http\Controllers\SuperAdmin\NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
    Route::delete('/notifications/{id}', [App\Http\Controllers\SuperAdmin\NotificationController::class, 'destroy'])->name('notifications.destroy');

    Route::get('/schools', [App\Http\Controllers\SuperAdmin\SchoolController::class, 'index'])->name('schools.index');
    Route::get('/schools/create', [App\Http\Controllers\SuperAdmin\SchoolController::class, 'create'])->name('schools.create');
    Route::post('/schools', [App\Http\Controllers\SuperAdmin\SchoolController::class, 'store'])->name('schools.store');

    Route::get('/roles', [App\Http\Controllers\SuperAdmin\RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [App\Http\Controllers\SuperAdmin\RoleController::class, 'store'])->name('roles.store');

    Route::get('/admins', [App\Http\Controllers\SuperAdmin\SchoolAdminController::class, 'index'])->name('admins.index');
    Route::post('/admins', [App\Http\Controllers\SuperAdmin\SchoolAdminController::class, 'store'])->name('admins.store');
});

require __DIR__.'/auth.php';
