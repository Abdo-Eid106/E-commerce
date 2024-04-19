import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Item from 'src/order/entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    public repo: Repository<Item>,
  ) {}

  createItem(orderId: number, productId: number, quantity: number) {
    const item = this.repo.create({ orderId, productId, quantity });
    return this.repo.save(item);
  }
}
