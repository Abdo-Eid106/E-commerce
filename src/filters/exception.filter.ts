import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(Error)
export default class RenderErrors implements ExceptionFilter {
  constructor(
    private templateName: string,
    private layout: string = 'layout',
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const req: Request = host.switchToHttp().getRequest();
    const res: Response = host.switchToHttp().getResponse();
    const errors = exception.response.errors;
    const data: any = { errors, layout: this.layout };
    Object.assign(data, req.body);

    res.render(this.templateName, data);
  }
}
