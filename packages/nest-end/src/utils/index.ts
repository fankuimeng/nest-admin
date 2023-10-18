import { RES_CODE, RES_MSG } from 'src/typinng/enum';
import { ResponseModel } from 'src/typinng/global';

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
