import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFiles,
  Redirect,
  ParseIntPipe,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CartService } from 'src/cart/cart.service';
import { WishlistService } from 'src/wishlist/wishlist.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { ResizeImagesPipe } from 'src/pipes/resize-images.pipe';
import { Response } from 'express';
import CreateProduct from './dtos/create-product.dto';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import IsAdmin from 'src/guards/isAdmin.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import User from 'src/user/entities/user.entity';
import ProductFilter from './filters/product.filter';
import EditProductDto from './dtos/edit-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    public productService: ProductService,
    public cartService: CartService,
    public wishlistService: WishlistService,
  ) {}

  @Post()
  @UseGuards(IsLoggedIn, IsAdmin)
  @UseInterceptors(FilesInterceptor('photos', 5, multerOptions()))
  @Redirect('/admin/products')
  @UseFilters(ProductFilter)
  AddProduct(
    @UploadedFiles(ResizeImagesPipe) files: Express.Multer.File[],
    @Body() data: CreateProduct,
  ) {
    data.photos = files.map((file) => file.filename);
    return this.productService.createProduct(data);
  }

  @Post('/:id/edit')
  @UseInterceptors(FilesInterceptor('photos', 5, multerOptions()))
  @UseGuards(IsLoggedIn, IsAdmin)
  @UseFilters(ProductFilter)
  async editProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditProductDto,
    @Res() res: Response,
  ) {
    if (files.length)
      data.photos = files.map((file) => '/upload/' + file.filename);
    await this.productService.editProduct(id, data);
    res.redirect(`/edit-product/${id}`);
  }

  @Post(':id/delete')
  @UseGuards(IsLoggedIn, IsAdmin)
  @Redirect('/admin/products')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteById(id);
  }

  @Post(':id/wishlist')
  @Redirect('/wishlist')
  @UseGuards(IsLoggedIn)
  updateWishlist(
    @Param('id', ParseIntPipe) productId: number,
    @CurrentUser() user: User,
  ) {
    return this.wishlistService.updateWishlistProduct(productId, user.id);
  }

  @Post(':id/cart')
  @UseGuards(IsLoggedIn)
  addToCart(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.addToCart(user.id, productId);
  }

  @Post(':id/cart/increase')
  @UseGuards(IsLoggedIn)
  increaseCartProduct(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.increaseCartProduct(user.id, productId);
  }

  @Post(':id/cart/decrease')
  @UseGuards(IsLoggedIn)
  decreaseCartProduct(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productService.decreaseCartProduct(user.id, productId);
  }

  @Post(':id/cart/delete')
  @UseGuards(IsLoggedIn)
  @Redirect('/cart')
  async removeFromCart(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) productId: number,
  ) {
    await this.productService.removeFromCart(user.id, productId);
  }
}
