import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { getUserDto } from './dtos/get-user.dto';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import User from './entities/user.entity';
import CreateUserDto from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    public userService: UserService,
    public jwtService: JwtService,
  ) {}

  async SignUp(user: CreateUserDto): Promise<User> {
    user.password = await hash(user.password, 12);
    return this.userService.createUser(user);
  }

  async Login(user: getUserDto): Promise<string> {
    const User = await this.userService.findByEmail(user.email);
    const exception = new UnauthorizedException({
      errors: {
        msg: 'the email or the password is not correct',
      },
    });

    if (!User || !(await compare(user.password, User.password)))
      throw exception;

    const payloud: { sub: number; username: string } = {
      sub: User.id,
      username: User.firstname,
    };
    return this.jwtService.signAsync(payloud);
  }
}
