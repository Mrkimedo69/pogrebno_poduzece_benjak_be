import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new Error('Korisnik sa tim emailom već postoji.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = this.repo.create({
      email: data.email,
      password: hashedPassword,
      fullName: data.fullName,
      role: data.role || UserRole.USER,
    });

    const savedUser = await this.repo.save(user);

    const { password, ...safeUser } = savedUser;
    return safeUser;
  }
}
