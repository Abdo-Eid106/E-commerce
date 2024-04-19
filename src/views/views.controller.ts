import {
  Controller,
  Render,
  Get,
  UseGuards,
  UseFilters,
  Query,
  Param,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { CategouryService } from 'src/categoury/categoury.service';
import { BrandService } from 'src/brand/brand.service';
import { CouponService } from 'src/coupon/coupon.service';
import { ProductService } from 'src/product/product.service';
import { RateService } from 'src/rate/rate.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { CartService } from 'src/cart/cart.service';
import { OrderService } from 'src/order/order.service';
import { ProductsCount } from 'src/views/interceptors/get-products-count.interceptor';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import Redirect from 'src/filters/redirect.filter';
import QueryDto from 'src/product/dtos/query.dto';
import CurrentUser from 'src/decorators/current-user.decorator';
import User from 'src/user/entities/user.entity';
import IsAdmin from 'src/guards/isAdmin.guard';

@Controller('')
export class ViewsController {
  constructor(
    private categouryService: CategouryService,
    private brandService: BrandService,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private orderService: OrderService,
    private couponService: CouponService,
    private rateService: RateService,
  ) {}

  @Get('login')
  @Render('login')
  login() {}

  @Get('signup')
  @Render('signup')
  signUp() {}

  @Get()
  @Render('index')
  @UseFilters(new Redirect('/login'))
  @ProductsCount()
  @UseGuards(IsLoggedIn)
  async getIndex() {
    const latestProducts = await this.productService.getLatest();
    const emptyQuery: QueryDto = plainToClass(QueryDto, {});
    const popularProducts = await this.productService.getProducts(emptyQuery);

    const popularCategouries = await this.categouryService.getPopular();
    const brands = await this.brandService.findAll();
    return { latestProducts, popularProducts, popularCategouries, brands };
  }

  @Get('/shop')
  @Render('shop')
  @UseGuards(IsLoggedIn)
  @ProductsCount()
  async getShop(@Query() query: QueryDto, @CurrentUser() user: User) {
    query.paginate = 1;
    const q: QueryDto = { ...query };
    q.paginate = 0;
    const allProducts = await this.productService.getProducts(q);

    let limit = 9;
    if (query.limit) limit = query.limit;
    const pages = Math.ceil(allProducts.length / limit);

    if (!query.page) query.page = 1;
    if (query.page > pages) query.page = pages;
    query.page = Math.max(query.page, 1);

    const products = await this.productService.getProducts(query);
    const categouries = await this.categouryService.findAll();

    function getQuery(obj: Object) {
      let q = { ...query };
      Object.assign(q, obj);

      let attrs = [];
      for (let [key, val] of Object.entries(q)) attrs.push(`${key}=${val}`);
      return attrs.join('&');
    }

    const cartProducts = await this.cartService.getCartProducts(user.id);
    const cartProductsIds = new Set();
    for (let cartProduct of cartProducts)
      cartProductsIds.add(cartProduct.productId);

    const wishlistProducts = await this.wishlistService.getWishlistProducts(
      user.id,
    );
    const wishlistProductsIds = new Set();
    for (let wishlistProduct of wishlistProducts)
      wishlistProductsIds.add(wishlistProduct.productId);

    return {
      categouries,
      products,
      page: query.page,
      pages,
      getQuery,
      count: allProducts.length,
      cartProductsIds,
      wishlistProductsIds,
      query,
    };
  }

  @Get('/admin/products')
  @ProductsCount()
  @Render('shop')
  @UseGuards(IsLoggedIn, IsAdmin)
  async getAdminProducts(@Query() query: QueryDto) {
    query.paginate = 1;
    const q: QueryDto = { ...query };
    q.paginate = 0;
    const allProducts = await this.productService.getProducts(q);

    let limit = 9;
    if (query.limit) limit = query.limit;
    const pages = Math.ceil(allProducts.length / limit);

    if (!query.page) query.page = 1;
    if (query.page > pages) query.page = pages;
    query.page = Math.max(query.page, 1);

    const products = await this.productService.getProducts(query);
    const categouries = await this.categouryService.findAll();

    function getQuery(obj: Object) {
      let q = { ...query };
      Object.assign(q, obj);

      let attrs = [];
      for (let [key, val] of Object.entries(q)) attrs.push(`${key}=${val}`);
      return attrs.join('&');
    }

    return {
      categouries,
      products,
      page: query.page,
      pages,
      getQuery,
      count: allProducts.length,
      query,
    };
  }

  @Get('/me')
  @ProductsCount()
  @Render('account')
  @UseGuards(IsLoggedIn)
  async getAccountDetails(@CurrentUser() user: User) {
    const orders = await this.orderService.getOrders(user.id);
    return { user, orders };
  }

  @Get('/products/:id')
  @ProductsCount()
  @Render('product')
  @UseGuards(IsLoggedIn)
  async getProduct(
    @Param('id', ParseIntPipe) productId: number,
    @CurrentUser() user: User,
    @Res() res: Response,
  ) {
    const product = await this.productService.getById(productId);
    if (!product) return res.redirect('/');

    const myRate = await this.rateService.getRate(user.id, productId);
    const cartProducts = await this.cartService.getCartProducts(user.id);
    const wishlistProducts = await this.wishlistService.getWishlistProducts(
      user.id,
    );

    let inCart = false;
    for (let cartProduct of cartProducts)
      if (cartProduct.productId == productId) {
        inCart = true;
        break;
      }

    let inWishlist = false;
    for (let wishlistProduct of wishlistProducts)
      if (wishlistProduct.productId == productId) {
        inWishlist = true;
        break;
      }

    const query = plainToClass(QueryDto, {
      categoury: product.categouryId,
      limit: 3,
    });
    const relatedProducts = await this.productService.getProducts(query);

    return {
      product,
      myRate,
      inCart,
      inWishlist,
      relatedProducts,
    };
  }

  @Get('/cart')
  @ProductsCount()
  @Render('cart')
  @UseGuards(IsLoggedIn)
  async getCart(@CurrentUser() user: User) {
    const userId = user.id;
    const cartProducts = await this.cartService.getCartProducts(userId);
    let total = 0;
    cartProducts.forEach((cartProduct) => {
      total += cartProduct.quantity * cartProduct.product.price;
    });
    const coupon = await this.couponService.getAppliedCoupon(user.id);
    return { cartProducts, total, coupon };
  }

  @Get('/wishlist')
  @ProductsCount()
  @Render('wishlist')
  @UseGuards(IsLoggedIn)
  async getWishlist(@CurrentUser() user: User) {
    const wishlistProducts = await this.wishlistService.getWishlistProducts(
      user.id,
    );
    return { wishlistProducts };
  }

  @Get('add-product')
  @UseGuards(IsLoggedIn, IsAdmin)
  @Render('admin/add-product')
  async getAddProduct() {
    const categouries = await this.categouryService.findAll();
    const brands = await this.brandService.findAll();
    return { categouries, brands };
  }

  @Get('/edit-product/:id')
  @Render('admin/edit-product')
  @UseGuards(IsLoggedIn, IsAdmin)
  async getEditProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getById(id);
    const categouries = await this.categouryService.findAll();
    const brands = await this.brandService.findAll();
    return { product, categouries, brands };
  }

  @Get('/add-brand')
  @UseGuards(IsLoggedIn, IsAdmin)
  @Render('admin/add-brand')
  getAddBrand() {}

  @Get('/add-categoury')
  @UseGuards(IsLoggedIn, IsAdmin)
  @Render('admin/add-categoury')
  getAddCategoury() {}

  @Get('/add-coupon')
  @UseGuards(IsLoggedIn, IsAdmin)
  @Render('admin/add-coupon')
  getAddCoupon() {}
}
