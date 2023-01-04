import { defineStore } from "pinia";

interface menuStructure {
    menu_id: number;
    parent_id?: number;
    menu_name: string;
    component: string;
    path: string;
    status: string;
    orderNum: number;
    alwaysShow: string;
    meta: {
        title: string;
        icon: string;
        noCache: number;
        link: string;
    };
    children?: menuStructure[];
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
