import { IsString, IsNotEmpty } from 'class-validator';

export class getUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
