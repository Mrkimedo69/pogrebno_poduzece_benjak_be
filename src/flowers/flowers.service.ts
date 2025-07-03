import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flower } from './flower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlowersService {
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
  async seedInitialFlowers() {
    const count = await this.flowerRepo.count();
    if (count === 0) {
      const items = [
        {
          naziv: 'Klasični buket ruža',
          cijena: 25,
          opis: 'Crvene ruže s bijelim zelenilom, elegantno umotane.',
          slika: 'assets/placeholder_flower.png',
        },
        {
          naziv: 'Bijeli aranžman',
          cijena: 30,
          opis: 'Mirisni ljiljani i bijele ruže za posljednji pozdrav.',
          slika: 'assets/placeholder_flower.png',
        },
        {
          naziv: 'Vijenac u obliku srca',
          cijena: 55,
          opis: 'Emotivni aranžman u obliku srca od karanfila.',
          slika: 'assets/placeholder_flower.png',
        },
      ];
      await this.flowerRepo.save(items);
      console.log('✔️ Seed podaci ubačeni u bazu.');
    }
  }
  
}
