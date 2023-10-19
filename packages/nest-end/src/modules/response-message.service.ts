import { Inject, Injectable } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { ResponseModel } from 'src/typinng/global';
import { RES_CODE, RES_MSG } from 'src/typinng/enum';

@Injectable()
export class ResponseMessageService {
  @Inject(LogsService)
  private logsService: LogsService;

  responseMessage<T = any>(
    data: T,
    logContent?: string,
    msg: string[] | string = RES_MSG.SUCCESS,
    code: number = RES_CODE.SUCCESS,
  ): ResponseModel<T> {
    const res = { data, msg, code, logContent };
    if (logContent) {
      this.logsService.saveLogs(logContent);
    }
    delete res.logContent;
    return res;
  }
}
