import type { LoginTypes } from '@/utils/types';
import type { LoginParams } from '@/utils/types/login';
import { httpRequest } from '@/utils/umiRequest';

export async function Login(options?: LoginParams) {
  return httpRequest.post<LoginTypes>('/auth/login', options);
}

export async function Logout() {
  return httpRequest.post<Record<string, any>>('/auth/logout');
}

export async function getUserInfo() {
  return httpRequest.get<API.USERMANAGEMENT>('/auth/user-info');
}

export async function getPermissions() {
  return httpRequest.get<string[]>('/auth/permissions');
}

export async function getRoutesMenus() {
  return httpRequest.get<API.MENUMANAGEMENT[]>('/auth/routes-menu');
}

export async function getCaptcha() {
  return httpRequest.get<string>('/auth/verify-code');
}
