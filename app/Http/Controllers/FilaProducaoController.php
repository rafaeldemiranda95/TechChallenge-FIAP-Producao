<?php

namespace App\Http\Controllers;

use App\Models\FilaProducao;
use App\Service\FilaProducaoService;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Service\PedidoService;

class FilaProducaoController extends Controller
{
    protected $pedidoService;
    protected $filaProducaoService;
    public function __construct(PedidoService $pedidoService, FilaProducaoService $filaProducaoService)
    {
        $this->pedidoService = $pedidoService;
        $this->filaProducaoService = $filaProducaoService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $pedio =  $this->filaProducaoService->peidosFila();
        return response()->json(['data' => $pedio], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate(
                [
                    'tempoTotal' => 'required|integer|min:1',
                    'idCliente' => 'required|integer',
                    'status' => 'required|string',
                    'listaProdutos' => 'required|array',
                    'listaProdutos.*.name' => 'required|string|max:255',
                    'listaProdutos.*.categoria' => 'required|string|max:255',
                    'listaProdutos.*.descricao' => 'required|string',
                    'listaProdutos.*.preco' => 'required|numeric|min:0',
                ],
                [
                    'status.required' => 'O campo status é obrigatório.',
                    'status.string' => 'O campo status deve ser um texto.',
                    'idCliente.required' => 'O campo idCliente é obrigatório.',
                    'listaProdutos.*.name.required' => 'O nome do produto é obrigatório.',
                    'listaProdutos.*.name.string' => 'O nome do produto deve ser texto.',
                    'listaProdutos.*.categoria.required' => 'A categoria do produto é obrigatório.',
                    'listaProdutos.*.categoria.string' => 'O categoria do produto deve ser um texto.',
                    'listaProdutos.*.descricao.required' => 'A descricao do produto é obrigatório.',
                    'listaProdutos.*.descricao.string' => 'A descricao do produto deve ser um texto',
                    'listaProdutos.*.preco.required' => 'A preco do produto é obrigatório.',
                    'listaProdutos.*.preco.numeric' => 'A preco do produto deve ser numérico',
                ]
            );

            $pedio =  $this->pedidoService->enviarPedido($validatedData);

            return response()->json(['success' => 'Pedido realizado com sucesso.', 'data' => $pedio], 200);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(FilaProducao $filaProduto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $filaProduto)
    {
        //
        try {
            $validatedData = $request->validate(
                [
                    'status' => 'required|string',
                ],
                [
                    'status.required' => 'O campo status é obrigatório.',
                    'status.string' => 'O campo status deve ser um texto.',
                ]
            );

            $fila =  $this->filaProducaoService->trocaStatusFila($validatedData, $filaProduto);

            return response()->json(['success' => 'Pedido alterado com sucesso.', 'data' => $fila], 200);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FilaProducao $filaProduto)
    {
        //
    }
}
