import { LoginParams, LoginResultType, USERMANAGEMENT } from "./typeing";
import { Res } from "../global/typeing";
import { request } from "@/utils/request";

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
    data: { refreshToken },
    method: "POST",
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function queryCurrentUser(options?: { [key: string]: any }) {
  return request<Res<USERMANAGEMENT>>("/user/current-user", options || {});
}
