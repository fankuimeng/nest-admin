import { HttpStatus } from '@nestjs/common';

export type ErrorDomain = 'users' | 'other' | 'http';

// id包含在初始化异常时生成的唯一标识符；
// timestamp存储初始化异常时的时间戳；
// domain指定此错误属于哪个业务域或发生错误的位置；
// message包含用于日志记录的内部消息（可能包含私有数据，例如标识符、异常消息、堆栈跟踪等）；
// apiMessage包含要在对用户的响应中返回的消息。这个是公开曝光的；
// status指定发生此错误时服务必须响应的HTTP状态。

export class BusinessException {
  public readonly id: string;
  public readonly timestamp: Date;

  constructor(
    public readonly message: string,
    public readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly apiMessage: string = '',
    public readonly domain: ErrorDomain = 'users',
  ) {
    // super(message);
    this.id = BusinessException.genId();
    this.timestamp = new Date();
  }

  private static genId(length = 16): string {
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return [...Array(length)].reduce(
      (a) => a + p[~~(Math.random() * p.length)],
      '',
    );
  }
}
