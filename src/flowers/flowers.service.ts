import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from './flower.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class FlowersService{
  constructor(
    @InjectRepository(Flower)
    private flowerRepo: Repository<Flower>,
  ) {}

  findAll(): Promise<Flower[]> {
    return this.flowerRepo.find();
  }

  async findByIds(ids: number[]): Promise<Flower[]> {
    return this.flowerRepo.find({
      where: { id: In(ids) }
    });
  }

  create(flower: Partial<Flower>): Promise<Flower> {
    const novi = this.flowerRepo.create(flower);
    return this.flowerRepo.save(novi);
  }
  async update(id: number, data: Partial<Flower>): Promise<Flower> {
    const flower = await this.flowerRepo.findOneBy({ id });
    if (!flower) throw new NotFoundException('Cvijet nije pronađen');
    Object.assign(flower, data);
    return this.flowerRepo.save(flower);
  }
  
  async remove(id: number): Promise<void> {
    const flower = await this.flowerRepo.findOneBy({ id });
    if (!flower) throw new NotFoundException('Cvijet nije pronađen');
    await this.flowerRepo.remove(flower);
  }
}
