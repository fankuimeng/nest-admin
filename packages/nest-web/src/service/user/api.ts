// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** 此处后端没有提供注释 GET /v1/user */
export async function UserControllerFindAll(options?: { [key: string]: any }) {
  return request<any>('/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /v1/user */
export async function UserControllerCreate(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/user', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /v1/user/${param0} */
export async function UserControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.UserControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /v1/user/${param0} */
export async function UserControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.UserControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /v1/user/${param0} */
export async function UserControllerBatchDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.UserControllerBatchDeleteParams,
  options?: { [key: string]: any },
) {
  const { ids: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前用户 GET /v1/user/current-user */
export async function UserControllerCurrentUser(options?: { [key: string]: any }) {
  return request<NESTADMIN.UserCurrentResponseVo>('/user/current-user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /v1/user/init-data */
export async function UserControllerInitData(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/user/init-data', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /v1/user/page */
export async function UserControllerPage(options?: { [key: string]: any }) {
  return request<any>('/user/page', {
    method: 'GET',
    ...(options || {}),
  });
}
