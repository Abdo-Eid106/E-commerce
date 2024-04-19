import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';
import { ItemService } from './item.service';
import { OrderController } from './order.controller';
import { UserModule } from 'src/user/user.module';
import Order from './entities/order.entity';
import Item from './entities/item.entity';
import User from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Item]), UserModule],
  providers: [OrderService, ItemService, OrderRepository],
  exports: [OrderService, ItemService],
  controllers: [OrderController],
})
export class OrderModule {}
