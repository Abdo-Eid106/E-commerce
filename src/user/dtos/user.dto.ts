import { Expose, Exclude } from 'class-transformer';

export default class UserDto {
  @Expose()
  id: string;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  admin: boolean;
}
