import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdateBrandDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  photo: string;
}
