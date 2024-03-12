<?php

namespace App\Repository;

use App\Models\Pedido;

class PedidoRepository
{
    public function enviarPedido($request)
    {
        // $pedido = Pedido::create([
        //     'idCliente' => $request['idCliente'],
        //     'status' => $request['status'],
        //     'precoTotal' => $request['precoTotal'],
        //     'listaProdutos' => $request['listaProdutos']
        //     // 'tempoTotal' => 0,
        // ]);
        $pedido = Pedido::create($request);
        return $pedido;
    }
    public function trocaStatusPedido($request, $fila)
    {
        $pedido = Pedido::find($fila->idPedido)->update($request);
        return $pedido;
    }
}
