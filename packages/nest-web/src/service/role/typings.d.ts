declare namespace NESTADMIN {
  type Role = {
    code?: string;
    describe?: string;
    permissions: Permission[];
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
}
