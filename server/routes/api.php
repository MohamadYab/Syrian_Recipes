<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; // Importing the Route Facades
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController; // Importing The AuthenticatedSessionController for login and logout
use Laravel\Fortify\Http\Controllers\RegisteredUserController; // Importing The RegisteredUserController for registration
use App\Http\Controllers\RecipeController; // Importing Recipe Controller
use App\Http\Controllers\CategoryController; // Importing Category Controller
use App\Http\Controllers\RatingController; // Importing Rating Controller
use App\Http\Controllers\ReplyController; // Importing Reply Controller  


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where the API routes for Syrian+ Recipes application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "sanctum" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:sanctum'], function(){
    // Here I will put all the routes that require sanctum middleware to be accessed.

    Route::apiResource('reply', ReplyController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('rating', RatingController::class)->only(['store', 'update', 'destroy']);

    // Admin's Only Routes 
    Route::group(['middleware' => 'isAdmin'], function(){ // Test if the current user is Admin or not. NEEDS TESTING.
        Route::apiResource('recipes', RecipeController::class)->only(['store', 'update', 'destroy']);
        Route::apiResource('category', CategoryController::class)->only(['store', 'update', 'destroy']);
/*         Route::apiResource('reply', ReplyController::class)->only(['store', 'update', 'destroy']);
        Route::apiResource('rating', RatingController::class)->only(['store', 'update', 'destroy']); */
    });
});

Route::apiResource('reply', ReplyController::class)->only(['show']);
Route::apiResource('rating', RatingController::class)->only(['show']);
Route::apiResource('recipes', RecipeController::class)->only(['index' ,'show', 'search']);
Route::apiResource('category', CategoryController::class)->only(['show', 'index']);


/*
|--------------------------------------------------------------------------
| Fortify Routes
|--------------------------------------------------------------------------
|
| Routes of the fortify package.
|
*/

$limiter = config('fortify.limiters.login');

// Registration...
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest']);

// LogIn...
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(array_filter([
        'guest',
        $limiter ? 'throttle:'.$limiter : null,
    ]));

// LogOut...
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

