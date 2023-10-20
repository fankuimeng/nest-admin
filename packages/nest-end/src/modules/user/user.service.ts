import { Injectable } from '@nestjs/common';
import { PageQueryType } from 'src/typinng/global';
import {
  EntityManager,
  EntityTarget,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { User } from './entities/user.entity';
import { BaseService } from '../base/base.service';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
  ) {
    super(manager, User);
  }
  generateWhere(
    query: PageQueryType<User>,
    queryBuilder: SelectQueryBuilder<User>,
  ): void {
    const { name, id } = query;
    name && queryBuilder.where(`t.name like '%:name%'`, { name });
  }
}
