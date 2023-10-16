
import { ROUTES } from '@/utils/enums'
import type { PageResponse, SearchTimes } from '@/utils/types'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.OPERATIONLOG

/**
 * @description: 操作日志列表
 * @param {SearchParams} options
 * @Author: 白雾茫茫丶
 */
export async function getOperationLogList(options?: SearchTimes) {
  return httpRequest.get<PageResponse<API.OPERATIONLOG>>(`${baseURL}`, options);
}