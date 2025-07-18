import { IsNumber, IsString, IsOptional, IsIn, IsDecimal } from "class-validator";

export class OrderItemDto {
    @IsNumber()
    id: number;
  
    @IsString()
    name: string;
  
    @IsDecimal()
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
    @IsIn(['artikl', 'cvijet'])
    type: 'artikl' | 'cvijet';
  }
  