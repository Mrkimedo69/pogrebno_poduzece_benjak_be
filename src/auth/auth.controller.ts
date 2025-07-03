import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() data: { email: string, password: string, fullName: string }) {
    return this.usersService.create(data);
  }

  @Post('login')
  async login(@Body() data: { email: string, password: string }) {
    const user = await this.authService.validateUser(data.email, data.password);
    return this.authService.login(user);
  }
}
