// import {
//   ElNotification,
//   NotificationParams,
// } from "element-plus/lib/components/notification/index";
import { NotificationParams, ElNotification } from "element-plus";
import "element-plus/theme-chalk/el-notification.css";

export const notification = (
  title?: string,
  message?: string,
  type: string = "success",
  duration: number = 4000
) => {
  return ElNotification({
    title,
    message,
    type,
    duration,
  } as NotificationParams);
};
