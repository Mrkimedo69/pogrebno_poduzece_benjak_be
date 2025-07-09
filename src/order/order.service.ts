import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async create(order: Partial<Order>): Promise<Order> {
    return this.orderRepo.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({ order: { createdAt: 'DESC' } });
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) throw new Error('Order not found');
    order.status = status as any;
    return this.orderRepo.save(order);
  }
}
