import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CouponService } from '../coupon.service';

@ValidatorConstraint({ name: 'code exist', async: true })
@Injectable()
export default class IsCouponExist implements ValidatorConstraintInterface {
  constructor(private couponService: CouponService) {}
  async validate(
    value: any,
    args?: ValidationArguments | undefined,
  ): Promise<boolean> {
    const coupon = await this.couponService.findOne(value);
    return coupon ? true : false;
  }

  defaultMessage(args?: ValidationArguments | undefined): string {
    return 'Coupon does not exist';
  }
}
