import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Flower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column('decimal')
  cijena: number;

  @Column()
  opis: string;

  @Column({ nullable: true })
  slika: string;
}
