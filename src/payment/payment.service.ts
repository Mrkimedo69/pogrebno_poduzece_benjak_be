import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(configService: ConfigService) {
    const stripeKey = configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY nije definiran u .env');
    }
    
    this.stripe = new Stripe(stripeKey);
  }

  async createCheckoutSession(items: any[]) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: 'http://localhost:4200/uspjeh',
      cancel_url: 'http://localhost:4200/kosarica',
    });

    return { url: session.url };
  }
}
