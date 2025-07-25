import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtikliService } from './artikli.service';
import { ArtikliController } from './artikli.controller';
import { PogrebniArtikl } from './pogrebni-artikl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PogrebniArtikl])],
  providers: [ArtikliService],
  controllers: [ArtikliController],
  exports: [ArtikliService]
})

export class ArtikliModule {

}
