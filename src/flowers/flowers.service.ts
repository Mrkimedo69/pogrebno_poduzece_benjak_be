import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from './flower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlowersService{
  constructor(
    @InjectRepository(Flower)
    private flowerRepo: Repository<Flower>,
  ) {}

  findAll(): Promise<Flower[]> {
    return this.flowerRepo.find();
  }

  create(flower: Partial<Flower>): Promise<Flower> {
    const novi = this.flowerRepo.create(flower);
    return this.flowerRepo.save(novi);
  }
}
