import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param, Put } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { Flower } from './flower.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get()
  getAll(): Promise<Flower[]> {
    return this.flowersService.findAll();
  }

  @Post()
  create(@Body() flower: Partial<Flower>): Promise<Flower> {
    return this.flowersService.create(flower);
  }
  @Post('batch')
  getFlowersByIds(@Body() body: { ids: number[] }) {
    return this.flowersService.findByIds(body.ids);
}
  @Put(':id')
  update(@Param('id') id: number, @Body() body: Partial<Flower>) {
    return this.flowersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.flowersService.remove(id);
  }

}
