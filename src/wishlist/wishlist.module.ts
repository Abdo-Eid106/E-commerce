import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistRepository } from './repositories/wishlist.repository';
import { WishlistService } from './wishlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import Wishlist from './entities/wishlist.entity';
import WishlistProduct from './entities/wishlistProduct.entity';
import Product from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, WishlistProduct, Product]),
    UserModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService, WishlistRepository],
  exports: [WishlistService],
})
export class WishlistModule {}
