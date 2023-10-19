import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Logs } from './entities/logs.entity';
import { PageQueryType, SessionModel } from 'src/typinng/global';
import {
  EntityManager,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  SelectQueryBuilder,
} from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Request } from 'express';
import { RequestContext } from 'nestjs-request-context';

@Injectable({ scope: Scope.REQUEST })
export class LogsService extends BaseService<Logs> {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {
    const repository = manager.getRepository(Logs);
    super(repository);
  }

  generateWhere(
    query: PageQueryType<Logs>,
    queryBuilder: SelectQueryBuilder<Logs>,
  ): void {
    const { user_name, start_time, end_time } = query;
    queryBuilder.where({
      user_name: Like(user_name),
      startTime: MoreThanOrEqual(start_time),
      endTime: LessThanOrEqual(end_time),
    });
  }

  async saveLogs(content: string) {
    const request: Request & { session: SessionModel } =
      RequestContext.currentContext.req;

    const { url, method, headers, ip, body } = request;

    const user_id = request.session?.currentUserInfo?.id;

    // if (user_id) return;
    const logs: Partial<Logs> = {
      user_id: 56,
      content,
      ip,
      path: headers.referer,
      user_agent: headers['user-agent'],
      method,
      api_url: url,
      params: body,
    };
    // 将数据插入到表中
    await this.saveOne(logs);
  }
}
