import { LoginParams, LoginResultType } from "./typeing";
import { Res } from "../global/typeing";
import { request } from "@umijs/max";

/** 登录接口 POST /api/login/account */
export async function login(
  body: LoginParams,
  options?: { [key: string]: any },
) {
  return request<Res<LoginResultType>>("/auth/login", {
    data: body,
    method: "POST",
    ...(options || {}),
  });
}

/** 用刷新token 换取权限token */
export async function getRefreshToken(
  refreshToken: string,
  options?: { [key: string]: any },
) {
  return request<Res<LoginResultType>>("/auth/refresh", {
    params: { refreshToken },
    method: "POST",
    ...(options || {}),
  });
}
