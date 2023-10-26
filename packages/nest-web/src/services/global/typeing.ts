// @ts-ignore
/* eslint-disable */

import type { Settings as LayoutSettings } from "@ant-design/pro-components";
import { USERMANAGEMENT } from "../user/typeing";

type CurrentUser = {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: { key?: string; label?: string }[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: string;
  geographic?: {
    province?: { label?: string; key?: string };
    city?: { label?: string; key?: string };
  };
  address?: string;
  phone?: string;
};

type PageParams = {
  current?: number;
  pageSize?: number;
};
export type InitialStateTypes = {
  Locales?: Record<string, any>;
  Access_token?: string;
  Settings?: Partial<LayoutSettings>;
  CurrentUser?: USERMANAGEMENT;
  Permissions?: string[];
  // RouteMenu?: MENUMANAGEMENT[];
  Collapsed?: boolean;
};

export type TableTimes = {
  created_time: string; // 创建时间
  updated_time: string; // 最后一次更新时间
};

type RuleListItem = {
  key?: number;
  disabled?: boolean;
  href?: string;
  avatar?: string;
  name?: string;
  owner?: string;
  desc?: string;
  callNo?: number;
  status?: number;
  updatedAt?: string;
  createdAt?: string;
  progress?: number;
};

type RuleList = {
  data?: RuleListItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

type FakeCaptcha = {
  code?: number;
  status?: string;
};
type ErrorResponse = {
  /** 业务约定的错误码 */
  errorCode: string;
  /** 业务上的错误信息 */
  errorMessage?: string;
  /** 业务上的请求是否成功 */
  success?: boolean;
};

type NoticeIconList = {
  data?: NoticeIconItem[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

type NoticeIconItemType = "notification" | "message" | "event";

type NoticeIconItem = {
  id?: string;
  extra?: string;
  key?: string;
  read?: boolean;
  avatar?: string;
  title?: string;
  status?: string;
  datetime?: string;
  description?: string;
  type?: NoticeIconItemType;
};
export interface Res<T = any> {
  code: number;
  msg: string;
  data?: T;
}
export enum REQUEST_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 表示请求成功
  BADREQUEST = 400, // 表示客户端发送的请求有错误
  UNAUTHORIZED = 401, // 表示客户端未提供身份验证凭据或身份验证凭据不正确
  NOTFOUND = 404, // 表示服务器无法找到请求的资源
  INTERNALSERVERERROR = 500, // 表示服务器内部错误
}

/**
 * @description: 存储在 localstorage 的 key
 */
export enum LOCAL_STORAGE {
  USER_INFO = "USER_INFO", // 用户信息
  ACCESS_TOKEN = "ACCESS_TOKEN", // ACCESS_TOKEN
  REFRESH_TOKEN = "REFRESH_TOKEN", // refreshToken
  LAYOUT = "LAYOUT", // 布局
  LOCK_SLEEP = "LOCK_SLEEP", // 睡眠
}

export type LockSleepTypes = {
  last_time: number;
  isSleep: boolean;
};

export enum ROUTES {
  LOGIN = "/user/login", // 登录页
  // WORKBENCH = '/dashboard/work-bench', // 指示面板-工作台
  // DEPENDENCE = '/dashboard/environmental-dependence', // 指示面板-环境依赖
  // ANNOUNCEMENT = '/administrative/announcement', // 智能行政-活动公告
  // ORGANIZATION = '/administrative/organization', // 智能行政-组织管理
  // JOBSMANAGEMENT = '/administrative/jobs-management', // 智能行政-岗位管理
  // PERSONALINFOMATION = '/personal-center/personal-information', // 个人中心-个人信息
  // PERSONALSETTING = '/personal-center/personal-setting', // 个人中心-个人设置
  // USERMANAGEMENT = '/system/user-management', // 系统设置-用户管理
  // MENUMANAGEMENT = '/system/menu-management', // 系统设置-菜单管理
  // ROLEMANAGEMENT = '/system/role-management', // 系统设置-角色管理
  // INTERNATIONALIZATION = '/system/internationalization', // 系统设置-国际化
  // OPERATIONLOG = '/system/operation-log', // 系统设置-操作日志
}
