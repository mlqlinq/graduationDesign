import type { App } from "vue";
import SvgIcon from "../../components/SvgIcon/index.vue";

export default {
  install(Vue: App) {
    Vue.component("SvgIcon", SvgIcon);
  },
};
