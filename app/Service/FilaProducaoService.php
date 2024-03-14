<?php

namespace App\Service;

use App\Repository\FilaProducaoRepository;
use App\Repository\PedidoRepository;

class FilaProducaoService
{
    protected $filaProducaoRepository;
    protected $pedidoRepository;
    public function __construct(FilaProducaoRepository $filaProducaoRepository, PedidoRepository $pedidoRepository)
    {
        $this->filaProducaoRepository = $filaProducaoRepository;
        $this->pedidoRepository = $pedidoRepository;
    }
    public function adicionaFila($request)
    {
        $fila = $this->filaProducaoRepository->adicionaFila($request);
        return $fila;
    }
    public function peidosFila()
    {
        $fila = $this->filaProducaoRepository->pedidosFila();
        return $fila;
    }
    public function trocaStatusFila($request, $filaId)
    {
        $fila = $this->filaProducaoRepository->trocaStatusFila($request, $filaId);
        // $produto = $this->pedidoRepository->trocaStatusPedido($request, $fila);
        return $fila;
    }
}
