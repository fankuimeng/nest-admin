import { Injectable } from '@nestjs/common';
import { PageQueryType } from 'src/typinng/global';
import { EntityTarget, SelectQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }
  generateWhere(
    query: PageQueryType<User>,
    queryBuilder: SelectQueryBuilder<User>,
  ): void {
    const { name, id } = query;
    name && queryBuilder.where(`t.name like '%:name%'`, { name });
  }
}
