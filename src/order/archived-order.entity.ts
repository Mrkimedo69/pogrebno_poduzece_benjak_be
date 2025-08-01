import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { OrderStatus } from "./order-status.enum";

@Entity()
export class ArchivedOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  userId: number;

  @Column('jsonb')
  items: any[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  originalOrderId: number;

  @Column()
  resolvedBy: string;

  @Column({ type: 'enum', enum: OrderStatus, default: 'rejected'})
  status: OrderStatus;

  @CreateDateColumn()
  archivedAt: Date;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
