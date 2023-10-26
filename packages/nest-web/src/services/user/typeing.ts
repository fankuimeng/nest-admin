// @ts-ignore

import { TableTimes } from "../global/typeing";

/* eslint-disable */
export interface LoginParams {
  name?: string;
  password?: string;
  autoLogin?: boolean;
  type?: number;
}

export interface LoginResultType {
  userInfo?: any;
  refreshToken: string;
  accessToken: string;
}

export type USERMANAGEMENT = TableTimes & {
  user_id: string; // 用户id
  user_name: string; // 用户名称
  work_no: string; // 用户工号
  password: string; // 密码(加密)
  confirmPassword?: string; // 确认密码
  cn_name: string; // 中文名
  en_name?: string; // 英文名
  age: number; // 年龄
  email: string; // 电子邮箱
  phone: string; // 电话号码
  avatar_url: string; // 头像地址
  sex: string; // 用户性别
  token: string; // 用户令牌
  motto: string; // 座右铭
  tags: string[]; // 人物标签
  city: string[]; // 所属城市
  address: string; // 详细地址
  login_num: number; // 登录次数
  login_last_ip: string; // 最后一次登录ip
  login_last_time: Date; // 最后一次登录时间
};
// & Pick<ORGANIZATION, "org_id" | "org_name"> &
//   Pick<JOBSMANAGEMENT, "jobs_id" | "jobs_name"> &
//   Pick<ROLEMANAGEMENT, "role_id" | "role_name"> &
//   Pick<CommonTypes, "sort" | "founder" | "status">;
