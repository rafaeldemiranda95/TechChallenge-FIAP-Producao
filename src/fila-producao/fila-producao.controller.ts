/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePedidoDto } from 'src/pedido/pedido.dto';
import { FilaProducaoService } from './fila-producao.service';
import { FilaProducao } from './fila-producao.entity/fila-producao.entity';
import { EditeFilaProducaoDto } from './fila-producao.dto';

@Controller('fila-producao')
export class FilaProducaoController {
  constructor(private readonly filaProducaoService: FilaProducaoService) { }

  @Get()
  async findAll(): Promise<FilaProducao[]> {
    return this.filaProducaoService.findAll();
  }
  @Post()
  async addPedido(
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<FilaProducao> {
    return this.filaProducaoService.addPedidoToFila(createPedidoDto);
  }

  @Put(':id')
  async editStatusFilaProducao(
    @Param('id') id: number,
    @Body() editeFilaProducaoTdo: EditeFilaProducaoDto,
  ): Promise<FilaProducao> {
    return this.filaProducaoService.editeStatusFilaProducao(
      id,
      editeFilaProducaoTdo,
    );
  }
}
