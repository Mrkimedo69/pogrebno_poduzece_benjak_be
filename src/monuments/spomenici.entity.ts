import { StoneMaterial } from "src/stone-materials/stone-materials.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Monument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  previewImageUrl: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => StoneMaterial, { nullable: true })
  @JoinColumn()
  defaultMaterial: StoneMaterial;

  @CreateDateColumn()
  createdAt: Date;
}
