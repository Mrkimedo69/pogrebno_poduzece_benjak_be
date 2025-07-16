import { Test, TestingModule } from '@nestjs/testing';
import { StoneMaterialsService } from './stone-materials.service';

describe('StoneMaterialsService', () => {
  let service: StoneMaterialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoneMaterialsService],
    }).compile();

    service = module.get<StoneMaterialsService>(StoneMaterialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
