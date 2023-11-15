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

export enum BASE_RESPONSE_VO {
  PAGE = 'PageResponseVo',
  CREATE = 'CreateResponseVo',
  DETAIL = 'DetaileResponseVo',
  CHECK = 'CheckResponseVo',
  ALL = 'AllResponseVo',
  UPDATE = 'UpdateResponseVo',
  DELETE = 'DeleteResponseVo',
  DELETE_BATCH = 'BatchDeleteResponseVo',
}

export enum BASE_REQUEST_DTO {
  PAGE = 'PageRequestDto',
  CREATE = 'CreateRequestDto',
  DETAIL = 'DetailRequestDto',
  CHECK = 'CheckRequestDto',
  ALL = 'AllRequestDto',
  UPDATE = 'UpdateRequestDto',
  DELETE = 'DeleteRequestDto',
  DELETE_BATCH = 'BatchDeleteRequestDto',
}
