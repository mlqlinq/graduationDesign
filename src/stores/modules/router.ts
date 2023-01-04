import { defineStore } from "pinia";

export const useRouterStore = defineStore("router", {
    state: () => {
        return {
            addrouters: [], // 路由菜单
        };
    },
    getters: {},
    actions: {},
    persist: {
        enabled: true, // 开启数据缓存
    },
});
