import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class StoneMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  textureUrl: string;

  @Column()
  colorHex: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerM2: number;

  @Column()
  isAvailable: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
