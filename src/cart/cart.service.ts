import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepo: Repository<CartItem>,
  ) {}

  async updateQuantity(userId: number, itemId: number, type: 'cvijet' | 'artikl', quantity: number) {
    const item = await this.cartRepo.findOne({ where: { userId, itemId, type } });
    if (!item) throw new Error('Artikl nije pronađen u košarici');
    item.quantity = quantity;
    return this.cartRepo.save(item);
  }

  async clearCart(userId: number) {
    return this.cartRepo.delete({ userId });
  }

  async getCart(userId: number) {
    return this.cartRepo.find({ where: { userId } });
  }

  async syncCart(userId: number, artikli: { id: number; quantity: number }[], cvijece: { id: number; quantity: number }[]) {
    const all = [
      ...artikli.map(a => ({ ...a, type: 'artikl' })),
      ...cvijece.map(f => ({ ...f, type: 'cvijet' }))
    ];
    if (!userId) throw new BadRequestException('Korisnik nije prijavljen');
    const toSave = all.map(i =>
      this.cartRepo.create({
        user: { id: userId },
        itemId: i.id,
        quantity: i.quantity,
        type: i.type as 'cvijet' | 'artikl'
      })
    );
  
    await this.cartRepo.upsert(toSave, ['userId', 'itemId', 'type']);
  }
  
}