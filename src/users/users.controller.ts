import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() userData: Partial<Users>): Promise<Users> {
    return this.usersService.create(userData);
  }
}
