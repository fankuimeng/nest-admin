import { GithubOutlined } from "@ant-design/icons";
import { DefaultFooter } from "@ant-design/pro-components";

import styles from "./index.module.less";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: "none" }}
      copyright={`${currentYear} 哈哈哈丶 by 843348394@qq.com`}
      className={styles["global-footer"]}
      links={[
        {
          key: "哈哈哈丶",
          title: "哈哈哈丶",
          href: "https://baiwumm.com/",
          blankTarget: true,
        },
        {
          key: "github",
          title: <GithubOutlined />,
          href: "https://github.com/baiwumm/Xmw-Admin/",
          blankTarget: true,
        },
        {
          key: "Vue3 Admin",
          title: "Vue3 Admin",
          href: "https://github.com/baiwumm/Vue3-Admin/",
          blankTarget: true,
        },
        {
          key: "Vue2 Admin",
          title: "Vue2 Admin",
          href: "https://github.com/baiwumm/Vue2-Admin/",
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
