/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilaProducao } from './fila-producao.entity/fila-producao.entity';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from 'src/pedido/pedido.dto';
import {
  CreateFilaProducaoDto,
  EditeFilaProducaoDto,
} from './fila-producao.dto';
import { PedidoService } from 'src/pedido/pedido.service';

@Injectable()
export class FilaProducaoService {
  constructor(
    @InjectRepository(FilaProducao)
    private filaProducaoRepository: Repository<FilaProducao>,
    private readonly pedidoService: PedidoService,
  ) {}

  async findAll(): Promise<FilaProducao[]> {
    return this.filaProducaoRepository.find({
      relations: ['pedido'],
    });
  }
  async addPedidoToFila(
    createPedidoDto: CreatePedidoDto,
  ): Promise<FilaProducao> {
    const pedido = await this.pedidoService.salvarPedido(createPedidoDto);

    const filaProducao: CreateFilaProducaoDto = {
      status: 'pendente',
      pedidoId: pedido.id,
    };

    const fila = this.filaProducaoRepository.create(filaProducao);

    return this.filaProducaoRepository.save(fila);
  }

  async editeStatusFilaProducao(
    id: number,
    editeFilaProducaoDto: EditeFilaProducaoDto,
  ): Promise<FilaProducao> {
    await this.filaProducaoRepository.update(id, editeFilaProducaoDto);
    return this.filaProducaoRepository.findOneBy({ id });
  }
}
