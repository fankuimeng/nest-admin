import { eq } from "lodash-es";
import LocalStorage from "./storage";
import { history } from "@umijs/max";
import { stringify } from "querystring";
import { LockSleepTypes, ROUTES } from "@/service/global/typeing";
import { LOCAL_STORAGE, REQUEST_CODE } from "@/service/enum";

export const isSuccess = (code?: number): boolean =>
  eq(code, REQUEST_CODE.SUCCESS);

/**
 * @description: 退出登录返回到登录页
 */
export const logoutToLogin = () => {
  const { search, pathname } = window.location;
  // 获取 LOCK_SLEEP 信息
  const LOCK_SLEEP = LocalStorage.getLocalStorageItem<LockSleepTypes>(
    LOCAL_STORAGE.LOCK_SLEEP,
  );
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get("redirect");
  // 移除 token
  LocalStorage.removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN);
  // 取消睡眠弹窗
  if (LOCK_SLEEP) {
    LocalStorage.setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, {
      ...LOCK_SLEEP,
      isSleep: false,
    });
  }
  // 重定向地址
  if (window.location.pathname !== ROUTES.LOGIN && !redirect) {
    history.replace({
      pathname: ROUTES.LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};
