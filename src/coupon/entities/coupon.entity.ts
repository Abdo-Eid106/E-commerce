import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Cart from 'src/cart/entities/cart.entity';

@Entity()
export default class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  sale: number;

  @Column()
  endDate: Date;

  @OneToMany(() => Cart, (cart) => cart.coupon)
  carts: Cart[];
}
