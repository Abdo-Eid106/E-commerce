import { Controller, Post, Get, UseGuards, Redirect } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import User from 'src/user/entities/user.entity';

@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Post('/clear')
  @Redirect('/wishlist')
  @UseGuards(IsLoggedIn)
  async clearWishlist(@CurrentUser() user: User) {
    await this.wishlistService.clearWishlist(user.id);
  }

  @Get('count')
  @UseGuards(IsLoggedIn)
  async getWishlistProductsCount(@CurrentUser() user: User) {
    return this.wishlistService.getWishlistProductsCount(user.id);
  }
}
