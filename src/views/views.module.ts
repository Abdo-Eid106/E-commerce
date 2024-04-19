import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { UserModule } from 'src/user/user.module';
import { CategouryModule } from 'src/categoury/categoury.module';
import { BrandModule } from 'src/brand/brand.module';
import { ProductModule } from 'src/product/product.module';
import { CartModule } from 'src/cart/cart.module';
import { WishlistModule } from 'src/wishlist/wishlist.module';
import { OrderModule } from 'src/order/order.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { RateModule } from 'src/rate/rate.module';
import { GetProductsCountInterceptor } from 'src/views/interceptors/get-products-count.interceptor';

@Module({
  controllers: [ViewsController],
  imports: [
    UserModule,
    CategouryModule,
    BrandModule,
    ProductModule,
    CartModule,
    WishlistModule,
    OrderModule,
    CouponModule,
    RateModule,
  ],
  providers: [GetProductsCountInterceptor],
})
export class ViewsModule {}
