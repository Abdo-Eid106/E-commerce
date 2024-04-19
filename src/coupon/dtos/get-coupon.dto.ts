import { IsNumberString, Validate } from "class-validator";
import IsCouponExist from "../validators/CouponExist.validator";

export default class getCouponDto {
  @IsNumberString()
  @Validate(IsCouponExist)
  code: string;
}