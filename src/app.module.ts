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

// Entiteti
import { PogrebniArtikl } from './artikli/pogrebni-artikl.entity';
import { Flower } from './flowers/flower.entity';
import { User } from './users/user.entity';
import { CartItem } from './cart/cart-item.entity';
import { Monument } from './monuments/spomenici.entity';
import { StoneMaterial } from './stone-materials/stone-materials.entity';
import { OrdersModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pogrebno_benjak_db',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
