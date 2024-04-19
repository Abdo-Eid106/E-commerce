import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CouponRepository } from './repositories/coupon.repository';
import { CartService } from 'src/cart/cart.service';
import CreateCouponDto from './dtos/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(
    private readonly cartService: CartService,
    private readonly repo: CouponRepository,
  ) {}

  createCoupon(data: CreateCouponDto) {
    return this.repo.createOne(data);
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  findOne(code: string = '') {
    return this.repo.findOne({ code });
  }

  async applyCoupon(userId: number, code: string) {
    const cart = await this.cartService.getUserCart(userId);
    const coupon = await this.findOne(code);
    if (!coupon) {
      throw new UnauthorizedException({
        status: 'fail',
        errors: { message: 'there is no coupon with this Id' },
      });
    }
  
    return await this.cartService.findByIdAndUpdate(cart.id, {
      couponId: coupon.id,
    });
  }

  async getAppliedCoupon(userId: number) {
    const cart = await this.cartService.getUserCart(userId);
    if (!cart.couponId) return null;
    return this.repo.findById(cart.couponId);
  }

  async isCodeUnique(code: string = '') {
    const coupon = await this.repo.findOne({ code });
    return coupon ? false : true;
  }
}
