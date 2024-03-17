import { Test, TestingModule } from '@nestjs/testing';
import { FilaProducaoService } from './fila-producao.service';

describe('FilaProducaoService', () => {
  let service: FilaProducaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilaProducaoService],
    }).compile();

    service = module.get<FilaProducaoService>(FilaProducaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
