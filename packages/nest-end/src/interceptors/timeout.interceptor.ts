import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(1000 * 60),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new HttpException({ message: "'请求超时'" }, HttpStatus.FOUND),
          );
        }

        return throwError(() => new HttpException(err.response, err.status));
      }),
    );
  }
}
