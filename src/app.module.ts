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
import { PogrebniArtikl } from './artikli/pogrebni-artikl.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pogrebno_benjak_db',
      entities:[PogrebniArtikl,FlowersModule,UsersModule,MonumentsModule,StoneMaterialsModule],
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, 
    FlowersModule,
    ArtikliModule,
    MonumentsModule,
    StoneMaterialsModule,
    TypeOrmModule.forFeature([PogrebniArtikl,FlowersModule,UsersModule,MonumentsModule,StoneMaterialsModule]),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
