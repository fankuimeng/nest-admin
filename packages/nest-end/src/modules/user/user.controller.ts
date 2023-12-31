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
import { AuthGuard } from '@nestjs/passport';
import { SessionModel } from 'src/typinng/global';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCurrentResponseVo } from './dto/response.vo';
import { generateBaseController } from '../base/base.controller';

const BaseController = generateBaseController(User);

@ApiTags('User-用户模块')
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

  @ApiOkResponse({ type: UserCurrentResponseVo })
  @ApiOperation({ summary: '获取当前用户' })
  @Get('current-user')
  @UseGuards(AuthGuard('jwt'))
  async currentUser(@Session() session: SessionModel) {
    return this.userService.currentUser(session);
  }
}
``;
