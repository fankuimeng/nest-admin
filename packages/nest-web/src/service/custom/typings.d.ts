declare namespace NESTADMIN {
  type CustomType = {
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
}
