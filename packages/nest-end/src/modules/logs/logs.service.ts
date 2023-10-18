import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Logs } from './entities/log.entity';
import { PageQueryType } from 'src/typinng/global';
import {
  FindManyOptions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    @InjectRepository(Logs)
    private readonly repository: Repository<Logs>,
  ) {
    super(repository);
  }
}
