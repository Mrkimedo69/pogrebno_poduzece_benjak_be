import { Test, TestingModule } from '@nestjs/testing';
import { ArtikliController } from './artikli.controller';

describe('ArtikliController', () => {
  let controller: ArtikliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtikliController],
    }).compile();

    controller = module.get<ArtikliController>(ArtikliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
