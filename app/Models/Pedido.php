<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $fillable = [
        'tempoTotal',
        'idCliente',
        'status',
        'listaProdutos',
    ];

    protected $casts = [
        'listaProdutos' => 'array',
    ];

    public $timestamps = true;

    public function filaProducao()
    {
        return $this->hasOne(FilaProducao::class, 'idPedido');
    }
}
