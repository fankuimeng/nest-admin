import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: configService.get('DATABASE_HOST') || 'localhost', // 默认值：localhost
  port: configService.get('DATABASE_PORT'), // 默认值：3306
  username: configService.get('DATABASE_USERNAME'), // 默认值：root
  password: configService.get('DATABASE_PASSWORD'), // 默认值：password
  database: configService.get('DATABASE_NAME'), // 默认值：mydb
  synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  retryDelay: 500, //重试连接数据库间隔
  connectorPackage: 'mysql2',
  namingStrategy: new SnakeNamingStrategy(),

  // migrations:  迁移文件的路径或目录的路径，用于数据库迁移
  retryAttempts: 10, //重试连接数据库的次数
  // 配置数据库时间为东八区北京时间
  timezone: '+08:00',
  dateStrings: true,
  logging: false, // 布尔值或日志级别，表示是否启用查询日志记录。可以是 true（启用所有日志记录）、false（禁用日志记录）或 "all"、"error"、"warn"、"info"、"log"、"query"、"schema" 中的一个。
  charset: 'utf8mb4',
  autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  extra: {
    connectionLimit: 10,
    idleTimeoutMillis: 30000,
    connectTimeout: 10000,
  },
});
