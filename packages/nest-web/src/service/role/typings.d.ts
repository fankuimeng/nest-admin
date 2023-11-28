declare namespace NESTADMIN {
  type Role = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: number;
    updateBy?: string;
    remark?: string;
    code?: string;
    describe?: string;
    permissions?: Permission[];
    version: number;
    isDelete: number;
    isDisable: number;
  };

  type RoleBatchDeleteRequestDto = {
    /** id */
    ids: number[];
  };

  /*Role模块-批量删除所有的数据*/
  type RoleBatchDeleteResponseVo = ResponseVo<any[][]>;

  type RoleControllerFindOneParams = {
    id: number;
  };

  type RoleControllerPageParams = {
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

  type RoleControllerRemoveParams = {
    id: number;
  };

  type RoleControllerUpdateParams = {
    id: number;
  };

  type RoleCreateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
  };

  /*Role模块-创建响应体*/
  type RoleCreateResponseVo = ResponseVo<number>;

  /*Role模块-删除数据*/
  type RoleDeleteResponseVo = ResponseVo<number>;

  /*Role模块-分页响应体*/
  type RolePageResponseVo = ResponseVo<PageResponseVo>;

  /*Role模块-所有数据-不分页响应体*/
  type RoleRoleAllResponseVo = ResponseVo<CustomType[]>;

  type RoleUpdateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
  };

  /*Role模块-批量更新数据*/
  type RoleUpdateResponseVo = ResponseVo<number[]>;
}
