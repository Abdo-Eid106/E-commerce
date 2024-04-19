import { Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import Cart from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
  ) {}

  createCart(userId: number) {
    return this.cartRepository.createOne(userId);
  }

  async getUserCart(userId: number) {
    const cart = await this.cartRepository.getUserCart(userId);
    if (cart) return cart;
    return this.cartRepository.createOne(userId);
  }

  async clearCart(userId: number) {
    return this.cartRepository.clearUserCart(userId);
  }

  async getCartProducts(userId: number) {
    return this.cartRepository.getProducts(userId);
  }

  async getCartProductCount(userId: number) {
    return this.cartRepository.getProductsCount(userId);
  }

  async findByIdAndUpdate(cartId: number, data: Partial<Cart>) {
    return this.cartRepository.findByIdAndUpdate(cartId, data);
  }
}
