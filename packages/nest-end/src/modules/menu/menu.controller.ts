import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { generateBaseController } from '../base/base.controller';
import { Menu } from './entities/menu.entity';
import { ApiTags } from '@nestjs/swagger';

const BaseController = generateBaseController(Menu);
@ApiTags('Menu-菜单模块')
@Controller('menu')
export class MenuController extends BaseController<Menu> {
    constructor(private readonly menuService: MenuService) {
        super(menuService);
    }

}
