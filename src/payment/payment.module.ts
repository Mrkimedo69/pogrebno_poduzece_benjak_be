import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ArtikliModule } from 'src/artikli/artikli.module';

@Module({
  imports: [ArtikliModule],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
