import { Module } from '@nestjs/common';
import { StoneMaterialsService } from './stone-materials.service';
import { StoneMaterialsController } from './stone-materials.controller';

@Module({
  providers: [StoneMaterialsService],
  controllers: [StoneMaterialsController]
})
export class StoneMaterialsModule {}
