import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class NewPasswordMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (body.newpassword == '') delete body.newpassword;
    if (body.passwordconfirm == '') delete body.passwordconfirm;
    next();
  }
}
