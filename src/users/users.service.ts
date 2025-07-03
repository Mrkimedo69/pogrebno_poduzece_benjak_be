import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async create(data: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    if (!data.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = this.repo.create({
      ...data,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }
}
