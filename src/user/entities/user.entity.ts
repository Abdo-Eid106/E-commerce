import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import Rate from 'src/rate/entities/rate.entity';
import Wishlist from 'src/wishlist/entities/wishlist.entity';
import Cart from 'src/cart/entities/cart.entity';
import Order from 'src/order/entities/order.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
  
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: Boolean;

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: number[];

  @OneToOne(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
