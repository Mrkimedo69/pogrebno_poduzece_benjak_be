import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { MonumentRequestService } from './monument-request.service';
import { CreateMonumentRequestDto } from './dto/create-monument-request.dto';
import { MonumentRequest } from './monument-request.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('monument-request')
export class MonumentRequestController {
  constructor(
    private readonly monumentRequestService: MonumentRequestService,
  ) {}

    @Post()
    async create(
        @Body() dto: CreateMonumentRequestDto,
    ): Promise<MonumentRequest> {
        return this.monumentRequestService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('employee')
    @Get()
    async findAll(): Promise<MonumentRequest[]> {
        return this.monumentRequestService.findAll();
    }
}
