declare namespace NESTADMIN {
  type AuthControllerCaptchaParams = {
    address: string;
  };

  type AuthLoginResponseType = {
    userInfo: User;
    refreshToken: string;
    accessToken: string;
  };

  /*desc:用户注册, type:"AuthLoginResponseType" VO:"ResponseVo"*/
  type AuthLoginResponseVo = ResponseVo<AuthLoginResponseType>;

  type AuthRefreshTokenDto = {
    /** 密码 */
    refreshToken?: string;
  };

  type AuthUserRegisterDto = {
    /** 用户名 */
    name?: string;
    /** 密码 */
    password?: string;
    /** 图形验证码 */
    captcha?: string;
    /** 邮箱验证码 */
    email?: number;
    /** 是否为管理员 */
    isAdmin?: number;
  };

  /*图形验证码*/
  type AuthVerifyCodeResponseVo = ResponseVo<string>;
}
