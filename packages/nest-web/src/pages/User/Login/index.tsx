import { Footer } from "@/components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProFormText,
  useDebounceFn,
} from "@ant-design/pro-components";
import {
  FormattedMessage,
  SelectLang,
  useIntl,
  useModel,
  useRequest,
  history,
} from "@umijs/max";
import { Col, message, Row } from "antd";
import React from "react";
import { flushSync } from "react-dom";
import styles from "./index.module.less"; // css 样式恩建
import { login } from "@/services/user/service";
import {
  LoginParams,
  LoginResultType,
  USERMANAGEMENT,
} from "@/services/user/typeing";
import { LOCAL_STORAGE } from "@/services/global/typeing";
import LocalStorage from "@/utils/storage";
const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel("@@initialState");

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const { run: runLogin, loading: loginLoading } = useRequest(login, {
    manual: true,
    onSuccess: async (data, params) => {
      console.log("🚀 ~ file: index.tsx:43 ~ data:", data);
      const { accessToken, refreshToken } = data || {};
      LocalStorage.setLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
      LocalStorage.setLocalStorageItem(
        LOCAL_STORAGE.REFRESH_TOKEN,
        refreshToken,
      );

      const defaultLoginSuccessMessage = intl.formatMessage({
        id: "pages.login.success",
        defaultMessage: "登录成功！",
      });
      // await setInitialState((s: any) => ({
      //   ...s,
      //   currentUser: data?.userInfo as USERMANAGEMENT,
      // })); // 路由跳转
      message.success(defaultLoginSuccessMessage);
      await fetchUserInfo();
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get("redirect") || "/");
      return;
    },
  });

  /**
   * @description: 登录表单提交
   * @param {LoginParams} values
   */
  const handleSubmit = async (values: LoginParams) => {
    try {
      // 登录
      runLogin({ ...values, type: 1 });
      // const msg = await login({ ...values });
      // if (msg.status === "ok") {
      //   const defaultLoginSuccessMessage = intl.formatMessage({
      //     id: "pages.login.success",
      //     defaultMessage: "登录成功！",
      //   });
      //   message.success(defaultLoginSuccessMessage);
      //   await fetchUserInfo();
      //   const urlParams = new URL(window.location.href).searchParams;
      //   history.push(urlParams.get("redirect") || "/");
      //   return;
      // }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: "pages.login.failure",
        defaultMessage: "登录失败，请重试！",
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const { run: handleLoginSubmit } = useDebounceFn(handleSubmit, 300);

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang reload={false} />}
      </div>
      <Row justify="center" className={styles.content}>
        {/* 左侧背景 */}
        <Col className={styles["login-left"]}>
          <div className={styles["login-bg"]} />
        </Col>
        <Col className={styles["login-form"]}>
          <LoginForm<LoginParams>
            logo={<img alt="logo" src="/logo.svg" />}
            title="Admin"
            submitter={{
              submitButtonProps: {
                loading: loginLoading,
              },
            }}
            subTitle={intl.formatMessage({
              id: "pages.layouts.userLayout.title",
            })}
            initialValues={{
              autoLogin: true,
              name: "admin",
              password: "123456",
            }}
            onFinish={handleLoginSubmit}
          >
            <ProFormText
              name="name"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: "pages.login.username.placeholder",
                defaultMessage: "用户名: admin or user",
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={intl.formatMessage({
                id: "pages.login.password.placeholder",
                defaultMessage: "密码: ant.design",
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </LoginForm>
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default Login;
