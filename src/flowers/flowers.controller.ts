import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { Flower } from './flower.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}
  // @Get('secure')
  // getProtectedData(@Request() req) {
  //   return {
  //     message: 'Samo autentificirani korisnici mogu ovo vidjeti',
  //     user: req.user,
  //   };
  // }
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get()
  getAll(): Promise<Flower[]> {
    return this.flowersService.findAll();
  }

  @Post()
  create(@Body() flower: Partial<Flower>): Promise<Flower> {
    return this.flowersService.create(flower);
  }
  @Post('batch')
  getFlowersByIds(@Body() body: { ids: number[] }) {
    return this.flowersService.findByIds(body.ids);
}

}
