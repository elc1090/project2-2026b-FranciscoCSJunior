<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCollectionPointRequest;
use App\Http\Requests\UpdateCollectionPointRequest;
use App\Models\CollectionPoint;
use Illuminate\Http\Request;

class CollectionPointController extends Controller
{
    /**
     * Lista os pontos de coleta. Público; aceita filtro opcional por material.
     */
    public function listar(Request $requisicao)
    {
        $consulta = CollectionPoint::query()->with('materiais');

        if ($idDoMaterial = $requisicao->query('material_id')) {
            $consulta->whereHas('materiais', fn ($q) => $q->where('materials.id', $idDoMaterial));
        }

        return $consulta->latest()->get();
    }

    /**
     * Cria um novo ponto de coleta.
     */
    public function criar(StoreCollectionPointRequest $requisicao)
    {
        $ponto = $requisicao->user()->pontosDeColeta()->create($requisicao->safe()->except('materiais'));
        $ponto->materiais()->sync($requisicao->safe()->input('materiais', []));

        return $ponto->load('materiais')->fresh('materiais');
    }

    /**
     * Mostra um ponto de coleta específico.
     */
    public function mostrar(CollectionPoint $pontoDeColeta)
    {
        return $pontoDeColeta->load('materiais');
    }

    /**
     * Atualiza um ponto de coleta existente.
     */
    public function atualizar(UpdateCollectionPointRequest $requisicao, CollectionPoint $pontoDeColeta)
    {
        $pontoDeColeta->update($requisicao->safe()->except('materiais'));

        if ($requisicao->has('materiais')) {
            $pontoDeColeta->materiais()->sync($requisicao->input('materiais', []));
        }

        return $pontoDeColeta->fresh('materiais');
    }

    /**
     * Remove um ponto de coleta.
     */
    public function excluir(CollectionPoint $pontoDeColeta)
    {
        $pontoDeColeta->delete();

        return response()->noContent();
    }
}
