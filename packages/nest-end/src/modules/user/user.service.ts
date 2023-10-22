import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PageQueryType } from 'src/typinng/global';
import { EntityManager, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseService } from '../base/base.service';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '../redis/redis.service';
import { HttpError } from 'src/common/exception';
import { md5, responseMessage } from 'src/utils';
import { Role } from './entities/role.entity';
import { Permission } from './entities/rermission.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
  ) {
    super(manager, User);
  }

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @Inject(RedisService)
  private redisService: RedisService;

  generateWhere(
    query: PageQueryType<User>,
    queryBuilder: SelectQueryBuilder<User>,
  ): void {
    const { name, id } = query;
    name && queryBuilder.where(`t.name like '%:name%'`, { name });
  }

  async initData() {
    const user1 = new User();
    user1.name = 'admin';
    user1.password = md5('111111');
    user1.email = 'xxx@xx.com';
    user1.isAdmin = 1;
    user1.nickname = 'admin';

    const user2 = new User();
    user2.name = 'lisi';
    user2.password = md5('222222');
    user2.email = 'yy@yy.com';
    user2.nickname = '李四';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1];
    user2.roles = [role2];
    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];
    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.repository.save([user1, user2]);

    return responseMessage(null);
  }
}
