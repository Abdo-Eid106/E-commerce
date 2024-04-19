import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';

@ValidatorConstraint({ name: 'unique', async: true })
export default class IsUnique implements ValidatorConstraintInterface {
  constructor(private repo: Repository<any>) {}
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const field = args.property;
    const doc = await this.repo.findOne({ where: { [field]: value } });
    return doc ? false : true;
  }
  
  defaultMessage(args?: ValidationArguments): string {
    const field = args.property;
    return `${field} in use`;
  }
}
