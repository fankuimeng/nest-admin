import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ExceptionLogService } from './api/exception-log/exception-log.service';
import * as session from 'express-session';
import { ContextType, HttpException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { logger } from './middleware/logger.middleware'; // 日志收集中间件
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ResponseModel } from './typinng/global';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpReqTransformInterceptor } from './interceptors/http-req.interceptor';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from './utils/log4js';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
  app.use(express.json());

  // 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
  app.use(express.urlencoded({ extended: true }));

  // 全局请求拦截中间件
  // app.use(requestMiddleware);

  //日志相关
  app.use(logger); // 所有请求都打印日志

  // 获取配置文件
  const configService = app.get(ConfigService);

  // 错误异常捕获 和 过滤处理
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局统一异常返回体

  // 全局响应拦截器，格式化返回体
  app.useGlobalInterceptors(new TimeoutInterceptor()); // 请求超时
  app.useGlobalInterceptors(new HttpReqTransformInterceptor<ResponseModel>());

  app.useGlobalPipes(new ValidationPipe());

  // 配置文件访问  文件夹为静态目录，以达到可直接访问下面文件的目的
  const rootDir = join(__dirname, '..');
  app.use('/static', express.static(join(rootDir, '/upload')));

  // 全局添加接口前缀
  app.setGlobalPrefix(configService.get('REQUEST_URL_PREFIX') || '');

  // helmet头部安全
  app.use(helmet());
  // rateLimit限流
  app.use(
    rateLimit({
      windowMs: 60 * 1000, //1分钟
      max: 100, //允许每个ip在这windows时间里请求的次数
      handler: (req, res, next) => {
        const httpFilter = new HttpExceptionFilter();
        httpFilter.catch(new HttpException('当前请求过多，请稍后重试', 429), {
          switchToHttp: function (): HttpArgumentsHost {
            const httpArgumentsHost = {
              getRequest: () => res,
              getResponse: () => req,
              getNext: () => next,
            } as HttpArgumentsHost;
            return httpArgumentsHost;
          },
        });
      },
    }),
  );

  // 使用session
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false, // 强制保存 sseion 即使它并没有变化，默认为true
      saveUninitialized: false, // 强制将未初始化的 session 存储
    }),
  );
  // 构建swagger文档
  const options = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_UI_TITLE'))
    .addBearerAuth()
    .setDescription(configService.get('SWAGGER_UI_DESC'))
    .setVersion(configService.get('SWAGGER_API_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.SWAGGER_SETUP_PATH, app, document);

  await app.listen(configService.get('APP_PROT'), () => {
    Logger.info(
      `服务已经启动,接口请访问:http://www.localhost:${configService.get(
        'APP_PROT',
      )}`,
    );
  });
}

bootstrap();
