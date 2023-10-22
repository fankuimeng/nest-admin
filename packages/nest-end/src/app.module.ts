import { TypeOrmModule } from '@nestjs/typeorm';
import mysqlConfig from './config/mysql.database.config';
import exportModule from './modules';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { HttpReqTransformInterceptor } from './interceptors/http-req.interceptor';
import { ResponseModel } from './typinng/global';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { RequestContextModule } from 'nestjs-request-context';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './config/winston.config';
import { LoggerService } from './modules/Logger/logger.service';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { JwtModule } from '@nestjs/jwt';

// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';
// import 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/.${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: mysqlConfig,
      inject: [ConfigService], // 注入 ConfigService1 依赖
    }),

    RequestContextModule,
    ...exportModule,
  ],
  exports: [],
  providers: [
    LoggerService,
    {
      // 这样注册也是全局的
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      // 这样注册也是全局的
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: HttpReqTransformInterceptor<ResponseModel>, // 全局拦截器，用来收集日志
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes
      //   { path: 'userinfo/self', method: RequestMethod.ALL },
      //   {
      //     path: 'talkcomment',
      //     method: RequestMethod.ALL,
      //   },
      //   { path: 'comment', method: RequestMethod.ALL },
      //   { path: 'chat', method: RequestMethod.ALL },
      (); //解析请求的token
  }
}
