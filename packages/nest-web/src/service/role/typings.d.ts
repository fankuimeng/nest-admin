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

  type RolePageDataVo = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: string;
    updateBy?: string;
    version?: number;
    isDelete?: number;
    isDisable?: number;
  };

  /*Role模块-分页响应体*/
  type RolePageResponseVo = ResponseVo<RolePageVo>;

  type RolePageVo = {
    /** Role模块-分页数据 */
    records: RolePageDataVo[];
    /** Role模块-当前页 */
    current: number;
    /** Role模块-分页大小 */
    pageSize: number;
    /** Role模块-分页数 */
    total: number;
    /** Role模块-分页数 */
    pageCount: number;
  };

  /*Role模块-所有数据-不分页响应体*/
  type RoleRoleAllResponseVo = ResponseVo<[]>;

  type RoleUpdateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
  };

  /*Role模块-批量更新数据*/
  type RoleUpdateResponseVo = ResponseVo<number[]>;
}
