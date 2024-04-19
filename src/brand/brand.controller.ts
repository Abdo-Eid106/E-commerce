import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  UseFilters,
  Redirect,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { multerOptions } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResizeImagePipe } from 'src/pipes/resize-image.pipe';
import { Express } from 'express';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import IsAdmin from 'src/guards/isAdmin.guard';
import CreateBrandDto from './dtos/create-brand.dto';
import UpdateBrandDto from './dtos/update-brand.dto';
import RenderErrors from 'src/filters/exception.filter';

@Controller('brands')
export class BrandController {
  constructor(public brandService: BrandService) {}

  @Post()
  @UseGuards(IsLoggedIn, IsAdmin)
  @UseFilters(new RenderErrors('admin/add-brand', 'admin/layout'))
  @Redirect('/add-brand')
  @UseInterceptors(FileInterceptor('photo', multerOptions()))
  async createBrand(
    @UploadedFile(ResizeImagePipe) file: Express.Multer.File,
    @Body() body: CreateBrandDto,
  ) {
    if (file) body.photo = file.filename;
    await this.brandService.createBrand(body);
    return;
  }

  @Patch(':id')
  @UseGuards(IsLoggedIn, IsAdmin)
  @UseInterceptors(FileInterceptor('photo', multerOptions()))
  updateBrandDto(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBrandDto,
  ) {
    if (file) body.photo = file.filename;
    return this.brandService.updateBrand(id, body);
  }

  @Get(':id')
  @UseGuards(IsLoggedIn)
  getBrandById(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.getBrandById(id);
  }

  @Get()
  @UseGuards(IsLoggedIn)
  getBrands(@Query() query: any) {
    return this.brandService.findMany(query);
  }
}
