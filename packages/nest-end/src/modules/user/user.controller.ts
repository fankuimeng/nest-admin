import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { BaseController } from '../base/base.controller';
import { AuthGuard } from '@nestjs/passport';
import { SessionModel } from 'src/typinng/global';

@Controller('user')
export class UserController extends BaseController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  // 初始化数据
  @Get('/init-data')
  async initData() {
    return await this.userService.initData();
  }

  @Get('current-user')
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@Session() session: SessionModel) {
    return this.userService.currentUser(session);
  }
}
