import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoneMaterial } from './stone-materials.entity';

@Injectable()
export class StoneMaterialsService {
  constructor(
    @InjectRepository(StoneMaterial)
    private stoneMaterialRepo: Repository<StoneMaterial>,
  ) {}

  findAll() {
    return this.stoneMaterialRepo.find();
  }

  create(data: Partial<StoneMaterial>) {
    const material = this.stoneMaterialRepo.create(data);
    return this.stoneMaterialRepo.save(material);
  }
}
