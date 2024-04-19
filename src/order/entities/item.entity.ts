import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Column } from 'typeorm';
import Order from './order.entity';
import Product from 'src/product/entities/product.entity';

@Entity()
export default class Item {
  @PrimaryColumn()
  orderId: number;
  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @PrimaryColumn()
  productId: number;
  @ManyToOne(() => Product, (product) => product.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;
}
