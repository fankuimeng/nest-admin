import "nprogress/nprogress.css";

import {
  AxiosRequestConfig,
  AxiosResponse,
  RequestError,
  Request,
  RequestOptions,
  request as umiRequest,
} from "@umijs/max";
import { message, Modal } from "antd";
import { debounce } from "lodash-es"; // lodash 工具函数
import Nprogress from "nprogress";
import { isSuccess, logoutToLogin } from ".";
import LocalStorage from "./storage";
import { Res } from "@/services/global/typeing";
import { getRefreshToken } from "@/services/user/service";
import {
  CODE_MESSAGE,
  LOCAL_STORAGE,
  REQUEST_CODE,
  REQUEST_CONFIG,
  RequestMEthOD,
} from "./const";

/**
 * @description: 导出封装的请求方法
 */

class RequestConfig {
  // 维护一个promise
  private fetchNewTokenPromise: Promise<any> | null = null;

  static baseURL = REQUEST_CONFIG.BASEURL_API;
  static timeout = REQUEST_CONFIG.BASEURL_API; // 超时时间，默认 30 s
  static errorConfig = {
    // 错误抛出
    errorThrower: (res: Res) => {
      const { code, msg } = res;
      if (!isSuccess(code)) {
        throw new Error(msg); // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: async (error: RequestError, opts: RequestOptions) => {
      // 获取报错的响应和请求信息
      const { response, resquest } = error as any;
      // 配置 skipErrorHandler 会跳过默认的错误处理，用于项目中部分特殊的接口
      if (opts?.skipErrorHandler || response.code === REQUEST_CODE.UNAUTHORIZED)
        throw error;
      // Axios 的错误
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      if (response) {
        const { data } = response;
        const code = `CODE_${data.code}` as "CODE_201";
        const message = CODE_MESSAGE[code] || "服务器内部发生错误！";
        RequestConfig.debounceError(message);
      } else if (resquest) {
        RequestConfig.debounceError(CODE_MESSAGE.CODE_FAIL);
      } else {
        // 发送请求时出了点问题
        RequestConfig.debounceError(CODE_MESSAGE.CODE_ERROR);
      }
    },
  };
  static requestInterceptors = [
    (config: RequestOptions) => {
      // 获取 ACCESS_TOKEN
      const ACCESS_TOKEN = LocalStorage.getLocalStorageItem<string>(
        LOCAL_STORAGE.ACCESS_TOKEN,
      );
      // 判断是否登录存在token，有就请求头携带token
      if (ACCESS_TOKEN && config?.headers) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
      }
      // 进度条开始
      console.log(config);
      Nprogress.start();
      return { ...config };
    },
  ];
  static responseInterceptors = [
    [
      // 响应处理
      (response: Res) => {
        // 拦截响应数据，进行个性化处理
        const { data } = response;
        // 根据返回状态码，统一处理，需要前端和后端沟通确认
        switch (data.code) {
          // 成功发起请求并成功处理，一般用于数据库字段校验
          case REQUEST_CODE.NOSUCCESS:
            RequestConfig.debounceError(JSON.stringify(data.msg));
            break;
          // 成功发起请求，但是内部处理出现错误
          case REQUEST_CODE.BADREQUEST:
            RequestConfig.debounceError(JSON.stringify(data.msg));
            break;
        }
        // 进度条结束
        Nprogress.done();
        return response;
      },
      // 错误处理
      (error: RequestError) => {
        // 进度条结束
        Nprogress.done();
        return Promise.reject(error);
      },
    ],
  ];

  static axiosRequestConfig = {
    baseURL: this.baseURL,
    timeout: this.timeout,
    errorConfig: this.errorConfig,
    requestInterceptors: this.requestInterceptors,
    responseInterceptors: this.responseInterceptors,
  } as AxiosRequestConfig;

  constructor(axiosRequestConfig: AxiosRequestConfig) {
    RequestConfig.axiosRequestConfig = axiosRequestConfig
      ? { ...RequestConfig.axiosRequestConfig, ...axiosRequestConfig }
      : RequestConfig.axiosRequestConfig;
  }

  /**
   * @description: 防抖函数统一处理异常错误
   */
  static debounceError = debounce((content: string, duration = 3) => {
    message.error(content, duration);
  }, 300);
  static getRequestConfig = () => this.axiosRequestConfig;

  static request<T>(url: string, opts: Record<any, any>): Promise<T> {
    const options: any = { method: "GET", skipErrorHandler: false, ...opts };
    return new Promise(async (resolve, reject) => {
      const newResolve = resolve as (value: AxiosResponse<T, any>) => void;
      try {
        const res = await umiRequest<T>(url, options);
        newResolve(res);
      } catch (error) {
        const { response, config = {} } = error as any;
        const isRefresh =
          response.status === REQUEST_CODE.UNAUTHORIZED &&
          config?.url !== "/auth/refresh";
        if (!isRefresh) return reject(error);
        await RequestConfig.refreshToken();
        const res = await umiRequest(url, options).catch(reject);
        return newResolve(res as AxiosResponse<any, any>);
      }
    });
  }

  // 用刷新token 换取权限token
  static refreshToken = async () => {
    return new Promise((resolve, reject) => {
      const refreshToken = LocalStorage.getLocalStorageItem<string>(
        LOCAL_STORAGE.REFRESH_TOKEN,
      );
      getRefreshToken(`${refreshToken}`)
        .then((res) => {
          LocalStorage.setLocalStorageItem(
            LOCAL_STORAGE.ACCESS_TOKEN,
            res.data?.accessToken,
          );
          LocalStorage.setLocalStorageItem(
            LOCAL_STORAGE.REFRESH_TOKEN,
            res.data?.refreshToken,
          );
          resolve(res);
        })
        .catch((err) => {
          // token令牌校验，如果出现这个返回码则退出登录到登录页面
          Modal.success({
            title: "登录已失效,请重新登录!",
            content: err?.msg,
            onOk: () => {
              // 退出登录返回到登录页
              logoutToLogin();
              Modal.destroyAll();
            },
          });
        });
    });
  };

  static httpRequest = {
    put<T = any>(
      url: string,
      data?: object,
      config?: AxiosRequestConfig,
    ): Promise<Res<T>> {
      return RequestConfig.request(url, { method: "PUT", data, ...config });
    },
    delete<T = any>(
      url: string,
      data?: object,
      config?: AxiosRequestConfig,
    ): Promise<Res<T>> {
      return RequestConfig.request(url, { method: "DELETE", data, ...config });
    },
    get<T = any>(
      url: string,
      data?: object,
      config?: AxiosRequestConfig,
    ): Promise<Res<T>> {
      return RequestConfig.request(url, {
        method: "GET",
        params: data,
        ...config,
      });
    },
    post<T = any>(
      url: string,
      data?: object,
      config?: AxiosRequestConfig,
    ): Promise<Res<T>> {
      return RequestConfig.request(url, { method: "POST", data, ...config });
    },
    patch<T = any>(
      url: string,
      data?: object,
      config?: AxiosRequestConfig,
    ): Promise<Res<T>> {
      return RequestConfig.request(url, { method: "PATCH", data, ...config });
    },
  };
}

export const requestConfig = RequestConfig.getRequestConfig();
Object.entries(RequestConfig.httpRequest).forEach(([k, v]) => {
  (RequestConfig.request as any)[k] = v;
});

export const request = RequestConfig.request as unknown as Request &
  Record<RequestMEthOD, Request>;

export default RequestConfig;
