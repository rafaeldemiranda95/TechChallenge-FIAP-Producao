import { Test, TestingModule } from '@nestjs/testing';
import { FilaProducaoController } from './fila-producao.controller';

describe('FilaProducaoController', () => {
  let controller: FilaProducaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilaProducaoController],
    }).compile();

    controller = module.get<FilaProducaoController>(FilaProducaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
