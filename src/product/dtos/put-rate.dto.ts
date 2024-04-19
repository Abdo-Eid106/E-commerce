import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export default class PutRate {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rate: number;
}
