import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from 'DB/data-source';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { CategouryModule } from './categoury/categoury.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';
import { BrandModule } from './brand/brand.module';
import { ViewsModule } from './views/views.module';
import { CouponModule } from './coupon/coupon.module';
import { PaymentModule } from './payment/payment.module';
import { RateModule } from './rate/rate.module';
import GetUser from './middlewares/getUser.middleware';
import GetPath from './middlewares/getPath.middleware';
import CustomeValidatonPipe from './pipes/cutomValidation.pipe';
import ChangeLayout from './middlewares/change-layout.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
      global: true,
    }),
    UserModule,
    ProductModule,
    CategouryModule,
    CartModule,
    WishlistModule,
    OrderModule,
    BrandModule,
    ViewsModule,
    CouponModule,
    PaymentModule,
    RateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: CustomeValidatonPipe,
    },
    GetUser,
    GetPath,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUser, GetPath).forRoutes('*');
    consumer
      .apply(ChangeLayout)
      .forRoutes(
        ...[
          '/admin/products',
          '/add-product',
          '/add-brand',
          'add-categoury',
          'add-coupon',
          '/edit-product/:id',
        ],
      );
  }
}
