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

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  @Inject(LoggerService)
  private loggerService: LoggerService;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { originalUrl, method, ip, params, query, body } =
      context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        const logFormat = `
            --------------------- TransformInterceptor 日志 ---------------------
            Request original url: ${originalUrl}
            Method: ${method}
            IP: ${ip}
            Parmas: ${JSON.stringify(params)}
            Query: ${JSON.stringify(query)}
            Body: ${JSON.stringify(body)} 
            --------------------- TransformInterceptor 日志 ---------------------
            `;
        this.loggerService.logger(logFormat);
        return data;
      }),
    );
  }
}
