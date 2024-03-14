<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fila_producao', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idPedido')->unique(); // Torna a coluna única
            $table->string('status');
            $table->timestamps();

            // Define a coluna 'idPedido' como chave estrangeira referenciando 'id' na tabela 'pedidos'
            $table->foreign('idPedido')->references('id')->on('pedidos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fila_producao');
    }
};
