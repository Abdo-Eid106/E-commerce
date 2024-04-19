import { Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import User from 'src/user/entities/user.entity';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  @UseGuards(IsLoggedIn)
  checkout(@CurrentUser() user: User) {
    return this.paymentService.checkout(user.id);
  }

  @Post('checkout-session')
  @UseGuards(IsLoggedIn)
  createCheckoutSession(@CurrentUser() user: User) {
    return this.paymentService.createCheckOutSession(user.id);
  }
}
