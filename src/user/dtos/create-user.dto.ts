import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Validate,
  Length,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import ContainsLowerCase from 'src/validators/ContainsLower';
import ContainsUpperCase from 'src/validators/ContainsUpper';
import IsEmailUnique from 'src/validators/EmailUnique';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'not a valid email' })
  @Validate(IsEmailUnique)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Validate(ContainsLowerCase)
  @Validate(ContainsUpperCase)
  @Length(8, 30)
  password: string;

  @Exclude()
  admin: Boolean;
}
