import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ArtikliService } from 'src/artikli/artikli.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService, 
    private readonly artikliService: ArtikliService
  ) {}

  @Post('create-checkout-session')
  create(@Body() body: { items: any[] }) {
    return this.paymentService.createCheckoutSession(body.items);
  }
  @Post('batch')
  getByIds(@Body() body: { ids: number[] }) {
    return this.artikliService.findByIds(body.ids);
  }
}

