import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Wishlist from './wishlist.entity';
import Product from '../../product/entities/product.entity';

@Entity()
export default class WishlistProduct {
  @PrimaryColumn()
  wishlistId: number;
  @ManyToOne(() => Wishlist, (wishlist) => wishlist.wishlistProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'wishlistId' })
  wishlist: Wishlist;

  @PrimaryColumn()
  productId: number;
  @ManyToOne(() => Product, (product) => product.wishlistProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
