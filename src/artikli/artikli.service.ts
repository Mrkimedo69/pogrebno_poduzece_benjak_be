import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PogrebniArtikl } from './pogrebni-artikl.entity';

@Injectable()
export class ArtikliService {
  constructor(
    @InjectRepository(PogrebniArtikl)
    private repo: Repository<PogrebniArtikl>,
  ) {}


  findAll(): Promise<PogrebniArtikl[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<PogrebniArtikl> {
    const artikl = await this.repo.findOneBy({ id });
    if (!artikl) {
      throw new NotFoundException(`Artikl s ID ${id} nije pronađen.`);
    }
    return artikl;
  }
  async findByIds(ids: number[]): Promise<PogrebniArtikl[]> {
    return this.repo.find({ where: { id: In(ids) } });
  }
  create(artikl: Partial<PogrebniArtikl>): Promise<PogrebniArtikl> {
    return this.repo.save(this.repo.create(artikl));
  }

  async update(id: number, data: Partial<PogrebniArtikl>): Promise<PogrebniArtikl> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

}
