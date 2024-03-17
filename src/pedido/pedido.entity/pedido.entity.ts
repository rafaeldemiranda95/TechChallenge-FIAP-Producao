/* eslint-disable prettier/prettier */

// import { FilaProducao } from 'src/fila-producao/fila-producao.entity/fila-producao.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryColumn()
  id: number;

  @Column()
  tempoTotal: number;

  @Column()
  status: string;

  @Column('json')
  listaProdutos: any[];

  // @OneToOne(() => FilaProducao, (filaProducao) => filaProducao.pedido)
  // @JoinColumn()
  // filaProducao: FilaProducao;
}
