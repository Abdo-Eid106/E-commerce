import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { CouponService } from 'src/coupon/coupon.service';
import { OrderService } from 'src/order/order.service';
import { ItemService } from 'src/order/item.service';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private readonly cartService: CartService,
    private readonly couponService: CouponService,
    private readonly orderService: OrderService,
    private readonly itemService: ItemService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async checkout(userId: number) {
    const cartProducts = await this.cartService.getCartProducts(userId);

    let price = 0;
    cartProducts.forEach(async (cartProduct) => {
      const { product, quantity } = cartProduct;
      price += product.price * quantity;
    });

    const coupon = await this.couponService.getAppliedCoupon(userId);
    const sale = coupon ? coupon.sale : 0;
    price = price - sale * price;

    const order = await this.orderService.createOrder(userId, price);
    cartProducts.forEach(async (cartProduct) => {
      const { product, quantity } = cartProduct;
      await this.itemService.createItem(order.id, product.id, quantity);
    });

    return this.cartService.clearCart(userId);
  }

  async createCheckOutSession(userId: number) {
    const cartProducts = await this.cartService.getCartProducts(userId);
    const items = cartProducts.map((cartProduct) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'events',
          },
          unit_amount: cartProduct.product.price * 100,
        },
        quantity: cartProduct.quantity,
      };
    });

    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: 'http://localhost:3000/me',
      cancel_url: 'http://localhost:3000/cart',
    });
  }
}
