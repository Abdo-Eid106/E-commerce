import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface InstanceType {
  new (...args: any[]);
}

class SerializeInterceptor implements NestInterceptor {
  constructor(public Dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(data => {
        return plainToClass(this.Dto, data);
      }),
    );
  }
}

export function serialize(Dto: InstanceType) {
  return UseInterceptors(new SerializeInterceptor(Dto));
}
