import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CartModule } from 'src/cart/cart.module';
import { CouponRepository } from './repositories/coupon.repository';
import User from 'src/user/entities/user.entity';
import Coupon from './entities/coupon.entity';
import Cart from 'src/cart/entities/cart.entity';
import IsCodeUnique from './validators/CodeUnique.validator';
import IsCouponExist from './validators/CouponExist.validator';
import CheckDate from './validators/CheckData.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Coupon, Cart]),
    UserModule,
    CartModule,
  ],
  controllers: [CouponController],
  providers: [
    CouponService,
    IsCodeUnique,
    IsCouponExist,
    CheckDate,
    CouponRepository,
  ],
  exports: [CouponService, IsCouponExist],
})
export class CouponModule {}
