import {
  Length,
  IsNumberString,
  Min,
  Max,
  IsInt,
  IsDateString,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import CheckDate from '../validators/CheckData.validator';
import IsCodeUnique from '../validators/CodeUnique.validator';

export default class CreateCouponDto {
  @Length(8, 8)
  @IsNumberString()
  @Validate(IsCodeUnique)
  code: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(100)
  sale: number;

  @IsDateString()
  @Validate(CheckDate)
  endDate: Date;
}
