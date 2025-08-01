import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class MonumentRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userEmail: string;

  @Column()
  userPhone: string;

  @Column('text')
  userNote: string;

  @Column()
  material: string;

  @Column('float')
  materialWidth: number;

  @Column()
  monumentShape: string;

  @Column()
  graveType: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  totalPrice: number;

  @Column('jsonb')
  designParts: {
    naziv: string;
    width: number;
    height?: number;
    height1?: number;
    height2?: number;
    boja: string;
  }[]

  @Column('text')
  image2DBase64: string;

  @CreateDateColumn()
  createdAt: Date;
}
