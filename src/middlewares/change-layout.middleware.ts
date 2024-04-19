import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class ChangeLayout implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.locals.layout = 'admin/layout';
    next();
  }
}
