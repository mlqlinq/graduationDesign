import { defineStore } from "pinia";

interface configuration {
	file: string;
	filename: string;
	fileType: string;
	folder: string;
	data: {};
}
export const useRouterStore = defineStore("router", {
	state: () => {
		return {
			addrouters: [], // 路由菜单
			// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
			routerParams: {} as configuration | string | number // 路由参数
		};
	},
	getters: {
		// 通过getters对状态state进行获取
		getRouterparams: (state) => state.routerParams
	},
	actions: {
		handleParams(data) {
			this.routerParams = data;
		}
	},
	persist: {
		enabled: true // 开启数据缓存
	}
});
