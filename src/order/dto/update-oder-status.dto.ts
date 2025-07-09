import { IsString, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsIn(['pending', 'processed', 'done'])
  status: 'pending' | 'processed' | 'done';
}
