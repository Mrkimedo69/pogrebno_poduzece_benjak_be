import { Controller, Get, Post, Body } from '@nestjs/common';
import { StoneMaterialsService } from './stone-materials.service';
import { StoneMaterial } from './stone-materials.entity';
import { CreateStoneMaterialDto } from './dto/stone-materials.dto';

@Controller('stone-materials')
export class StoneMaterialsController {
  constructor(private readonly service: StoneMaterialsService) {}

  @Get()
  findAll(): Promise<StoneMaterial[]> {
    return this.service.findAll();
  }
  
  @Post()
  create(@Body() dto: CreateStoneMaterialDto): Promise<StoneMaterial> {
    return this.service.create(dto);
  }
}
