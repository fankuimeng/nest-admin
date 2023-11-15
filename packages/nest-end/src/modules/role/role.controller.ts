import { Controller, Get, Module, Query } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginResponseVo } from '../auth/dto/response.vo';
import { generateBaseController } from '../base/base.controller';
import { BaseQueryDto } from '../base/dto/request.dto';
import { InstanceEntities, PageResModel } from 'src/typinng/global';

const BaseController = generateBaseController(Role);

@ApiTags('Role-角色模块')
@Controller('role')
export class RoleController extends BaseController<Role> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
