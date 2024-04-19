import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Cart from '../entities/cart.entity';
import CartProduct from '../entities/cartProduct.entity';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
  ) {}

  createOne(userId: number) {
    const cart = this.cartRepo.create({ userId });
    return this.cartRepo.save(cart);
  }

  findById(cartId: number) {
    return this.cartRepo.findOne({ where: { id: cartId } });
  }

  async clearUserCart(userId: number) {
    const cart = await this.getUserCart(userId);
    if (cart) return this.cartRepo.remove(cart);
  }

  async findByIdAndUpdate(cartId: number, data: Partial<Cart>) {
    let cart = await this.findById(cartId);
    if (cart) {
      cart = Object.assign(cart, data);
      return this.cartRepo.save(cart);
    }
  }

  async getUserCart(userId: number) {
    return this.cartRepo.findOne({ where: { userId } });
  }

  async getProducts(userId: number) {
    const cart = await this.getUserCart(userId);
    if (!cart) return [];
    return this.cartProductRepo.find({
      where: { cartId: cart.id },
      relations: { product: true },
    });
  }

  async getProductsCount(userId: number) {
    const cart = await this.getUserCart(userId);
    if (!cart) return 0;
    const cartProducts = await this.cartProductRepo.find({
      where: { cartId: cart.id },
    });
    return cartProducts.length;
  }
}
