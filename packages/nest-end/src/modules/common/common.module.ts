// redis.module.ts

import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CommonController } from './common.controller';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [RedisService, ConfigService, EmailService],
  exports: [RedisService, EmailService],
  controllers: [CommonController],
})
export class CommonModule {}
