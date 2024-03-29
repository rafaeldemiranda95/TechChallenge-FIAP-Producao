/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilaProducaoModule } from './fila-producao/fila-producao.module';
import { PedidoModule } from './pedido/pedido.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido/pedido.entity/pedido.entity';
import { FilaProducao } from './fila-producao/fila-producao.entity/fila-producao.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // ou outro banco de dados
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'), // o operador '+' converte a string para número
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities:  [FilaProducao, Pedido],
        // outras configurações necessárias...
      }),
    }),
    FilaProducaoModule,
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
