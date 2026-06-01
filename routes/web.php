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
    $user = auth()->user();
    if ($user->hasRole('superadmin')) {
        return Inertia::render('Dashboard');
    } elseif ($user->hasRole('student_manager')) {
        return Inertia::render('StudentManager/Dashboard');
    } elseif ($user->hasRole('admission_manager')) {
        return Inertia::render('AdmissionManager/Dashboard');
    } elseif ($user->hasRole('academics_manager')) {
        return Inertia::render('AcademicsManager/Dashboard');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:student_manager'])->prefix('student-manager')->name('student_manager.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('StudentManager/Dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:admission_manager'])->prefix('admission-manager')->name('admission_manager.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('AdmissionManager/Dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:academics_manager'])->prefix('academics-manager')->name('academics_manager.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('AcademicsManager/Dashboard');
    })->name('dashboard');
});

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

    Route::get('/users', [App\Http\Controllers\SuperAdmin\UserController::class, 'index'])->name('users.index');
    Route::post('/users', [App\Http\Controllers\SuperAdmin\UserController::class, 'store'])->name('users.store');
});

require __DIR__.'/auth.php';
