import { IsNumber, IsString, IsOptional, IsIn } from "class-validator";

export class OrderItemDto {
    @IsNumber()
    id: number;
  
    @IsString()
    name: string;
  
    @IsNumber()
    price: number;
  
    @IsNumber()
    quantity: number;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    imageUrl?: string;
  
    @IsOptional()
    @IsString()
    category?: string;
  
    @IsString()
    @IsIn(['artikl', 'flower'])
    type: 'artikl' | 'flower';
  }
  