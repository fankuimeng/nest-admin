import { RES_CODE, RES_MSG } from 'src/typinng/enum';
import { ResponseModel } from 'src/typinng/global';

/**
 * @description: 统一返回体
 * @return {*}
 */
export const responseMessage = (
  data = {},
  msg: string = RES_MSG.SUCCESS,
  code: number = RES_CODE.SUCCESS,
): ResponseModel<any> => {
  return { data, msg, code };
};
