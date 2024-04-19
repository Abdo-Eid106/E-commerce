import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import Unique from '../validators/Cateogoury-unique.validator';

export default class CreateCategoury {
  @IsNotEmpty()
  @IsString()
  @Validate(Unique)
  name: string;

  @IsOptional()
  @IsString()
  photo: string;
}
