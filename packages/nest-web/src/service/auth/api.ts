// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

/** 获取登录后的用户权限信息 POST /v1/auth/login */
export async function AuthControllerSignin(
  body: NESTADMIN.AuthUserRegisterDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.AuthLoginResponseVo>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新tpken POST /v1/auth/refresh */
export async function AuthControllerRefresh(
  body: NESTADMIN.AuthRefreshTokenDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.AuthLoginResponseVo>('/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /v1/auth/register */
export async function AuthControllerRegister(
  body: NESTADMIN.AuthUserRegisterDto,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.AuthLoginResponseVo>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取邮箱验证码 GET /v1/auth/register-email */
export async function AuthControllerCaptcha(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: NESTADMIN.AuthControllerCaptchaParams,
  options?: { [key: string]: any },
) {
  return request<NESTADMIN.ResponseVo<string>>('/auth/register-email', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取图形验证码 GET /v1/auth/verify-code */
export async function AuthControllerGetCaptcha(options?: { [key: string]: any }) {
  return request<NESTADMIN.AuthVerifyCodeResponseVo>('/auth/verify-code', {
    method: 'GET',
    ...(options || {}),
  });
}
