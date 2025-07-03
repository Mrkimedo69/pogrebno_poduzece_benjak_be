import { Controller, Get, Post, Body } from '@nestjs/common';
import { ArtikliService } from './artikli.service';
import { PogrebniArtikl } from './pogrebni-artikl.entity';

@Controller('artikli')
export class ArtikliController {
  constructor(private readonly artikliService: ArtikliService) {}

  @Get()
  getAll(): Promise<PogrebniArtikl[]> {
    return this.artikliService.findAll();
  }

  @Post()
  create(@Body() data: Partial<PogrebniArtikl>): Promise<PogrebniArtikl> {
    return this.artikliService.create(data);
  }
  
}
