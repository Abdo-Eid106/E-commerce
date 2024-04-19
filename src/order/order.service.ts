import { Injectable } from '@nestjs/common';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly repo: OrderRepository) {}

  createOrder(userId: number, price: number) {
    return this.repo.createOne({ userId, price });
  }

  getOrders(userId: number) {
    return this.repo.findMany({ userId });
  }

  getOrder(userId: number, id: number) {
    return this.repo.findOne({ userId, id });
  }
}
