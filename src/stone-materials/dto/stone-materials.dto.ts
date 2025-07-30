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
  pricePerM3: number;

  @IsBoolean()
  isAvailable: boolean;
}
