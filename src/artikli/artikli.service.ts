import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  create(artikl: Partial<PogrebniArtikl>): Promise<PogrebniArtikl> {
    return this.repo.save(this.repo.create(artikl));
  }
  async seedInitialItems() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.repo.save([
        {
          naziv: 'Grobna svijeća - klasična',
          cijena: 3,
          opis: 'Crvena klasična svijeća u plastičnom kućištu s poklopcem.',
          slika: 'assets/potrepstine/svijeca1.jpg',
        },
        {
          naziv: 'Lampaš s motivom križa',
          cijena: 8,
          opis: 'Stakleni lampaš s metalnim pokrovom i simbolom križa.',
          slika: 'assets/potrepstine/lampas1.jpg',
        },
      ]);
    }
  }
  
}
