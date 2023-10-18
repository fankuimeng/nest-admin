import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { responseMessage } from 'src/utils';
import { PageQueryType } from 'src/typinng/global';
import { Logs } from './entities/log.entity';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async create(@Body() createLogDto: Logs) {
    const data = await this.logsService.saveOne(createLogDto);
    return responseMessage(data);
  }

  @Get()
  async findAll(@Query() logsInfo: PageQueryType<Logs>) {
    const data = await this.logsService.page(logsInfo);
    return responseMessage(data);
  }
}
