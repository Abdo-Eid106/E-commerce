import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Wishlist from '../entities/wishlist.entity';
import WishlistProduct from '../entities/wishlistProduct.entity';

@Injectable()
export class WishlistRepository {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepo: Repository<Wishlist>,
    @InjectRepository(WishlistProduct)
    private readonly wishlistProductRepo: Repository<WishlistProduct>,
  ) {}

  creatOne(data: Partial<Wishlist>) {
    const user = this.wishlistRepo.create(data);
    return this.wishlistRepo.save(user);
  }

  findOne(data: Partial<Wishlist>) {
    return this.wishlistRepo.findOne({ where: new Object(data) });
  }

  findById(id: number) {
    return this.wishlistRepo.findOne({ where: { id } });
  }

  async findByIdAndUpdate(id: number, data: Partial<Wishlist>) {
    let user = await this.findById(id);
    user = Object.assign(user, data);
    return this.wishlistRepo.save(user);
  }

  async findOneAndDelete(data: Partial<Wishlist>) {
    const wishlist = await this.findOne(data);
    if (wishlist) return this.wishlistRepo.remove(wishlist);
  }

  async getProducts(wishlistId: number) {
    return this.wishlistProductRepo.find({
      where: { wishlistId },
      relations: ['product'],
    });
  }

  async getProductsCount(wishlistId: number) {
    const qb = this.wishlistProductRepo
      .createQueryBuilder('wishlistProduct')
      .where('wishlistProduct.wishlistId', { wishlistId })
      .select('COUNT(wishlistProduct.wishlistId)', 'count');
    return parseInt((await qb.getRawOne()).count);
  }

  async updateWishlistProduct(productId: number, wishlistId: number) {
    let wishlistProduct = await this.wishlistProductRepo.findOne({
      where: {
        wishlistId,
        productId,
      },
    });

    if (!wishlistProduct) {
      wishlistProduct = this.wishlistProductRepo.create({
        wishlistId,
        productId,
      });
      this.wishlistProductRepo.save(wishlistProduct);
      return true;
    }
    await this.wishlistProductRepo.remove(wishlistProduct);
    return false;
  }
}
