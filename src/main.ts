import { createApp } from "vue";

import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; // 持久化工具 用户数据缓存，刷新数据不丢失

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

// element-plus 注册所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

// 注册svg全局
import "virtual:svg-icons-register";
import components from "./assets/icon/index";

//创建实例
const app = createApp(App);

// 注册pinia
const store = createPinia();
store.use(piniaPluginPersist);
// app.use(createPinia());
app.use(store);

// 注册路由
app.use(router);

//全局注册elementplus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(components);

// 挂载实例
app.mount("#app");
