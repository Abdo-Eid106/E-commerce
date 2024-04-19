import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export default class IsLoggedIn implements CanActivate {
  constructor(
    public jwtService: JwtService,
    public userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user)
      throw new UnauthorizedException({
        errors: { msg: 'you are not logged in!' },
      });
    return true;
  }
}
