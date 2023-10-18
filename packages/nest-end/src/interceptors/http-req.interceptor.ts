import { LogsService } from './../modules/logs/logs.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from 'src/typinng/global';
import { responseMessage } from 'src/utils';

@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel>
{
  constructor(private logsService: LogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((param) => {
        if (param instanceof Buffer) {
          return param;
        }
        const { data, msg, code, logContent } = param;

        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         */

        logContent && this.logsService.saveLogs(logContent); // 保存操作日志 异常操作不管理
        return responseMessage(data, null, msg, code);
      }),
    );
  }
}
