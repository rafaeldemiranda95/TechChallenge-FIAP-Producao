/* eslint-disable prettier/prettier */
export class CreateFilaProducaoDto {
  status: string;
  pedidoId: number;
}

export class EditeFilaProducaoDto {
  status: string;
  pedidoId?: number;
}
