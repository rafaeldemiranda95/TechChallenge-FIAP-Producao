<?php

namespace App\Service;

use App\Repository\PedidoRepository;

class PedidoService
{
    protected $pedidoRepository;
    protected $filaProducaoService;
    public function __construct(PedidoRepository $pedidoRepository, FilaProducaoService $filaProducaoService)
    {
        $this->pedidoRepository = $pedidoRepository;
        $this->filaProducaoService = $filaProducaoService;
    }
    public function enviarPedido($request)
    {
        $pedido = $this->pedidoRepository->enviarPedido($request);

        $fila = $this->filaProducaoService->adicionaFila($pedido);

        return $pedido;
    }
}
