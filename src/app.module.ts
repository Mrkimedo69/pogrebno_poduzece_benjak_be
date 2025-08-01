import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FlowersModule } from './flowers/flowers.module';
import { ArtikliModule } from './artikli/artikli.module';
import { MonumentsModule } from './monuments/monuments.module';
import { StoneMaterialsModule } from './stone-materials/stone-materials.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { CartModule } from './cart/cart.module';

import { PogrebniArtikl } from './artikli/pogrebni-artikl.entity';
import { Flower } from './flowers/flower.entity';
import { User } from './users/user.entity';
import { CartItem } from './cart/cart-item.entity';
import { Monument } from './monuments/spomenici.entity';
import { StoneMaterial } from './stone-materials/stone-materials.entity';
import { OrdersModule } from './order/order.module';
import { FirebaseModule } from './firebase/firebase.module';
import { UploadController } from './firebase/firebase.controller';
import { MonumentRequestModule } from './monument-request/monument-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: required('DB_HOST', process.env.DB_HOST),
      port: parseInt(required('DB_PORT', process.env.DB_PORT), 10),
      username: required('DB_USERNAME', process.env.DB_USERNAME),
      password: required('DB_PASSWORD', process.env.DB_PASSWORD),
      database: required('DB_NAME', process.env.DB_NAME),
      entities: [
        PogrebniArtikl,
        Flower,
        User,
        Monument,
        StoneMaterial,
        CartItem
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),

    UsersModule,
    FlowersModule,
    ArtikliModule,
    MonumentsModule,
    StoneMaterialsModule,
    AuthModule,
    PaymentModule,
    CartModule,
    OrdersModule,
    FirebaseModule,
    MonumentRequestModule,
  ],
  controllers: [AppController,UploadController],
  providers: [AppService],
})
export class AppModule {}

function required(name: string, value?: string): string {
  if (!value) {
    throw new Error(`❌ Missing required ENV variable: ${name}`);
  }
  return value;
}
