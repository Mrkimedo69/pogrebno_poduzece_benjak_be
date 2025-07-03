import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
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
  @Get(':id')
  getOne(@Param('id') id: number): Promise<PogrebniArtikl> {
    return this.artikliService.findOne(id);
}
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.artikliService.remove(id);
}
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<PogrebniArtikl>,
  ): Promise<PogrebniArtikl> {
    return this.artikliService.update(id, data);
}
}
