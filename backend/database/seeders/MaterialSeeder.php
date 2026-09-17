<?php

namespace Database\Seeders;

use App\Models\Material;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        collect([
            'Papel/Papelão',
            'Plástico',
            'Vidro',
            'Metal',
            'Eletrônicos',
            'Óleo de cozinha',
            'Pilhas/Baterias',
        ])->each(fn (string $nome) => Material::firstOrCreate(['name' => $nome]));
    }
}
