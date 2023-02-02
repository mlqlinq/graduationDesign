/**
 * createRouter 这个为创建路由的方法 *
 * createWebHashHistory 这个就是vue2中路由的模式， *
 * 这里的是hash模式，这个还可以是createWebHistory等 *
 * RouteRecordRaw 这个为要添加的路由记录，也可以说是routes的ts类型
 * */
import { useRouterStore } from "@/stores/modules/router";

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { ElMessage } from "element-plus";
import NProgress from "nprogress"; // 导入全局进度条

// 公共路由
export const constantRoutes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "login",
		component: async () => await import("@/views/login.vue")
	},
	{
		path: "/home:",
		name: "home",
		redirect: "/index", // 重定向
		component: async () => await import("@/views/index.vue"),
		children: [
			{
				path: "/index",
				name: "index",
				component: async () => await import("@/views/home/homeIndex.vue"),
				meta: { title: "首页" }
			},
			{
				path: "/filePreview",
				name: "filePreview",
				component: async () => await import("@/views/system/filePreview/filePreview.vue"),
				meta: { title: "文件预览", noCache: true }
			}
		]
	},
	{
		path: "/404",
		name: "404",
		component: async () => await import("@/views/error/404.vue")
	},
	{
		path: "/401",
		name: "401",
		component: async () => await import("@/views/error/401.vue")
	}
];

const router = createRouter({
	scrollBehavior: () => ({ left: 0, top: 0 }),
	history: createWebHistory(),
	routes: constantRoutes
});

// 定义变量判断是否已经动态添加过，如果刷新后load永远为 0
let load = 0;

/**
 * 挂载路由导航守卫
 * @param {Object} to 即将要进入的目标 路由对象
 * @param {Object} from 当前导航正要离开的路由
 * @param {Function} next 一定要调用该方法来 resolve 这个钩子。
 */
router.beforeEach((to, from, next) => {
	// 每次切换页面时，调用进度条
	NProgress.start();

	// 获取token
	const tokenStr = sessionStorage.getItem("token");

	// pinia如果放在外面会报错
	const store = useRouterStore();
	// 获取路由菜单
	const { addrouters } = store;

	// vue3-vite动态路由导入组件不能使用模板字符串的问题
	const modules = import.meta.glob("../views/**/**.vue");
	if (to.path === "/") return next();

	if (!tokenStr) {
		ElMessage.error("登录已过期，请重新登录！");
		return next("/");
	} else if (load === 0 && addrouters.length > 0 && to.name !== "login") {
		// 非登录、有菜单数据、 没有进行添加（或者刷新了）
		addrouters.forEach((navigation: any) => {
			if (navigation.children) {
				navigation.children.forEach((item) => {
					if (item.path === "/fillInTheApplication") {
						router.addRoute("home", {
							path: `${item.path}/:Num?`,
							meta: {
								icon: item.meta.icon,
								noCache: item.meta.noCache,
								title: item.meta.title
							},
							name: item.name,
							component: modules[`../views/${item.component}.vue`],
							props: true
						});
					}
					router.addRoute("home", {
						path: `${item.path}`,
						meta: {
							icon: item.meta.icon,
							noCache: item.meta.noCache,
							title: item.meta.title
						},
						name: item.name,
						component: modules[`../views/${item.component}.vue`]
					});
				});
			}
		});

		router.addRoute({
			path: "/:pathMatch(.*)*", // 捕获所有路由或 404 Not found 路由
			component: async () => await import("@/views/error/404.vue")
		});

		load++;

		// 添加后跳转到应访问的地址
		return next({ path: to.fullPath, replace: true });
	}
	// console.log(router.getRoutes(), "查看现有路由");
	// 增加以下代码，判断是否存在临时路由，存在则删除
	if (router.hasRoute("TempRoute")) {
		router.removeRoute("TempRoute");
	}
	next();
});

router.afterEach(() => {
	// 在即将进入新的页面组件前，关闭掉进度条
	NProgress.done();
});

export default router;
