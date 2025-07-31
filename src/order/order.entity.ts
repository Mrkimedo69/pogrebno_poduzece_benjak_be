import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { OrderStatus } from './order-status.enum';
import { User } from 'src/users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: false, nullable: false, onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

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
