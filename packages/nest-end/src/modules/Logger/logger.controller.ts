import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { Logger } from './entities/logger.entity';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LogsController extends BaseController<Logger> {
  constructor(private readonly logsService: LoggerService) {
    super(logsService);
  }
}
