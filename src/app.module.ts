import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FlowersModule } from './flowers/flowers.module';

@Module({
  imports: [
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'pogrebno_benjak_db',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    FlowersModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
