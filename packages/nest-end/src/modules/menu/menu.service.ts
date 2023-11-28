import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { BaseService } from '../base/base.service';
import { Menu } from './entities/menu.entity';
import { PageQueryType } from 'src/typinng/global';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class MenuService extends BaseService<Menu> {
    generateWhere(query: PageQueryType<Menu>, qb: SelectQueryBuilder<Menu>): void {
        const { name, id } = query;
        name && qb.where(`t.name like '%:name%'`, { name });
    }
    constructor(
        @InjectEntityManager()
        manager: EntityManager,
    ) {
        super(manager, Menu);
    }
}
