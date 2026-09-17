<?php

namespace Database\Seeders;

use App\Models\CollectionPoint;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Seeder;

class CollectionPointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $administrador = User::first();

        $pontos = [
            [
                'name' => 'Ecoponto Centro',
                'address' => 'Rua do Acampamento, 500 - Centro, Santa Maria - RS',
                'latitude' => -29.6868,
                'longitude' => -53.8149,
                'opening_hours' => 'Seg-Sex 8h-18h',
                'materiais' => ['Papel/Papelão', 'Plástico', 'Vidro', 'Metal'],
            ],
            [
                'name' => 'Cooperativa de Reciclagem Camobi',
                'address' => 'Av. Roraima, 1000 - Camobi, Santa Maria - RS',
                'latitude' => -29.7181,
                'longitude' => -53.7168,
                'opening_hours' => 'Seg-Sáb 7h-17h',
                'materiais' => ['Papel/Papelão', 'Plástico', 'Metal', 'Eletrônicos'],
            ],
            [
                'name' => 'Ponto de Coleta UFSM',
                'address' => 'Av. Roraima, 1000 - Cidade Universitária, Santa Maria - RS',
                'latitude' => -29.7158,
                'longitude' => -53.7181,
                'opening_hours' => 'Seg-Sex 9h-21h',
                'materiais' => ['Papel/Papelão', 'Vidro', 'Pilhas/Baterias', 'Eletrônicos'],
            ],
            [
                'name' => 'Ecoponto Nonoai',
                'address' => 'Rua Appel, 1200 - Nonoai, Santa Maria - RS',
                'latitude' => -29.7025,
                'longitude' => -53.8264,
                'opening_hours' => 'Seg-Sex 8h-17h',
                'materiais' => ['Papel/Papelão', 'Plástico', 'Vidro'],
            ],
            [
                'name' => 'Ponto de Coleta Nossa Senhora de Fátima',
                'address' => 'Av. Nossa Senhora de Fátima, 800 - N. Sra. de Fátima, Santa Maria - RS',
                'latitude' => -29.6975,
                'longitude' => -53.7975,
                'opening_hours' => 'Seg-Sáb 8h-18h',
                'materiais' => ['Papel/Papelão', 'Plástico', 'Metal', 'Óleo de cozinha'],
            ],
            [
                'name' => 'Ecoponto Km 3',
                'address' => 'Av. Presidente Vargas, 3000 - Km 3, Santa Maria - RS',
                'latitude' => -29.6580,
                'longitude' => -53.7550,
                'opening_hours' => 'Seg-Sex 7h30-17h30',
                'materiais' => ['Metal', 'Eletrônicos', 'Pilhas/Baterias', 'Óleo de cozinha'],
            ],
            [
                'name' => 'Ponto de Coleta Tancredo Neves',
                'address' => 'Rua Radialista Osvaldo Nobre, 450 - Tancredo Neves, Santa Maria - RS',
                'latitude' => -29.6690,
                'longitude' => -53.7830,
                'opening_hours' => 'Seg-Sex 8h-18h, Sáb 8h-12h',
                'materiais' => ['Papel/Papelão', 'Plástico', 'Vidro', 'Metal'],
            ],
        ];

        foreach ($pontos as $dados) {
            $nomesDosMateriais = $dados['materiais'];
            unset($dados['materiais']);

            $ponto = CollectionPoint::firstOrCreate(
                ['name' => $dados['name']],
                [...$dados, 'user_id' => $administrador?->id]
            );

            $ponto->materiais()->sync(
                Material::whereIn('name', $nomesDosMateriais)->pluck('id')
            );
        }
    }
}
