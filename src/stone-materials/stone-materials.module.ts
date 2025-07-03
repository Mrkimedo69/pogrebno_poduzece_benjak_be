import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoneMaterial } from './stone-materials.entity';
import { StoneMaterialsService } from './stone-materials.service';
import { StoneMaterialsController } from './stone-materials.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StoneMaterial])],
  providers: [StoneMaterialsService],
  controllers: [StoneMaterialsController],
})
export class StoneMaterialsModule {}
