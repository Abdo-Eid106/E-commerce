import { Exclude } from 'class-transformer';
import {
  IsString,
  IsOptional,
  Validate,
  Length,
} from 'class-validator';
import ContainsLowerCase from 'src/validators/ContainsLower';
import ContainsUpperCase from 'src/validators/ContainsUpper';

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @Exclude()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @Validate(ContainsUpperCase)
  @Validate(ContainsLowerCase)
  @Length(8, 30)
  newpassword: string;

  @IsOptional()
  @IsString()
  passwordconfirm: string;
}
