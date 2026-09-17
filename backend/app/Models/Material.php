<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name'])]
class Material extends Model
{
    public function pontosDeColeta(): BelongsToMany
    {
        return $this->belongsToMany(CollectionPoint::class);
    }
}
