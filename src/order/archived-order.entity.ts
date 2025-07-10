import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class ArchivedOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column('jsonb')
  items: any[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  originalOrderId: number;

  @Column()
  resolvedBy: string;

  @CreateDateColumn()
  archivedAt: Date;
}
