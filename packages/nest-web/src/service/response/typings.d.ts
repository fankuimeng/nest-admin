declare namespace NESTADMIN {
  type ResponseVo<T = any> = {
    /** 响应体 */
    data?: T;
    /** 响应信息 */
    msg: string;
    /** 状态码 */
    code: number;
  };
}
