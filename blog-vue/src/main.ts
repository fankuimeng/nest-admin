import { createApp, Directive } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import pinia from "./store/index";
import "@/assets/styles/index.scss";
import "@/assets/fonts/font.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 图片懒加载
import lazyPlugin from "vue3-lazy";
import loading from "./assets/images/loading.gif";
import error from "./assets/images/404.gif";
// svg图标
import "virtual:svg-icons-register";
// 自定义指令
import * as directive from "@/directive";
// 编辑器
// import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import Prism from "prismjs";
// 图片预览
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";

const app = createApp(App);
app.use(router);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(lazyPlugin, {
  loading,
  error,
});
Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});
VMdPreview.use(vuepressTheme, {
  Prism,
}).use(createTodoListPlugin());
// .use(createKatexPlugin());
app.use(VMdPreview);
app.use(Viewer);
app.mount(`#app`);
