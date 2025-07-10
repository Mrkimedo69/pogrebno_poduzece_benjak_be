import { Controller, Post, Body, Get, Put, Param, UseGuards, Patch, UnauthorizedException } from '@nestjs/common';
import { OrdersService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-oder-status.dto';
import { Request } from 'express';
import { Req } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employee')
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employee')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateOrderStatusDto,
    @Req() req: Request
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Korisnik nije pronađen.');
    }
    return this.ordersService.updateStatus(+id, updateStatusDto.status, userId);
  }
  @Get('archived')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employee')
    findAllArchived() {
      return this.ordersService.findAllArchived();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('employee')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

}
