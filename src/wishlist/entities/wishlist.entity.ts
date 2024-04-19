import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';
import User from 'src/user/entities/user.entity';
import WishlistProduct from './wishlistProduct.entity';

@Entity()
export default class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;
  @OneToOne(() => User, (user) => user.wishlist, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    () => WishlistProduct,
    (wishlistProduct) => wishlistProduct.wishlist,
  )
  wishlistProduct: WishlistProduct;
}
