import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategouryService } from '../categoury.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export default class Unique implements ValidatorConstraintInterface {
  constructor(public categouryService: CategouryService) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const categoury = await this.categouryService.findByName(value);
    return categoury ? false : true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'already exists';
  }
}
