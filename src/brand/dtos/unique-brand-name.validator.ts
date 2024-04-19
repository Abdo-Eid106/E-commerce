import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { BrandService } from '../brand.service';

@Injectable()
@ValidatorConstraint({ name: 'unique brandName', async: true })
export default class UniqueBrandName implements ValidatorConstraintInterface {
  constructor(private brandService: BrandService) {}

  async validate(
    value: any,
    args?: ValidationArguments,
  ): Promise<boolean> {
    const brand = await this.brandService.findByName(value);
    return brand ? false : true;
  }

  defaultMessage(args?: ValidationArguments): string {
    return 'name in use';
  }
}
