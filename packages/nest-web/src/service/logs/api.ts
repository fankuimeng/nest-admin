// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** 此处后端没有提供注释 DELETE /v1/logger/${param0} */
export async function LogsControllerBatchDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.LogsControllerBatchDeleteParams,
  options?: { [key: string]: any },
) {
  const { ids: param0, ...queryParams } = params;
  return request<any>(`/logger/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
