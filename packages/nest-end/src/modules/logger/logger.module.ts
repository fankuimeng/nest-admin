import { Global, Module } from '@nestjs/common';
import { LogsController } from './logger.controller';
import { LoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  controllers: [LogsController],
  providers: [LoggerService, ConfigService],
  exports: [LoggerService],
})
export class LogsModule {}
