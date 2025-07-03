import { Module } from '@nestjs/common';
import { ArtikliService } from './artikli.service';
import { ArtikliController } from './artikli.controller';

@Module({
  providers: [ArtikliService],
  controllers: [ArtikliController]
})
export class ArtikliModule {}
