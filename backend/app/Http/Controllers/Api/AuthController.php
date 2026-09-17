<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function entrar(Request $requisicao)
    {
        $credenciais = $requisicao->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $usuario = User::where('email', $credenciais['email'])->first();

        if (! $usuario || ! Hash::check($credenciais['password'], $usuario->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais informadas estão incorretas.'],
            ]);
        }

        return [
            'token' => $usuario->createToken('spa')->plainTextToken,
            'usuario' => $usuario->only('id', 'name', 'email'),
        ];
    }

    public function sair(Request $requisicao)
    {
        $requisicao->user()->currentAccessToken()->delete();

        return response()->noContent();
    }

    public function usuarioAtual(Request $requisicao)
    {
        return $requisicao->user()->only('id', 'name', 'email');
    }
}
