// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** 此处后端没有提供注释 GET /v1/conmon/getAll/${param0} */
export async function CommonControllerGetAllHashFields(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.CommonControllerGetAllHashFieldsParams,
  options?: { [key: string]: any },
) {
  const { key: param0, ...queryParams } = params;
  return request<NESTADMIN.Result>(`/conmon/getAll/${param0}`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
