// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** User模块-获取所有的数据 GET /v1/user */
export async function UserControllerFindAll(options?: { [key: string]: any }) {
  return request<NESTADMIN.UserUserAllResponseVo>('/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** User模块-创建 POST /v1/user */
export async function UserControllerCreate(
  body: NESTADMIN.UserCreateRequestDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.UserCreateResponseVo>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** User模块-获取详情 GET /v1/user/${param0} */
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

/** User模块-删除数据 DELETE /v1/user/${param0} */
export async function UserControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.UserControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<NESTADMIN.UserDeleteResponseVo>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** User模块-更新数据 PATCH /v1/user/${param0} */
export async function UserControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.UserControllerUpdateParams,
  body: NESTADMIN.UserUpdateRequestDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<NESTADMIN.UserUpdateResponseVo>(`/user/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** User模块-批量删除数据 DELETE /v1/user/batch */
export async function UserControllerBatchDelete(
  body: NESTADMIN.UserBatchDeleteRequestDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.UserBatchDeleteResponseVo>('/user/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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

/** User模块-分页列表 GET /v1/user/page */
export async function UserControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.UserControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.UserPageResponseVo>('/user/page', {
    method: 'GET',
    params: {
      // isDisable has a default value: 1
      isDisable: '1',
      // id has a default value: 1
      id: '1',

      // updateTime has a default value: 2023-11-18 12:49:03
      updateTime: '2023-11-18 12:49:03',
      // createTime has a default value: 2023-11-18 12:49:03
      createTime: '2023-11-18 12:49:03',
      // pageSize has a default value: 10
      pageSize: '10',
      // current has a default value: 1
      current: '1',
      ...params,
    },
    ...(options || {}),
  });
}
