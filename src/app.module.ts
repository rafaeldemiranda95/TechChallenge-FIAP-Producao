/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilaProducaoModule } from './fila-producao/fila-producao.module';
import { PedidoModule } from './pedido/pedido.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido/pedido.entity/pedido.entity';
import { FilaProducao } from './fila-producao/fila-producao.entity/fila-producao.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'producao',
      autoLoadEntities: true,
      synchronize: true, // Use apenas em desenvolvimento
      entities: [FilaProducao, Pedido],
    }),
    FilaProducaoModule,
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
