// store/modules/layout.ts

import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {
    state: () => {
        return {
            isCollapse: false, // 菜单的收缩
        };
    },
    getters: {},
    actions: {
        collapse() {
            this.isCollapse = !this.isCollapse;
        },
    },
    persist: {
        enabled: true, // 开启数据缓存
    },
});
