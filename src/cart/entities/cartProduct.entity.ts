import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Column } from 'typeorm';
import Cart from './cart.entity';
import Product from 'src/product/entities/product.entity';

@Entity()
export default class CartProduct {
  @PrimaryColumn()
  cartId: number;
  @ManyToOne(() => Cart, (cart) => cart.cartProduct, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @PrimaryColumn()
  productId: number;
  @ManyToOne(() => Product, (product) => product.cartProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}
