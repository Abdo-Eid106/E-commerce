import {
  Controller,
  Post,
  Redirect,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import CurrentUser from 'src/decorators/current-user.decorator';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import User from 'src/user/entities/user.entity';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('clear')
  @Redirect('/cart')
  @UseGuards(IsLoggedIn)
  clearCart(@CurrentUser() user: User) {
    return this.cartService.clearCart(user.id);
  }

  @Get('count')
  @UseGuards(IsLoggedIn)
  getCount(@CurrentUser() user: User) {
    return this.cartService.getCartProductCount(user.id);
  }
}
