import { IsString, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import UniqueBrandName from './unique-brand-name.validator';

export default class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @Validate(UniqueBrandName)
  name: string;

  @IsOptional()
  @IsString()
  photo: string;
}
