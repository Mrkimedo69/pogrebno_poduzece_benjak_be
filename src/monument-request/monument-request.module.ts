import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonumentRequest } from './monument-request.entity';
import { MonumentRequestService } from './monument-request.service';
import { MonumentRequestController } from './monument-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MonumentRequest])],
  controllers: [MonumentRequestController],
  providers: [MonumentRequestService],
  exports: [MonumentRequestService]
})
export class MonumentRequestModule {}
