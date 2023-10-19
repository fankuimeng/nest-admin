import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { responseMessage } from 'src/utils';
import { PageQueryType } from 'src/typinng/global';
import { Logs } from './entities/logs.entity';
import { BaseController } from '../base/base.controller';

@Controller('logs')
export class LogsController extends BaseController<Logs> {
  constructor(private readonly logsService: LogsService) {
    super(logsService);
  }
}
