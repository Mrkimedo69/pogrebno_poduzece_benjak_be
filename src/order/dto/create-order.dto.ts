import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('HR')
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
  
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'totalPrice must be a number.' })
  @Type(() => Number)
  totalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
