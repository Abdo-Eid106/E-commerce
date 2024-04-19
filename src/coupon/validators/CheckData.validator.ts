import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'check endDate', async: false })
export default class CheckDate implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    return new Date(value) > new Date(Date.now());
  }

  defaultMessage(args?: ValidationArguments): string {
    return 'endDate must be greater than now';
  }
}
