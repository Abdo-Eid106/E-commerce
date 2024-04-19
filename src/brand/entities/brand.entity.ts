import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Product from 'src/product/entities/product.entity';

@Entity()
export default class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null, nullable: true })
  photo: string | null;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
