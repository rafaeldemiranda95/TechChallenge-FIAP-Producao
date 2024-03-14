<?php

namespace App\Repository;

use App\Models\FilaProducao;

class FilaProducaoRepository
{
    public function adicionaFila($request)
    {
        $fila = FilaProducao::create([
            'idPedido' => $request['id'],
            'status' => $request['status']
        ]);
        return $fila;
    }
    public function pedidosFila()
    {
        $fila = FilaProducao::all();
        return $fila;
    }
    public function trocaStatusFila($request, $filaId)
    {
        $fila = FilaProducao::find($filaId)->update(['status' => $request['status']]);
        return $fila;
    }
}
