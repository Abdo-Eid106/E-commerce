import {
  ExceptionFilter,
  Catch,
  UnauthorizedException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export default class Redirect implements ExceptionFilter {
  constructor(private page: string) {}
  catch(exception: any, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    response.redirect(this.page);
  }
}
