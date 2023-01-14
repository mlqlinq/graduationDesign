import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist"; // 持久化工具 用户数据缓存，刷新数据不丢失
import App from "./App.vue";
import router from "./router";
// element-plus 注册所有图标
import ElementPlusIconsVue from "@/components/SvgIcon/svgicon";
// 引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
// 注册svg全局
import "virtual:svg-icons-register";
import components from "./assets/icon/index";
import "nprogress/nprogress.css"; // 进度条样式
import "./assets/main.scss";
import "vue-cropper/dist/index.css";
import VueCropper from "vue-cropper"; // 图片裁剪工具
// 创建实例
const app = createApp(App);

// 注册pinia
const store = createPinia();
store.use(piniaPluginPersist);
app.use(store).use(router).use(ElementPlusIconsVue).use(components).use(VueCropper).mount("#app");
