import {
  Controller,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import CurrentUser from 'src/decorators/current-user.decorator';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import User from 'src/user/entities/user.entity';

@Controller('orders')
export class OrderController {
  constructor(public orderService: OrderService) {}

  @Get()
  @UseGuards(IsLoggedIn)
  getOrders(@CurrentUser() user: User) {
    return this.orderService.getOrders(user.id);
  }

  @Get(':id')
  @UseGuards(IsLoggedIn)
  getOrder(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrder(user.id, id);
  }
}
