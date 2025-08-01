import { Injectable, NotFoundException } from '@nestjs/common';
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
  
  async update(id: number, data: Partial<StoneMaterial>) {
    const existing = await this.stoneMaterialRepo.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Materijal s ID-jem ${id} nije pronađen`);
    }

    const updated = this.stoneMaterialRepo.merge(existing, data);
    return this.stoneMaterialRepo.save(updated);
  }

  async remove(id: number) {
    await this.stoneMaterialRepo.delete(id);
  }
}
