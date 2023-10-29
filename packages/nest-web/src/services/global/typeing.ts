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
