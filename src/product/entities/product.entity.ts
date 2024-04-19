import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Categoury from 'src/categoury/entities/categoury.entity';
import Rate from 'src/rate/entities/rate.entity';
import WishlistProduct from '../../wishlist/entities/wishlistProduct.entity';
import CartProduct from 'src/cart/entities/cartProduct.entity';
import Item from 'src/order/entities/item.entity';
import Brand from 'src/brand/entities/brand.entity';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'json' })
  photos: string[];

  @Column({ type: 'text' })
  description: string;

  @Column()
  price: number;

  @Column()
  categouryId: number;
  @ManyToOne(() => Categoury, (categoury) => categoury.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categouryId' })
  categoury: Categoury;

  @Column({ nullable: true, default: null })
  brandId: number | null;
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brandId' })
  brand: Brand | null;

  @OneToMany(() => Rate, (rate) => rate.product)
  rates: Rate[];

  @OneToMany(
    () => WishlistProduct,
    (wishlistProduct) => wishlistProduct.product,
  )
  wishlistProduct: WishlistProduct;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProduct: CartProduct;

  @OneToMany(() => Item, (item) => item.product)
  items: Item[];

  @Column({ default: 0 })
  sale: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
