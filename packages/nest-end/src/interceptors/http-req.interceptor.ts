/*
 * @Description: 全局响应拦截器
 * @Version: 2.0
 
 * @Date: 2022-10-14 09:58:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-28 10:47:38
 */
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
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((param) => {
        if (param instanceof Buffer) {
          return param;
        }
        const { data, msg, code } = param;
        /**
         * @description: response 将返回一个对象
         * @description: 报装返回体，设计返回的逻辑
         */
        return responseMessage(data, msg, code);
      }),
    );
  }
}
