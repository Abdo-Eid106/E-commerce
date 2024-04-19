import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { Request } from 'express';
import User from 'src/user/entities/user.entity';

@Injectable()
export class GetProductsCountInterceptor implements NestInterceptor {
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();

    //@ts-ignore
    const user: User = req.user;

    return next.handle().pipe(
      map(async (data) => {
        const cartProductsCount = await this.cartService.getCartProductCount(
          user.id,
        );
        data.cartProductsCount = cartProductsCount;
        const wishlistProductsCount =
          await this.wishlistService.getWishlistProductsCount(user.id);
        data.wishlistProductsCount = wishlistProductsCount;
        return data;
      }),
    );
  }
}

export function ProductsCount() {
  return UseInterceptors(GetProductsCountInterceptor);
}
