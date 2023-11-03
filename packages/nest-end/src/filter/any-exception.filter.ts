import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { LoggerService } from 'src/modules/logger/logger.service';
import { Request, Response } from 'express';
import { BusinessException, ErrorDomain } from './business.exception';

export interface ApiError {
  id: string;
  domain: ErrorDomain;
  message: string;
  timestamp: Date;
}

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  @Inject(LoggerService)
  private loggerService: LoggerService;
  // ArgumentsHost叫做参数主机，它是一个实用的工具 这里我们使用 它的一个方法来获取上下文ctx
  catch(exception: any, host: Partial<ArgumentsHost>) {
    let body: ApiError;
    let status: HttpStatus;
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应体
    const response = ctx.getResponse<Response>();
    // 获取请求体
    const request = ctx.getRequest<Request>();

    if (exception instanceof BusinessException) {
      // 直接处理我们自己的异常
      body = {
        id: exception.id,
        message: exception.message,
        domain: exception.domain,
        timestamp: exception.timestamp,
      };
      status = exception.status;
    } else if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      const message = Array.isArray(res?.message)
        ? res?.message?.join?.()
        : res?.message;
      body = new BusinessException(
        message || exception.message || '服务异常',
        exception.getStatus(),
        exception.message || request.originalUrl, // 如果你喜欢，也可以选择普通消息
        'http',
      );
      status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      // 对于所有其他异常，只需返回500错误
      body = new BusinessException(
        exception.message || '服务异常',
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Internal error occurred: ${request.originalUrl}`,
        'other',
      );
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    // 获取状态码，判断是HTTP异常还是服务器异常

    const logFormat = `
        --------------------- 异常日志 ---------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${typeof body === 'string' ? body : JSON.stringify(body)} 
        --------------------- 异常日志 ---------------------
        `;
    // 自定义异常返回体logFormat

    response
      .status(status)
      .json(
        this.loggerService.responseMessage(
          null,
          { content: logFormat, type: 'error' },
          body.message,
          status,
        ),
      );
  }
}
