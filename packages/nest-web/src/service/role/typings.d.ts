declare namespace NESTADMIN {
  type Role = {
    code?: string;
    describe?: string;
    permissions?: Permission[];
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

  type RoleControllerRemoveParams = {
    id: number;
  };

  type RoleControllerUpdateParams = {
    id: number;
  };

  type RoleCreateRequestDto = {
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
    code?: string;
    describe?: string;
    permissions?: Permission[];
  };

  /*Role模块-创建响应体*/
  type RoleCreateResponseVo = ResponseVo<number>;

  /*Role模块-删除数据*/
  type RoleDeleteResponseVo = ResponseVo<number>;

  /*Role模块-分页响应体*/
  type RolePageResponseVo = ResponseVo<PageResponseVo>;

  /*Role模块-所有数据-不分页响应体*/
  type RoleRoleAllResponseVo = ResponseVo<Role[]>;

  type RoleUpdateRequestDto = {
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
    code?: string;
    describe?: string;
    permissions?: Permission[];
  };

  /*Role模块-批量更新数据*/
  type RoleUpdateResponseVo = ResponseVo<number[]>;
}
