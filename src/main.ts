import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as expressLayouts from 'express-ejs-layouts';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(express.static(join(__dirname, '..', '..', 'public')));
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'));
  app.use(expressLayouts);

  await app.listen(3000);
}
bootstrap();
