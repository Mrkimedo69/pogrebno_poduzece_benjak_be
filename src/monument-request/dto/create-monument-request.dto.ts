import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

class DesignPartDto {
  @IsString()
  naziv: string;

  @IsNumber()
  width: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  height1?: number;

  @IsOptional()
  @IsNumber()
  height2?: number;

  @IsString()
  boja: string;
}

export class CreateMonumentRequestDto {
  @IsString()
  userEmail: string;

  @IsString()
  userPhone: string;

  @IsString()
  userNote: string;

  @IsString()
  material: string;

  @IsOptional()
  @IsNumber()
  materialWidth?: number;

  @IsString()
  monumentShape: string;

  @IsString()
  graveType: string;

  @IsNumber()
  totalArea: number;

  @IsNumber()
  totalPrice: number;

  @IsArray()
  designParts: DesignPartDto[];

  @IsString()
  image2DBase64: string;
}
