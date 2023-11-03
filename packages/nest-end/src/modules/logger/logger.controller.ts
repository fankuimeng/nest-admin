import { Controller,  } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { LoggerService } from './logger.service';
import { Logger } from './entities/Logger.entity';

@Controller('logger')
export class LogsController extends BaseController<Logger> {
  constructor(private readonly logsService: LoggerService) {
    super(logsService);
  }
}
