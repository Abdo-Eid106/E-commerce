import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CouponService } from '../coupon.service';

@ValidatorConstraint({ name: 'code unique', async: true })
@Injectable()
export default class IsCodeUnique implements ValidatorConstraintInterface {
  constructor(private couponService: CouponService) {}

  async validate(
    value: any,
    args?: ValidationArguments | undefined,
  ): Promise<boolean> {
    return this.couponService.isCodeUnique(value);
  }

  defaultMessage(args?: ValidationArguments | undefined): string {
    return 'code is use';
  }
}
