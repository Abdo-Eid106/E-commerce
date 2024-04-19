import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';
import { RateService } from './rate.service';
import { Response } from 'express';
import User from 'src/user/entities/user.entity';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import PutRate from './dtos/put-rate.dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post(':productId')
  @UseGuards(IsLoggedIn)
  async putRate(
    @CurrentUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() body: PutRate,
    @Res() res: Response,
  ) {
    await this.rateService.putRate(user.id, productId, body.rate);
    res.redirect(`/products/${productId}`);
  }
}
