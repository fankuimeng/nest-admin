import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Logs } from './entities/log.entity';
import { PageQueryType } from 'src/typinng/global';
import {
  FindManyOptions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  SelectQueryBuilder,
} from 'typeorm';

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

  constructor() {
    super(Logs);
  }
}
