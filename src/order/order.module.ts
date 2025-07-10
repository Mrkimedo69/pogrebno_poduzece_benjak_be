import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { ArchivedOrder } from './archived-order.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order,ArchivedOrder,User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
