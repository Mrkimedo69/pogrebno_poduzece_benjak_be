import { Controller, Post, Body, Get, Put, Param, UseGuards, Patch, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { OrdersService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-oder-status.dto';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const userId = req.user?.id;
    return this.ordersService.create({ ...createOrderDto, userId });
  }

  @Roles('employee')
  @Get()
  findAll(@Req() request: Request): Promise<Order[]> {
    const status = request.query['status'] as OrderStatus | undefined;

    if (status && !Object.values(OrderStatus).includes(status)) {
      throw new BadRequestException('Neispravan status narudžbe');
    }
    return this.ordersService.findAll(status);
  }

  @Roles('user')
  @Get('user_orders')
  async getMyOrders(@Req() req: Request) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Korisnik nije pronađen.');
    }
    return this.ordersService.findAllForUser(userId);
  }


  @Roles('employee')
  @Patch(':id/status')
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

  @Roles('employee')
  @Get('archived')
    findAllArchived() {
      return this.ordersService.findAllArchived();
  }

  @Roles('employee')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

}
