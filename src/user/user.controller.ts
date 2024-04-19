import {
  Post,
  Body,
  Get,
  Query,
  Controller,
  UseGuards,
  UseFilters,
  Res,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { getUserDto } from './dtos/get-user.dto';
import { Response } from 'express';
import UserDto from './dtos/user.dto';
import IsLoggedIn from 'src/guards/isLoggedIn.guard';
import CurrentUser from 'src/decorators/current-user.decorator';
import User from './entities/user.entity';
import UpdateUserDto from './dtos/update-user.dto';
import RenderErrors from 'src/filters/exception.filter';
import CreateUserDto from './dtos/create-user.dto';

@Controller()
export class UserController {
  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) {}

  @Post('signup')
  @UseFilters(new RenderErrors('signup'))
  @Redirect('/login')
  async signUp(@Body() user: CreateUserDto) {
    this.authService.SignUp(user);
  }

  @Post('login')
  @Redirect('/')
  @UseFilters(new RenderErrors('login'))
  async Login(@Body() user: getUserDto, @Res() res: Response) {
    const access_token = await this.authService.Login(user);
    res.cookie('access_token', access_token);
  }

  @Get('/logout')
  @Redirect('/login')
  logOut(@Res() res: Response) {
    res.cookie('access_token', '', { maxAge: 1 });
  }

  @Get('users')
  find(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post('update-me')
  @UseGuards(IsLoggedIn)
  @serialize(UserDto)
  @UseFilters(new RenderErrors('account'))
  @Redirect('/me')
  async updateMe(@CurrentUser() user: User, @Body() body: UpdateUserDto) {
    await this.userService.updateUser(user.id, body);
  }
}
