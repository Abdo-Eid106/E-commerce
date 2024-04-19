import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistRepository } from './repositories/wishlist.repository';
import Product from 'src/product/entities/product.entity';
@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Product)
    public productRepo: Repository<Product>,
    private readonly wishlistRepository: WishlistRepository,
  ) {}

  async getWishlist(userId: number) {
    const wishlist = await this.wishlistRepository.findOne({ userId });
    if (wishlist) return wishlist;
    return this.wishlistRepository.creatOne({ userId });
  }

  clearWishlist(userId: number) {
    return this.wishlistRepository.findOneAndDelete({ userId });
  }

  async getWishlistProducts(userId: number) {
    const wishlist = await this.getWishlist(userId);
    return this.wishlistRepository.getProducts(wishlist.id);
  }

  async getWishlistProductsCount(userId: number) {
    const wishlist = await this.getWishlist(userId);
    return this.wishlistRepository.getProductsCount(wishlist.id);
  }

  async updateWishlistProduct(productId: number, userId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product)
      throw new NotFoundException({
        errors: { message: 'there is no product with this id' },
      });
    const wishlist = await this.getWishlist(userId);
    return this.wishlistRepository.updateWishlistProduct(productId, wishlist.id);
  }
}
