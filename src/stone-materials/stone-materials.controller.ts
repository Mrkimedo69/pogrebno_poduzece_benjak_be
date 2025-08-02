import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards
} from '@nestjs/common';
import { StoneMaterialsService } from './stone-materials.service';
import { StoneMaterial } from './stone-materials.entity';
import { CreateStoneMaterialDto } from './dto/stone-materials.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('stone-materials')
export class StoneMaterialsController {
  constructor(private readonly service: StoneMaterialsService) {}

  @Get()
  findAll(): Promise<StoneMaterial[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
  @Get('admin')
  findAllAdmin(): Promise<StoneMaterial[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateStoneMaterialDto): Promise<StoneMaterial> {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<StoneMaterial>,
  ): Promise<StoneMaterial> {
    return this.service.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }

}
