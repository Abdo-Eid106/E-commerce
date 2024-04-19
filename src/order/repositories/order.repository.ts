import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Order from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  createOne(data: Partial<Order>) {
    const order = this.repo.create(data);
    return this.repo.save(order);
  }

  findOne(data: Partial<Order>) {
    return this.repo.findOne({
      where: new Object(data),
      relations: { items: true },
    });
  }

  findMany(data: Partial<Order>) {
    return this.repo.find({
      where: new Object(data),
      relations: { items: true },
    });
  }
}
