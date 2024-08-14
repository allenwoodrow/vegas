<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\BetController;

Route::get('/profile', [UserController::class, 'profile'])->name('profile');
Route::post('/deposit', [TransactionController::class, 'deposit'])->name('deposit');
Route::post('/withdraw', [TransactionController::class, 'withdraw'])->name('withdraw');
Route::get('/games', [GameController::class, 'index'])->name('games.index');
Route::post('/bet', [BetController::class, 'placeBet'])->name('bet.place');


Route::get('/games/wheel_of_fortune', [GameController::class, 'wheelOfFortune'])->name('games.wheel_of_fortune');
Route::get('/games/horse_racing', [GameController::class, 'horseRacing'])->name('games.horse_racing');



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

require __DIR__.'/auth.php';
