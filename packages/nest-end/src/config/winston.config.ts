import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const winstonConfig = async (
  configService: ConfigService,
): Promise<WinstonModuleOptions> => {
  return {
    // winston 格式定义
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.prettyPrint(),
    ),
    // 生成文件
    // winston 文档中使用的方法为 new transports.File()
    // 因为加入日志归档等相关功能，所以使用transports.DailyRotateFile()方法来实现
    transports: [
      new transports.Console(),
      new winston.transports.DailyRotateFile({
        dirname: `logs`, // 日志保存的目录
        filename: 'application-%DATE%.info.log',
        // 日志名称，占位符 %DATE% 取值为 datePattern 值。
        datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
        zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
        maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
        maxFiles: '7d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
        // 记录时添加时间戳信息
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.json(),
        ),
        level: 'info',
      }),
      new winston.transports.DailyRotateFile({
        dirname: configService.get('DIRNAME'), // 日志保存的目录
        filename: 'application-%DATE%.error.log',
        // 日志名称，占位符 %DATE% 取值为 datePattern 值。
        datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
        zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
        maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
        maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
        // 记录时添加时间戳信息
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.json(),
        ),
        level: 'error',
      }),
    ],
  };
};
export default winstonConfig;