import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { Repository } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { InjectRepository } from '@nestjs/typeorm';
import CreateProduct from './dtos/create-product.dto';
import QueryDto from './dtos/query.dto';
import EditProductDto from './dtos/edit-product.dto';
import CartProduct from 'src/cart/entities/cartProduct.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    @InjectRepository(CartProduct)
    private readonly cartProductRepo: Repository<CartProduct>,
    private readonly cartService: CartService,
  ) {}

  async createProduct(data: CreateProduct) {
    return this.productRepository.createOne(data);
  }

  async editProduct(id: number, data: EditProductDto) {
    return this.productRepository.findByIdAndUpdate(id, data);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async getProducts(query: QueryDto) {
    return this.productRepository.findMany(query);
  }

  async getById(id: number) {
    return this.productRepository.findById(id);
  }

  async deleteById(id: number) {
    return this.productRepository.deleteById(id);
  }

  getLatest() {
    return this.productRepository.getLatest();
  }

  async addToCart(userId: number, productId: number) {
    const cart = await this.cartService.getUserCart(userId);
    const cartId = cart.id;
    let cartProduct = await this.cartProductRepo.findOne({
      where: { cartId, productId },
    });

    if (!cartProduct) {
      cartProduct = this.cartProductRepo.create({ cartId, productId });
      await this.cartProductRepo.save(cartProduct);
      return true;
    }
    return false;
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.cartService.getUserCart(userId);
    const cartId = cart.id;
    let cartProduct = await this.cartProductRepo.findOne({
      where: { cartId, productId },
    });

    if (!cartProduct) return;
    return this.cartProductRepo.remove(cartProduct);
  }

  async increaseCartProduct(userId: number, productId: number) {
    const cart = await this.cartService.getUserCart(userId);
    const cartProduct = await this.cartProductRepo.findOne({
      where: { cartId: cart.id, productId },
    });
    cartProduct.quantity += 1;
    return this.cartProductRepo.save(cartProduct);
  }

  async decreaseCartProduct(userId: number, productId: number) {
    const cart = await this.cartService.getUserCart(userId);
    const cartProduct = await this.cartProductRepo.findOne({
      where: { cartId: cart.id, productId },
    });
    if (cartProduct.quantity == 1) return cartProduct;

    cartProduct.quantity -= 1;
    return this.cartProductRepo.save(cartProduct);
  }
}
