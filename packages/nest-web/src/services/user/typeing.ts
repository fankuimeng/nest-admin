// @ts-ignore
/* eslint-disable */
export interface LoginParams {
  name?: string;
  password?: string;
  autoLogin?: boolean;
  type?: number;
}

export interface LoginResultType {
  data: {
    userInfo?: any;
    refreshToken: string;
    accessToken: string;
  };
}
