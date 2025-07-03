import { Controller, Get, Post, Body } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { Flower } from './flower.entity';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get()
  getAll(): Promise<Flower[]> {
    return this.flowersService.findAll();
  }

  @Post()
  create(@Body() flower: Partial<Flower>): Promise<Flower> {
    return this.flowersService.create(flower);
  }
}
