import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  isAlpha
} from 'class-validator';

@ValidatorConstraint({ name: 'containsUpper', async: false })
export default class ContainsUpperCase implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (!value) return false;
    for (let i = 0; i < value.length; i++)
      if (isAlpha(value[i]) && value[i] == value[i].toUpperCase()) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} should contains upperCase letters`;
  }
}
