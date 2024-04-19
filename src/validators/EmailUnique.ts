import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';
import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';

@ValidatorConstraint({ name: 'email unique', async: true })
@Injectable()
export default class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(@Inject(UserService) private userService: UserService) {}
  async validate(
    value: any,
    args?: ValidationArguments | undefined,
  ): Promise<boolean> {
    const user = await this.userService.findByEmail(value);
    return user ? false : true;
  }

  defaultMessage(args?: ValidationArguments | undefined): string {
    return 'email is use';
  }
}
