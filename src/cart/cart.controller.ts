import { Controller, Patch, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Patch('item')
  updateItemQuantity(@Req() req, @Body() body: { id: number; type: 'cvijet' | 'artikl'; quantity: number }) {
    return this.cartService.updateQuantity(req.user.id, body.id, body.type, body.quantity);
  }

  @Post('clear')
  clear(@Req() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Post('sync')
  async sync(@Req() req, @Body() body: { artikli: any[]; cvijece: any[] }) {
    return this.cartService.syncCart(req.user.id, body.artikli, body.cvijece);
  }

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.id);
  }
}