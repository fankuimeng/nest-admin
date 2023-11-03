export enum REQUEST_CONFIG {
  BASEURL_API = "/api",
  TIME_OUT = 30 * 1000,
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
 * @description= 存储在 localstorage 的 key
 */
export enum LOCAL_STORAGE {
  USER_INFO = "USER_INFO", // 用户信息
  ACCESS_TOKEN = "ACCESS_TOKEN", // ACCESS_TOKEN
  REFRESH_TOKEN = "REFRESH_TOKEN", // refreshToken
  LAYOUT = "LAYOUT", // 布局
  LOCK_SLEEP = "LOCK_SLEEP", // 睡眠
}

export enum RequestMEthOD {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "get",
}
export enum CODE_MESSAGE {
  "CODE_200" = "服务器成功返回请求的数据。",
  "CODE_201" = "新建或修改数据成功。",
  "CODE_202" = "一个请求已经进入后台排队（异步任务）。",
  "CODE_204" = "删除数据成功。",
  "CODE_400" = "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  "CODE_401" = "用户没有权限（令牌、用户名、密码错误）。",
  "CODE_403" = "用户得到授权，但是访问是被禁止的。",
  "CODE_404" = "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  "CODE_405" = "请求方法不被允许。",
  "CODE_406" = "请求的格式不可得。",
  "CODE_410" = "请求的资源被永久删除，且不会再得到的。",
  "CODE_422" = "当创建一个对象时，发生一个验证错误。",
  "CODE_500" = "服务器发生错误，请检查服务器。",
  "CODE_502" = "网关错误。",
  "CODE_506" = "服务不可用，服务器暂时过载或维护。",
  "CODE_504" = "网关超时。",
  "CODE_FAIL" = "请求出错,请重新尝试",

  "CODE_ERROR" = "请求出错,请重新尝试",
}
