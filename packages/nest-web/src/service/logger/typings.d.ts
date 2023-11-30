declare namespace NESTADMIN {
  type LoggerBatchDeleteRequestDto = {
    /** id */
    ids: number[];
  };

  /*Logger模块-批量删除所有的数据*/
  type LoggerBatchDeleteResponseVo = ResponseVo<any[][]>;

  type LoggerControllerFindOneParams = {
    id: number;
  };

  type LoggerControllerPageParams = {
    /** 条数 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: number;
    updateBy?: string;
  };

  type LoggerControllerRemoveParams = {
    id: number;
  };

  type LoggerControllerUpdateParams = {
    id: number;
  };

  type LoggerCreateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
  };

  /*Logger模块-创建响应体*/
  type LoggerCreateResponseVo = ResponseVo<number>;

  /*Logger模块-删除数据*/
  type LoggerDeleteResponseVo = ResponseVo<number>;

  /*Logger模块-所有数据-不分页响应体*/
  type LoggerLoggerAllResponseVo = ResponseVo<[]>;

  type LoggerPageDataVo = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: number;
    updateBy?: string;
    remark?: string;
    version?: number;
    isDelete?: number;
    isDisable?: number;
    ip?: string;
    path?: string;
    user_agent?: string;
    params?: Record<string, any>;
    method?: string;
    api_url?: string;
    userInfo?: User;
  };

  /*Logger模块-分页响应体*/
  type LoggerPageResponseVo = ResponseVo<LoggerPageVo>;

  type LoggerPageVo = {
    /** Logger模块-分页数据 */
    records: LoggerPageDataVo[];
    /** Logger模块-当前页 */
    current: number;
    /** Logger模块-分页大小 */
    pageSize: number;
    /** Logger模块-分页数 */
    total: number;
    /** Logger模块-分页数 */
    pageCount: number;
  };

  type LoggerUpdateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
  };

  /*Logger模块-批量更新数据*/
  type LoggerUpdateResponseVo = ResponseVo<number[]>;
}
