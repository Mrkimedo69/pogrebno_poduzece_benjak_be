import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';

@Module({
  providers: [FlowersService],
  controllers: [FlowersController]
})
export class FlowersModule {}
