import { Test, TestingModule } from '@nestjs/testing';
import { StoneMaterialsController } from './stone-materials.controller';

describe('StoneMaterialsController', () => {
  let controller: StoneMaterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoneMaterialsController],
    }).compile();

    controller = module.get<StoneMaterialsController>(StoneMaterialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
