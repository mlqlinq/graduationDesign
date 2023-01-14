import { defineStore } from "pinia";

export interface ITabsItem {
	name?: string; // 路由名
	path: string; // 路径
	activePath?: string; // 激活的路由（用于左侧菜单样式）
	title: string; // 路由中文名
	query?: {
		[key: string]: any;
	};
	params?: {
		[key: string]: any;
	};
}

interface IState {
	tabs: ITabsItem[];
}

const NO_PUSH_ROUTES = ["404"];

const HOME_PAGE = {
	name: "index",
	path: "/index",
	title: "首页"
};

export const useTabsStore = defineStore("tabs", {
	state: (): IState => ({
		tabs: JSON.parse(sessionStorage.getItem("tabs") as string) || [HOME_PAGE]
	}),
	actions: {
		// 设置缓存
		setStorage() {
			sessionStorage.setItem("tabs", JSON.stringify(this.tabs));
		},
		// 增加路由
		handleAddRoute(route: any) {
			// 匹配不到路由 则停止执行
			if (NO_PUSH_ROUTES.includes(route.name)) return;
			this.tabs.push({
				name: route.name,
				path: route.path,
				title: route.meta.title
				// activePath: route.meta.activeMenu,
				// query: route.query,
				// params: route.params,
			});
			this.setStorage();
		},
		// 关闭路由
		handleClose(index: number) {
			this.tabs.splice(index, 1);
			// console.log(this.tabs);
			// console.log(this.tabs[this.tabs.length - 1].path);

			this.setStorage();
		},
		// 关闭其他路由
		handleCloseOther(index: number) {
			// 通过传入的下标，保存该路由与首页
			const obj = JSON.parse(JSON.stringify(this.tabs[index]));
			// 判断传入的下标对应的路由信息是否是首页或该路由，
			// 是首页则直接关闭其他，不是首页和该路由，则留下首页和该路由
			this.tabs = obj.name === "index" ? [HOME_PAGE] : [HOME_PAGE, obj];
			sessionStorage.setItem("activePath", this.tabs[this.tabs.length - 1].path);
			this.setStorage();
		},
		// 关闭全部路由
		handleCloseAll() {
			this.tabs.length = 0;
			this.tabs = [HOME_PAGE];
			sessionStorage.setItem("activePath", this.tabs[0].path);
			this.setStorage();
		}
	},
	persist: {
		enabled: true // 开启数据缓存
	}
});
