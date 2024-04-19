import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CartModule } from 'src/cart/cart.module';
import { OrderModule } from 'src/order/order.module';
import { PaymentController } from './payment.controller';
import { CouponModule } from 'src/coupon/coupon.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CartModule, OrderModule, CouponModule, UserModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
