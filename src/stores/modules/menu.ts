import { defineStore } from "pinia";
interface ziMenuStructure {
  menu_id: number;
  name: string;
  path: string;
  alwaysShow: number;
  component: string;
  meta: {
    title: string;
    icon: string;
    noCache: number;
    link: string;
  };
}
interface menuStructure {
  menu_id: number;
  menu_name: string;
  path: string;
  alwaysShow: number;
  meta: {
    title: string;
    icon: string;
    noCache: number;
    link: string;
  };
  children: Array<ziMenuStructure>;
}
export const useMenuStore = defineStore("menu", {
  state: () => {
    return {
      menuAll: new Array<menuStructure>(), // 菜单
    };
  },
  getters: {
    getMenu: (state) => state.menuAll,
  },
  actions: {
    setMenu(menuAll) {
      this.menuAll = menuAll;
    },
  },
  persist: {
    enabled: true, // 开启数据缓存
  },
});
