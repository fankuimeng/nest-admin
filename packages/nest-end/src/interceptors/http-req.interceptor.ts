import dayjs from 'dayjs';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from 'src/modules/Logger/logger.service';

import { ResponseModel } from 'src/typinng/global';

@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel>
{
  @Inject(LoggerService)
  private loggerService: LoggerService;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((param) => {
        const ctx = context.switchToHttp();
        // 获取响应体
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const logFormat = `
        --------------------- 全局响应成功日志 ---------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Message:${param instanceof Buffer ? '资源下载' : param?.message}
        Response: ${JSON.stringify(param)} 
        --------------------- 全局响应成功日志 ---------------------
        `;
        this.loggerService.logger(logFormat, 'debug');
        if (param instanceof Buffer) {
          return param;
        }
        const { code, msg, data, logContent } = param;
        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         */
        return response.json(
          this.loggerService.responseMessage(data, logContent, msg, code),
        );
      }),
    );
  }
}
