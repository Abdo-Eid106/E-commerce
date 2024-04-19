import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  Redirect,
  UseFilters,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import User from 'src/user/entities/user.entity';
import CreateCouponDto from './dtos/create-coupon.dto';
import getCouponDto from './dtos/get-coupon.dto';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import IsAdmin from 'src/guards/isAdmin.guard';
import RenderErrors from 'src/filters/exception.filter';
import CurrentUser from 'src/decorators/current-user.decorator';

@Controller('coupons')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post()
  @UseGuards(IsLoggedIn, IsAdmin)
  @Redirect('/add-coupon')
  @UseFilters(new RenderErrors('admin/add-coupon', 'admin/layout'))
  createCoupon(@Body() data: CreateCouponDto) {
    return this.couponService.createCoupon(data);
  }

  @Post('apply')
  @UseGuards(IsLoggedIn)
  applyCoupon(@CurrentUser() user: User, @Body() data: getCouponDto) {
    return this.couponService.applyCoupon(user.id, data.code);
  }

  @Get('applied')
  @UseGuards(IsLoggedIn)
  getAppliedCoupon(@CurrentUser() user: User) {
    return this.couponService.getAppliedCoupon(user.id);
  }
}
