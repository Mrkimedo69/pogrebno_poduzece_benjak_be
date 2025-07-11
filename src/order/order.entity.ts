import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OrderStatus } from './order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column('jsonb')
  items: any[];

  @Column({ nullable: true })
  comment?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;
  
  @CreateDateColumn()
  createdAt: Date;

}
