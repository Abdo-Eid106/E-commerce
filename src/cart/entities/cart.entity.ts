import User from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import CartProduct from './cartProduct.entity';
import Coupon from 'src/coupon/entities/coupon.entity';

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProduct: CartProduct;

  @Column({ nullable: true, default: null })
  couponId: number | null;
  @ManyToOne(() => Coupon, (coupon) => coupon.carts)
  @JoinColumn({ name: 'couponId' })
  coupon: Coupon;
}
