declare namespace NESTADMIN {
  type MenuBatchDeleteRequestDto = {
    /** id */
    ids: number[];
  };

  /*Menu模块-批量删除所有的数据*/
  type MenuBatchDeleteResponseVo = ResponseVo<any[][]>;

  type MenuControllerFindOneParams = {
    id: number;
  };

  type MenuControllerPageParams = {
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
    type?: string;
    parentId?: string;
    settting?: string;
  };

  type MenuControllerRemoveParams = {
    id: number;
  };

  type MenuControllerUpdateParams = {
    id: number;
  };

  type MenuCreateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
    parentId?: string;
  };

  /*Menu模块-创建响应体*/
  type MenuCreateResponseVo = ResponseVo<number>;

  /*Menu模块-删除数据*/
  type MenuDeleteResponseVo = ResponseVo<number>;

  /*Menu模块-所有数据-不分页响应体*/
  type MenuMenuAllResponseVo = ResponseVo<CustomType[]>;

  /*Menu模块-分页响应体*/
  type MenuPageResponseVo = ResponseVo<PageResponseVo>;

  type MenuUpdateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
    parentId?: string;
  };

  /*Menu模块-批量更新数据*/
  type MenuUpdateResponseVo = ResponseVo<number[]>;
}
