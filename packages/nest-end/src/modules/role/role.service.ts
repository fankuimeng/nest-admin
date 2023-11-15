import {  Injectable } from '@nestjs/common';
import { PageQueryType } from 'src/typinng/global';
import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { BaseService } from '../base/base.service';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService extends BaseService<Role> {
  generateWhere(
    query: PageQueryType<Role>,
    queryBuilder: SelectQueryBuilder<Role>,
  ): void {
    const { name, id } = query;
    name && queryBuilder.where(`t.name like '%:name%'`, { name });
  }

  constructor(
    @InjectEntityManager()
    manager: EntityManager,
  ) {
    super(manager, Role);
  }
 
}
