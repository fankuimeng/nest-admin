declare namespace NESTADMIN {
  type User = {
    email: string;
    phone?: string;
    loginNum?: number;
    nickname: string;
    password?: string;
    avatar: string;
    loginLastIp: string;
    loginLastTime: string;
    info: string;
    isAdmin?: number;
    roles?: Role[];
    id: number;
    createTime: string;
    updateTime: string;
    createBy?: string;
    name?: string;
    updateBy?: string;
    remark?: string;
    version?: number;
    isDelete: number;
    isDisable: number;
  };

  type UserControllerBatchDeleteParams = {
    ids: string[];
  };

  type UserControllerFindOneParams = {
    id: number;
  };

  type UserControllerRemoveParams = {
    id: number;
  };

  /*获取当前用户*/
  type UserCurrentResponseVo = ResponseVo<User>;
}
