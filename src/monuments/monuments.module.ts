import { Module } from '@nestjs/common';
import { MonumentsService } from './monuments.service';
import { MonumentsController } from './monuments.controller';

@Module({
  providers: [MonumentsService],
  controllers: [MonumentsController]
})
export class MonumentsModule {}
