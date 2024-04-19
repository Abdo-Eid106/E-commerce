import User from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';
import Item from './item.entity';
import * as moment from 'moment';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  userId: number;
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @Column()
  price: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  formatedCreatedAt: string;

  @AfterLoad()
  setFormatedCreatedAt() {
    this.formatedCreatedAt = moment(this.createdAt).format(
      'D MMM YYYY, hh:m a',
    );
  }

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
