declare namespace NESTADMIN {
  type Logger = {
    /** 用户名称 */
    user_name?: string;
    content?: string;
    ip: string;
    path: string;
    user_agent: string;
    params: Record<string, any>;
    method: string;
    api_url: string;
    userInfo: User;
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: string;
    updateBy?: string;
    remark?: string;
    version?: number;
    isDelete?: number;
    isDisable?: number;
  };

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
    /** 名称 */
    name?: string;
    /** 是否禁用 */
    isDisable?: number;
    /** id */
    id?: number;
    /** 创建人 */
    createBy?: string;
    /** 更新人 */
    updateBy?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 创建时间 */
    createTime?: string;
    /** 条数 */
    pageSize?: number;
    /** 当前页码 */
    current?: number;
  };

  type LoggerControllerRemoveParams = {
    id: number;
  };

  type LoggerControllerUpdateParams = {
    id: number;
  };

  type LoggerCreateRequestDto = {
    /** 用户名称 */
    user_name?: string;
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: string;
    updateBy?: string;
    remark?: string;
    version?: number;
    isDelete?: number;
    isDisable?: number;
    content?: string;
    ip?: string;
    path?: string;
    user_agent?: string;
    params?: Record<string, any>;
    method?: string;
    api_url?: string;
    userInfo?: User;
  };

  /*Logger模块-创建响应体*/
  type LoggerCreateResponseVo = ResponseVo<number>;

  /*Logger模块-删除数据*/
  type LoggerDeleteResponseVo = ResponseVo<number>;

  /*Logger模块-所有数据-不分页响应体*/
  type LoggerLoggerAllResponseVo = ResponseVo<Logger[]>;

  /*Logger模块-分页响应体*/
  type LoggerPageResponseVo = ResponseVo<PageResponseVo>;

  type LoggerUpdateRequestDto = {
    /** 用户名称 */
    user_name?: string;
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: string;
    updateBy?: string;
    remark?: string;
    version?: number;
    isDelete?: number;
    isDisable?: number;
    content?: string;
    ip?: string;
    path?: string;
    user_agent?: string;
    params?: Record<string, any>;
    method?: string;
    api_url?: string;
    userInfo?: User;
  };

  /*Logger模块-批量更新数据*/
  type LoggerUpdateResponseVo = ResponseVo<number[]>;
}
