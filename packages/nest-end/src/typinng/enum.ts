/**
 * @description: 统一请求体枚举
 * @return {*}
 
 */
export enum RES_MSG {
  SUCCESS = '操作成功！',
  FAILURE = '操作失败！',
}

export enum RES_CODE {
  SUCCESS = 200,
  FAILURE = 400,
}

export const EMPTY_RESPONSE_LIST = { list: [], total: 0 };


export enum DATE_FORMATE {
  DATE = 'YYYY-MM-DD hh:mm:ss',
}