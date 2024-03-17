/* eslint-disable prettier/prettier */
import { Pedido } from 'src/pedido/pedido.entity/pedido.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class FilaProducao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  pedidoId: number;

  // @OneToOne(() => Pedido, (pedido) => pedido.filaProducao)
  // pedido: Pedido;
  @ManyToOne(() => Pedido)
  @JoinColumn({ name: 'pedidoId' }) // Isso cria a chave estrangeira na tabela FilaProducao
  pedido: Pedido;
}
