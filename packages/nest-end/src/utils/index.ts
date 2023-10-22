import { RES_CODE, RES_MSG } from 'src/typinng/enum';
import { ResponseModel } from 'src/typinng/global';
import * as crypto from 'crypto';

/**
 * @description: 统一返回体
 * @return {*}
 */

export function responseMessage(
  data = {},
  logContent?: string,
  msg: string[] | string = RES_MSG.SUCCESS,
  code: number = RES_CODE.SUCCESS,
): ResponseModel<any> {
  const res = { data, msg, code, logContent };
  !logContent && delete res.logContent;
  return res;
}

export function md5(str) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
