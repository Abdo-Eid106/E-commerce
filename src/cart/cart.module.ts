import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';
import { CartRepository } from './repositories/cart.repository';
import Cart from './entities/cart.entity';
import CartProduct from './entities/cartProduct.entity';
import Product from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartProduct, Product]),
    UserModule,
    OrderModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
