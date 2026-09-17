<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;

class MaterialController extends Controller
{
    /**
     * Lista os materiais. Público.
     */
    public function listar()
    {
        return Material::orderBy('name')->get();
    }
}
