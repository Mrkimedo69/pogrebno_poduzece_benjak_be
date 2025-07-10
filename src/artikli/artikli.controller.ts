import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ArtikliService } from './artikli.service';
import { PogrebniArtikl } from './pogrebni-artikl.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('artikli')
export class ArtikliController {
  constructor(private readonly artikliService: ArtikliService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  findAllForAdmin() {
    return this.artikliService.findAllWithFullDetails();
}
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
  @Post('batch')
  getByIds(@Body() body: { ids: number[] }) {
    return this.artikliService.findByIds(body.ids);
  }
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<PogrebniArtikl>,
  ): Promise<PogrebniArtikl> {
    return this.artikliService.update(id, data);
  }
  
}
