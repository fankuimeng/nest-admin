import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { PageQueryType, SessionModel } from 'src/typinng/global';
import {
  EntityManager,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  SelectQueryBuilder,
} from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RequestContext } from 'nestjs-request-context';
import { Logger } from './entities/logger.entity';
import { LogCallback, Logger as WinstonLogger, createLogger } from 'winston';
import { ConfigService } from '@nestjs/config';
import winstonConfig from 'src/config/winston.config';
import { Request, Response } from 'express';
import { responseMessage } from 'src/utils';

@Injectable()
export class LoggerService extends BaseService<Logger> {
  private loggerFn: WinstonLogger;

  constructor(
    private configService: ConfigService,
    @InjectEntityManager()
    manager: EntityManager,
  ) {
    super(manager, Logger);
    this.loggerFn = createLogger(winstonConfig(configService));
  }

  generateWhere(
    query: PageQueryType<Logger>,
    queryBuilder: SelectQueryBuilder<Logger>,
  ): void {
    const { user_name, start_time, end_time } = query;
    queryBuilder.where({
      user_name: Like(user_name),
      startTime: MoreThanOrEqual(start_time),
      endTime: LessThanOrEqual(end_time),
    });
  }

  // 错误日志记录
  logger(
    message:
      | string
      | any
      | ((context?: {
          req: Response;
          res: Request & { session: SessionModel };
        }) => string),
    lever: 'info' | 'error' | 'warn' | 'debug' = 'info',
    meta?: Record<string, any>,
    logCallback?: LogCallback,
  ): WinstonLogger {
    const context: {
      req: Response;
      res: Request & { session: SessionModel };
    } = RequestContext.currentContext;
    const loggerFn = this.loggerFn[lever];
    const newMessage =
      typeof message === 'function'
        ? message(context)
        : typeof message === 'string'
        ? message
        : JSON.stringify(message);
    if (meta?.save) {
      this.saveLogs(newMessage);
    }
    return loggerFn(newMessage, meta, logCallback);
  }

  async saveLogs(content: string) {
    const request: Request & { session: SessionModel } =
      RequestContext.currentContext.req;
    const { url, method, headers, ip, body } = request;
    const user_id = request?.session?.currentUserInfo?.id;
    if (!user_id) return;
    const logs: Partial<Logger> = {
      content: content,
      ip,
      path: request.headers.referer,
      user_agent: headers['user-agent'],
      method,
      api_url: url,
      params: body,
    };
    return await this.repository.save(logs);
  }

  responseMessage = (...args) => {
    if (args[1]) {
      const content = args[1]?.content || args[1];
      const type = args[1]?.type || 'info';
      this.logger(content, type, { save: true });
      args[1] = null;
    }
    return responseMessage(...args);
  };
}
