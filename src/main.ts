import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UserRole } from './users/user.entity';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const usersService = app.get(UsersService);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
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
  const employeeEmail = 'zaposlenik@firma.hr';
  const existingEmployee = await usersService.findByEmail(employeeEmail);

  if (!existingEmployee) {
    await usersService.create({
      email: employeeEmail,
      password: 'zaposlenik12345',
      fullName: 'Employee',
      role: UserRole.EMPLOYEE,
    });
    console.log(`✔ Employee korisnik stvoren (${employeeEmail})`);
  }
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

