import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '../../user/entities/user.entity';
import Product from 'src/product/entities/product.entity';

@Entity()
export default class Rate {
  @PrimaryColumn()
  userId: number;
  @ManyToOne(() => User, (user) => user.rates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  productId: number;
  @ManyToOne(() => Product, (product) => product.rates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('double')
  rate: number;
}
