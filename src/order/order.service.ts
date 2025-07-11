import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.enum';
import { ArchivedOrder } from './archived-order.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(ArchivedOrder)
    private archivedRepo: Repository<ArchivedOrder>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async create(order: Partial<Order>): Promise<Order> {
    return this.orderRepo.save(order);
  }

  async findAll(status?: OrderStatus): Promise<Order[]> {
    if (status) {
      return this.orderRepo.find({ where: { status } });
    }
    return this.orderRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
  
    if (!order) {
      throw new NotFoundException(`Narudžba s ID ${id} nije pronađena.`);
    }
  
    return order;
  }
  async findAllArchived(): Promise<ArchivedOrder[]> {
    return this.archivedRepo.find({ order: { archivedAt: 'DESC' } });
  }

async updateStatus(id: number, status: OrderStatus, userId: number) {
  const order = await this.orderRepo.findOne({ where: { id } });
  if (!order) throw new NotFoundException('Narudžba nije pronađena');

  const employee = await this.userRepo.findOne({ where: { id: userId } });
  if (!employee) throw new NotFoundException('Zaposlenik nije pronađen');

  if (status === 'resolved') {
    await this.archivedRepo.save({
      fullName: order.fullName,
      email: order.email,
      items: order.items,
      totalPrice: order.totalPrice,
      originalOrderId: order.id,
      resolvedBy: employee.fullName,
    });

    await this.orderRepo.remove(order);

    return { message: 'Narudžba arhivirana i uklonjena iz aktivnih.' };
  }

  order.status = status;
  return this.orderRepo.save(order);
}

  
}
