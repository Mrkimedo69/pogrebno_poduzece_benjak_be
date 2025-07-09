import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from './users/user.entity';
import { async } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const adminEmail = 'admin@site.com';
  const existingAdmin = await usersService.findByEmail(adminEmail);

  if (!existingAdmin) {
    await usersService.create({
      email: adminEmail,
      password: 'admin12345',
      fullName: 'Super Admin',
      role: UserRole.ADMIN,
    });
    console.log(`✔ Admin korisnik stvoren (${adminEmail})`);
  }
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

