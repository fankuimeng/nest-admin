import { Controller } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Logger } from './entities/Logger.entity';
import { generateBaseController } from '../base/base.controller';
import { ApiTags } from '@nestjs/swagger';
const BaseController = generateBaseController(Logger);

@ApiTags('Logger-日志模块')
@Controller('logger')
export class LoggerController extends BaseController<Logger> {
  constructor(private readonly logsService: LoggerService) {
    super(logsService);
  }
}
