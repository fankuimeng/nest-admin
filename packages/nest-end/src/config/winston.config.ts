import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const winstonConfig = (configService: ConfigService): WinstonModuleOptions => {
  const loggerConfig = [
    {
      type: 'error',
      maxFiles: '14d',
      maxSize: '30m',
    },
    'info',
    'warn',
    'debug',
  ];
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
      new transports.Console({}),
      ...loggerConfig.map(
        (item: any) =>
          new winston.transports.DailyRotateFile({
            dirname: `logs`,
            filename: `application-%DATE%.${item?.type || item}.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: item?.maxSize || '20m',
            maxFiles: item?.maxFiles || '7d',
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              winston.format.json(),
            ),
            level: item?.type || item,
          }),
      ),
    ],
  };
};
export default winstonConfig;
