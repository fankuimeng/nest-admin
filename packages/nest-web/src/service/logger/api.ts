// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** Logger模块-获取所有的数据 GET /v1/logger */
export async function LoggerControllerFindAll(options?: { [key: string]: any }) {
  return request<NESTADMIN.LoggerLoggerAllResponseVo>('/logger', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Logger模块-创建 POST /v1/logger */
export async function LoggerControllerCreate(
  body: NESTADMIN.LoggerCreateRequestDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.LoggerCreateResponseVo>('/logger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logger模块-获取详情 GET /v1/logger/${param0} */
export async function LoggerControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.LoggerControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/logger/${param0}`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** Logger模块-删除数据 DELETE /v1/logger/${param0} */
export async function LoggerControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.LoggerControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<NESTADMIN.LoggerDeleteResponseVo>(`/logger/${param0}`, {
    method: 'DELETE',
    params,
    ...(options || {}),
  });
}

/** Logger模块-更新数据 PATCH /v1/logger/${param0} */
export async function LoggerControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.LoggerControllerUpdateParams,
  body: NESTADMIN.LoggerUpdateRequestDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<NESTADMIN.LoggerUpdateResponseVo>(`/logger/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    data: body,
    ...(options || {}),
  });
}

/** Logger模块-批量删除数据 DELETE /v1/logger/batch */
export async function LoggerControllerBatchDelete(
  body: NESTADMIN.LoggerBatchDeleteRequestDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.LoggerBatchDeleteResponseVo>('/logger/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logger模块-分页列表 GET /v1/logger/page */
export async function LoggerControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.LoggerControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.LoggerPageResponseVo>('/logger/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
