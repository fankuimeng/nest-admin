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
import { LoggerService } from 'src/modules/logger/logger.service';

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

        if (param instanceof Buffer) {
          return param;
        }
        const { code, msg, data, logContent } = param;
        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         */
        return this.loggerService.responseMessage(data, logContent, msg, code);
      }),
    );
  }
}
