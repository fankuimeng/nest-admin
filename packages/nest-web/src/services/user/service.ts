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
