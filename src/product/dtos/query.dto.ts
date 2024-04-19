import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsOptional, Validate } from 'class-validator';

export default class QueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  categoury?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  limit: number = 9;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  lowPrice: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  highPrice: number;

  @IsOptional()
  @IsString()
  popular?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  paginate: number = 1;
}
