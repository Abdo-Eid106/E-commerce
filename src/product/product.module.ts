import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CategouryModule } from 'src/categoury/categoury.module';
import { CartModule } from 'src/cart/cart.module';
import { WishlistModule } from 'src/wishlist/wishlist.module';
import { BrandModule } from 'src/brand/brand.module';
import { ProductRepository } from './repositories/product.repository';
import Product from './entities/product.entity';
import Item from 'src/order/entities/item.entity';
import CartProduct from 'src/cart/entities/cartProduct.entity';
import AddProductFilter from './filters/product.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, CartProduct, Item]),
    UserModule,
    CategouryModule,
    CartModule,
    WishlistModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, AddProductFilter, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
