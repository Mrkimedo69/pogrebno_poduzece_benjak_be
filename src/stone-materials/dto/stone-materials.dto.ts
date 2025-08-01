import { IsBoolean, IsHexColor, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateStoneMaterialDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  textureUrl?: string;

  @IsHexColor()
  colorHex: string;

  @IsNumber()
  pricePerM2: number;

  @IsBoolean()
  isAvailable: boolean;
}
