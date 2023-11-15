declare namespace NESTADMIN {
  type User = {
    email?: string;
    phone?: string;
    loginNum?: number;
    nickname?: string;
    password?: string;
    avatar?: string;
    loginLastIp?: string;
    loginLastTime?: string;
    info?: string;
    isAdmin?: number;
    roles?: Role[];
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

  type UserBatchDeleteRequestDto = {
    /** id */
    ids: number[];
  };

  /*User模块-批量删除所有的数据*/
  type UserBatchDeleteResponseVo = ResponseVo<any[][]>;

  type UserControllerFindOneParams = {
    id: number;
  };

  type UserControllerPageParams = {
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

  type UserControllerRemoveParams = {
    id: number;
  };

  type UserControllerUpdateParams = {
    id: number;
  };

  type UserCreateRequestDto = {
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
    email?: string;
    phone?: string;
    loginNum?: number;
    nickname?: string;
    password?: string;
    avatar?: string;
    loginLastIp?: string;
    loginLastTime?: string;
    info?: string;
    isAdmin?: number;
    roles?: Role[];
  };

  /*User模块-创建响应体*/
  type UserCreateResponseVo = ResponseVo<number>;

  /*获取当前用户*/
  type UserCurrentResponseVo = ResponseVo<User>;

  /*User模块-删除数据*/
  type UserDeleteResponseVo = ResponseVo<number>;

  /*User模块-分页响应体*/
  type UserPageResponseVo = ResponseVo<PageResponseVo>;

  type UserUpdateRequestDto = {
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
    email?: string;
    phone?: string;
    loginNum?: number;
    nickname?: string;
    password?: string;
    avatar?: string;
    loginLastIp?: string;
    loginLastTime?: string;
    info?: string;
    isAdmin?: number;
    roles?: Role[];
  };

  /*User模块-批量更新数据*/
  type UserUpdateResponseVo = ResponseVo<number[]>;

  /*User模块-所有数据-不分页响应体*/
  type UserUserAllResponseVo = ResponseVo<User[]>;
}
