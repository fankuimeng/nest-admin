// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** Role模块-获取所有的数据 GET /v1/role */
export async function RoleControllerFindAll(options?: { [key: string]: any }) {
  return request<NESTADMIN.RoleRoleAllResponseVo>('/role', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Role模块-创建 POST /v1/role */
export async function RoleControllerCreate(
  body: NESTADMIN.RoleCreateRequestDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.RoleCreateResponseVo>('/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Role模块-获取详情 GET /v1/role/${param0} */
export async function RoleControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.RoleControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/${param0}`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** Role模块-删除数据 DELETE /v1/role/${param0} */
export async function RoleControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.RoleControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<NESTADMIN.RoleDeleteResponseVo>(`/role/${param0}`, {
    method: 'DELETE',
    params,
    ...(options || {}),
  });
}

/** Role模块-更新数据 PATCH /v1/role/${param0} */
export async function RoleControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.RoleControllerUpdateParams,
  body: NESTADMIN.RoleUpdateRequestDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<NESTADMIN.RoleUpdateResponseVo>(`/role/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    data: body,
    ...(options || {}),
  });
}

/** Role模块-批量删除数据 DELETE /v1/role/batch */
export async function RoleControllerBatchDelete(
  body: NESTADMIN.RoleBatchDeleteRequestDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.RoleBatchDeleteResponseVo>('/role/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Role模块-分页列表 GET /v1/role/page */
export async function RoleControllerPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.RoleControllerPageParams,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.RolePageResponseVo>('/role/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
