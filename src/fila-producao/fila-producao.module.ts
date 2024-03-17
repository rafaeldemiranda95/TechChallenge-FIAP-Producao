import { Module } from '@nestjs/common';
import { FilaProducaoService } from './fila-producao.service';
import { FilaProducaoController } from './fila-producao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/pedido/pedido.entity/pedido.entity';
import { FilaProducao } from './fila-producao.entity/fila-producao.entity';
import { PedidoService } from 'src/pedido/pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilaProducao, Pedido])], // Importa o TypeOrmModule com a entidade Produto
  providers: [FilaProducaoService, PedidoService],
  controllers: [FilaProducaoController],
})
export class FilaProducaoModule {}
