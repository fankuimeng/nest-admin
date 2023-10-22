import { responseMessage as responseMessageFn } from 'src/utils';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/modules/Logger/logger.service';

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  @Inject(LoggerService)
  private loggerService: LoggerService;
  // ArgumentsHost叫做参数主机，它是一个实用的工具 这里我们使用 它的一个方法来获取上下文ctx
  catch(exception: HttpException, host: Partial<ArgumentsHost>) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应体
    const response = ctx.getResponse<Response>();
    // 获取请求体
    const request = ctx.getRequest<Request>();
    // 获取状态码
    const status = exception.getStatus();
    // 打印日志

    // 如果 response.message 是个数组，就返回 join 的结果，否则还是返回 exception.message
    const res = exception.getResponse() as { message: string[] };

    const newMessage = res?.message?.join
      ? res?.message?.join?.()
      : res?.message;
    const logFormat = `
        --------------------- HTTP 异常日志 ---------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${newMessage}
        --------------------- HTTP 异常日志 ---------------------
        `;
    this.loggerService.logger(logFormat, 'error');

    // 自定义异常返回体

    return response
      .status(status)
      .json(this.loggerService.responseMessage(null, null, newMessage, status));
  }
}
