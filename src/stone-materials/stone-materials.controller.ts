import { Controller, Get, Post, Body } from '@nestjs/common';
import { StoneMaterialsService } from './stone-materials.service';
import { StoneMaterial } from './stone-materials.entity';

@Controller('stone-materials')
export class StoneMaterialsController {
  constructor(private readonly service: StoneMaterialsService) {}

  @Get()
  findAll(): Promise<StoneMaterial[]> {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: Partial<StoneMaterial>): Promise<StoneMaterial> {
    return this.service.create(data);
  }
}
