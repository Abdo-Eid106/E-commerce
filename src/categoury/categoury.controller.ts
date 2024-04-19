import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Redirect,
  UseFilters,
} from '@nestjs/common';
import { CategouryService } from './categoury.service';
import { multerOptions } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResizeImagePipe } from 'src/pipes/resize-image.pipe';
import CreateCategoury from './dtos/create-categoury.dto';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import IsAdmin from 'src/guards/isAdmin.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import User from 'src/user/entities/user.entity';
import RenderErrors from 'src/filters/exception.filter';

@Controller('categouries')
export class CategouryController {
  constructor(public categouryService: CategouryService) {}

  @Post()
  @UseGuards(IsLoggedIn, IsAdmin)
  @UseInterceptors(
    FileInterceptor('photo', multerOptions()),
  )
  @Redirect('/add-categoury')
  @UseFilters(new RenderErrors('admin/add-categoury', 'admin/layout'))
  createCategoury(
    @Body() data: CreateCategoury,
    @UploadedFile(ResizeImagePipe) file: Express.Multer.File,
  ) {
    if (file) data.photo = file.filename;
    return this.categouryService.create(data);
  }

  @Delete(':name')
  @UseGuards(IsLoggedIn, IsAdmin)
  deleteCategoury(@Param('name') name: string) {
    return this.categouryService.deleteByName(name);
  }

  @Get('/popular')
  @UseGuards(IsLoggedIn)
  getPopular(@CurrentUser() user: User) {
    return this.categouryService.getPopular();
  }
}
