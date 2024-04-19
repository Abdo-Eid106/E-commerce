import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';

export default class EditProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos: string[] = [];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  categouryId: number;

  @IsOptional()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  brandId: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(100)
  sale: number = 0;
}
