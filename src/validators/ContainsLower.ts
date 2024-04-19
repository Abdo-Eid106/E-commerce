import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  isAlpha
} from 'class-validator';

@ValidatorConstraint({ name: 'containsLower', async: false })
export default class ContainsLowerCase implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (!value) return false;
    for (let i = 0; i < value.length; i++)
      if (isAlpha(value[i]) && value[i] == value[i].toLowerCase()) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} should contains lowerCase letters`;
  }
}
