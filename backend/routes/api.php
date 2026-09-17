<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CollectionPointController;
use App\Http\Controllers\Api\MaterialController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'entrar']);

Route::get('/collection-points', [CollectionPointController::class, 'listar']);
Route::get('/collection-points/{pontoDeColeta}', [CollectionPointController::class, 'mostrar']);
Route::get('/materials', [MaterialController::class, 'listar']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'sair']);
    Route::get('/user', [AuthController::class, 'usuarioAtual']);

    Route::post('/collection-points', [CollectionPointController::class, 'criar']);
    Route::put('/collection-points/{pontoDeColeta}', [CollectionPointController::class, 'atualizar']);
    Route::delete('/collection-points/{pontoDeColeta}', [CollectionPointController::class, 'excluir']);
});
