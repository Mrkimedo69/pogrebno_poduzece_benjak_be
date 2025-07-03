import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { Flower } from './flower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flower])],
  providers: [FlowersService],
  controllers: [FlowersController],
})
export class FlowersModule {
  constructor(private flowersService: FlowersService) {
    this.flowersService.seedInitialFlowers();
  }
}
