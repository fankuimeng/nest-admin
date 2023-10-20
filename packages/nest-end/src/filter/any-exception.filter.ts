import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { LoggerService } from 'src/modules/Logger/logger.service';

export class AnyException {
  message: string;
  code: number;
  constructor(message: string, code = HttpStatus.INTERNAL_SERVER_ERROR) {
    this.message = message;
    this.code = code;
  }
}

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch(AnyException)
export class AllExceptionsFilter implements ExceptionFilter {
  @Inject(LoggerService)
  private loggerService: LoggerService;
  // ArgumentsHost叫做参数主机，它是一个实用的工具 这里我们使用 它的一个方法来获取上下文ctx
  catch(exception: AnyException, host: Partial<ArgumentsHost>) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应体
    const response = ctx.getResponse();
    // 获取请求体
    const request = ctx.getRequest();
    // 获取状态码，判断是HTTP异常还是服务器异常
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.code;
    // 打印日志
    const logFormat = `
        --------------------- 全局异常日志 ---------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${exception} 
        --------------------- 全局异常日志 ---------------------
        `;
    this.loggerService.logger(logFormat, 'error');
    // 自定义异常返回体logFormat
    response
      .status(status)
      .json(
        this.loggerService.responseMessage(
          null,
          null,
          exception.message,
          status,
        ),
      );
  }
}
