import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import Product from 'src/product/entities/product.entity';

@Entity()
export default class Categoury {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '/upload/OIP.jpeg' })
  photo: string;

  @OneToMany(() => Product, (product) => product.categoury)
  products: Product[]; 
}
