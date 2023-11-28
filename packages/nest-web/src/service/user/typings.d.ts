declare namespace NESTADMIN {
  type User = {
    id?: number;
    createTime?: string;
    updateTime?: string;
    createBy?: string;
    name?: number;
    updateBy?: string;
    remark?: string;
    /** 邮箱 */
    email?: number;
    nickname?: string;
    avatar?: string;
    loginLastIp?: string;
    loginLastTime?: string;
    info?: string;
    isAdmin?: string;
    phone?: string;
    loginNum?: number;
    password?: string;
    roles?: Role[];
    version: number;
    isDelete: number;
    isDisable: number;
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
    /** 邮箱 */
    email?: number;
    nickname?: string;
    avatar?: string;
    loginLastIp?: string;
    loginLastTime?: string;
    info?: string;
    isAdmin?: string;
  };

  type UserControllerRemoveParams = {
    id: number;
  };

  type UserControllerUpdateParams = {
    id: number;
  };

  type UserCreateRequestDto = {
    id?: number;
    name?: number;
    remark?: string;
    /** 邮箱 */
    email?: number;
    nickname?: string;
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
    name?: number;
    remark?: string;
    /** 邮箱 */
    email?: number;
    nickname?: string;
  };

  /*User模块-批量更新数据*/
  type UserUpdateResponseVo = ResponseVo<number[]>;

  /*User模块-所有数据-不分页响应体*/
  type UserUserAllResponseVo = ResponseVo<CustomType[]>;
}
