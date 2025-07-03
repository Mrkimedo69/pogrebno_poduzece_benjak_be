import { Test, TestingModule } from '@nestjs/testing';
import { ArtikliService } from './artikli.service';

describe('ArtikliService', () => {
  let service: ArtikliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtikliService],
    }).compile();

    service = module.get<ArtikliService>(ArtikliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
