import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageQueryType } from 'src/typinng/global';
import { EntityManager, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly user: EntityTarget<User>) {
    super(user);
  }
  generateWhere(
    query: PageQueryType<User>,
    queryBuilder: SelectQueryBuilder<User>,
  ): void {
    const { name, id } = query;
    name && queryBuilder.where(`t.name like '%:name%'`, { name });
  }
}
