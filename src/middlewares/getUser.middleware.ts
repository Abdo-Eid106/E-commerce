import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export default class GetUser implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token: any = this.extractToken(req) || req.cookies.access_token;
    if (!token) {
      res.locals.user = null;
      return next();
    }

    try {
      const payloud: { sub: number; username: string } =
        await this.jwtService.verifyAsync(token);
      const user = await this.userService.findById(payloud.sub);
      if (!user) {
        res.locals.user = null;
        return next();
      }
      //@ts-ignore
      req.user = user;
      res.locals.user = user;
      next();
    } catch (err) {
      res.locals.user = null;
      return next();
    }
  }

  extractToken(req: Request): string | null {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : null;
  }
}
