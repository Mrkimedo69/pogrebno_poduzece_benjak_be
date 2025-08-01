import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonumentRequest } from './monument-request.entity';
import { CreateMonumentRequestDto } from './dto/create-monument-request.dto';

@Injectable()
export class MonumentRequestService {
  constructor(
    @InjectRepository(MonumentRequest)
    private readonly monumentRequestRepo: Repository<MonumentRequest>,
  ) {}

  async create(dto: CreateMonumentRequestDto): Promise<MonumentRequest> {
    const request = this.monumentRequestRepo.create(dto);
    return await this.monumentRequestRepo.save(request);
  }

  async findAll(): Promise<MonumentRequest[]> {
    return await this.monumentRequestRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<MonumentRequest | null> {
    return this.monumentRequestRepo.findOneBy({ id });
  }
}
