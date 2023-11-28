// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** Menu模块-获取所有的数据 GET /v1/menu */
export async function MenuControllerFindAll(options?: { [key: string]: any }) {
    return request<NESTADMIN.MenuMenuAllResponseVo>('/menu', {
        method: 'GET',
        ...(options || {}),
    });
}

/** Menu模块-创建 POST /v1/menu */
export async function MenuControllerCreate(
    body: NESTADMIN.MenuCreateRequestDto,
    options?: { [key: string]: any },
) {
    return request<NESTADMIN.MenuCreateResponseVo>('/menu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** Menu模块-获取详情 GET /v1/menu/${param0} */
export async function MenuControllerFindOne(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: NESTADMIN.MenuControllerFindOneParams,
    options?: { [key: string]: any },
) {
    const { id: param0, ...queryParams } = params;
    return request<any>(`/menu/${param0}`, {
        method: 'GET',
        params: { ...queryParams },
        ...(options || {}),
    });
}

/** Menu模块-删除数据 DELETE /v1/menu/${param0} */
export async function MenuControllerRemove(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: NESTADMIN.MenuControllerRemoveParams,
    options?: { [key: string]: any },
) {
    const { id: param0, ...queryParams } = params;
    return request<NESTADMIN.MenuDeleteResponseVo>(`/menu/${param0}`, {
        method: 'DELETE',
        params: { ...queryParams },
        ...(options || {}),
    });
}

/** Menu模块-更新数据 PATCH /v1/menu/${param0} */
export async function MenuControllerUpdate(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: NESTADMIN.MenuControllerUpdateParams,
    body: NESTADMIN.MenuUpdateRequestDto,
    options?: { [key: string]: any },
) {
    const { id: param0, ...queryParams } = params;
    return request<NESTADMIN.MenuUpdateResponseVo>(`/menu/${param0}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        params: { ...queryParams },
        data: body,
        ...(options || {}),
    });
}

/** Menu模块-批量删除数据 DELETE /v1/menu/batch */
export async function MenuControllerBatchDelete(
    body: NESTADMIN.MenuBatchDeleteRequestDto,
    options?: { [key: string]: any },
) {
    return request<NESTADMIN.MenuBatchDeleteResponseVo>('/menu/batch', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** Menu模块-分页列表 GET /v1/menu/page */
export async function MenuControllerPage(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: NESTADMIN.MenuControllerPageParams,
    options?: { [key: string]: any },
) {
    return request<NESTADMIN.MenuPageResponseVo>('/menu/page', {
        method: 'GET',
        params: {
            // pageSize has a default value: 10
            pageSize: '10',
            // current has a default value: 1
            current: '1',

            ...params,
        },
        ...(options || {}),
    });
}
