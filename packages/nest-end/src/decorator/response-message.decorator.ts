import { SetMetadata } from '@nestjs/common';

// 方法上标记  在多个切面获取标记数据进行逻辑处理
export const ResponseMessage = (...args: string[]) =>
  SetMetadata('response-message', args);
