import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { BaseController } from '../base/base.controller';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    // super(userService);
  }
}
