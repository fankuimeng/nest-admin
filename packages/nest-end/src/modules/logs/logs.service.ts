import { Inject, Injectable } from '@nestjs/common';
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
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
@Injectable()
export class LogsService extends BaseService<Logs> {
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
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
    @Inject(REQUEST)
    private readonly request: Request & { session: SessionModel },
  ) {
    super(manager.getRepository(Logs));
  }

  async saveLogs(content: string) {
    const { url, method, headers, ip, body } = this.request;
    const user_id = this.request.session.currentUserInfo.id;
    if (user_id) return;
    const logs: Partial<Logs> = {
      user_id: this.request.session.currentUserInfo.id,
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
