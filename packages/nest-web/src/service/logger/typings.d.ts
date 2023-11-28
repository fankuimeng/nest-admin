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
  type LoggerLoggerAllResponseVo = ResponseVo<CustomType[]>;

  /*Logger模块-分页响应体*/
  type LoggerPageResponseVo = ResponseVo<PageResponseVo>;

  type LoggerUpdateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
  };

  /*Logger模块-批量更新数据*/
  type LoggerUpdateResponseVo = ResponseVo<number[]>;
}
