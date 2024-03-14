<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilaProducao extends Model
{
    use HasFactory;

    protected $table = 'fila_producao';

    protected $fillable = [
        'idPedido',
        'status',
    ];

    public $timestamps = true;

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'idPedido');
    }
}
