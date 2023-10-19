import { LogsService } from './../modules/logs/logs.service';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseMessageService } from 'src/modules/response-message.service';

import { ResponseModel } from 'src/typinng/global';

@Injectable()
export class HttpReqTransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel>
{
  @Inject(ResponseMessageService)
  private responseMessageService: ResponseMessageService;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((param) => {
        const ctx = context.switchToHttp();
        // 获取响应体
        const response = ctx.getResponse();
        if (param instanceof Buffer) {
          return response.json(param);
        }
        const { data, msg, code, logContent } = param;
        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         */
        const res = this.responseMessageService.responseMessage(
          data,
          logContent,
          msg,
          code,
        );
        return response.json(res);
      }),
    );
  }
}
