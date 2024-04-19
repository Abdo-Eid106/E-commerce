import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import Cart from 'src/cart/entities/cart.entity';
import Order from 'src/order/entities/order.entity';
import IsEmailUnique from 'src/validators/EmailUnique';
import User from './entities/user.entity';
import NewPasswordMiddleWare from './middlewares/newpassword.middleware';
import ContainsLowerCase from 'src/validators/ContainsLower';
import ContainsUpperCase from 'src/validators/ContainsUpper';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Order])],
  providers: [
    UserService,
    AuthService,
    IsEmailUnique,
    ContainsLowerCase,
    ContainsUpperCase,
    UserRepository,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NewPasswordMiddleWare)
      .forRoutes({ path: '/update-me', method: RequestMethod.POST });
  }
}
