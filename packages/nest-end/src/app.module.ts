import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './api/auth/auth.module';
import mysqlConfig from './config/mysql.database.config';
import exportModule from './modules';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';

console.log('🚀 ~ file: app.module.ts:5 ~ exportModule:', exportModule);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/.${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      //   imports: [ConfigModule],
      useFactory: mysqlConfig,
      inject: [ConfigService], // 注入 ConfigService1 依赖
    }),
    ...exportModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(
      { path: 'userinfo/self', method: RequestMethod.ALL },
      {
        path: 'talkcomment',
        method: RequestMethod.ALL,
      },
      { path: 'comment', method: RequestMethod.ALL },
      { path: 'chat', method: RequestMethod.ALL },
    ); //解析请求的token
    consumer.apply(LoggerMiddleware).forRoutes(
      { path: '*', method: RequestMethod.POST },
      {
        path: '*',
        method: RequestMethod.DELETE,
      },
    );
  }
}
