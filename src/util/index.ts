import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import screenfull from "screenfull";
import { useAuthStore, useLayoutStore, useMenuStore, useRouterStore } from "@/stores/index";
import { getMenu } from "@/http/api/indexMenu";

export default () => {
	// 控制菜单展开与收起
	const layoutStore = useLayoutStore();
	const { isCollapse } = storeToRefs(layoutStore);

	const refresh = ref<boolean>(true);

	// 展开全屏
	const full = ref(true);

	// 个人中心下拉动画
	const fullSvg = ref<boolean>(true);

	// 菜单列表
	interface menuStructure {
		menu_id: number;
		parent_id?: number;
		menu_name: string;
		path: string;
		status: string;
		orderNum: number;
		alwaysShow: string;
		component: string;
		meta: {
			title: string;
			icon: string;
			noCache: number;
			link: string;
		};
		children?: menuStructure[] | any;
	}

	const allMenu = ref<menuStructure[]>();
	const useMenu = useMenuStore();
	const { menuAll: menus } = storeToRefs(useMenu);

	// 被激活的连接地址
	const activePath = ref<any>("/index");

	// 路由跳转
	const router = useRouter();

	// 路由路径
	const route: any = useRoute();
	const breadcrumbList = ref([]);

	const viewKey = computed(() => {
		return route.path || Date.now();
	});

	// 动态路由
	const addrou: any = ref([]);
	const addRouterList = useRouterStore();
	const { addrouters: routerList }: any = storeToRefs(addRouterList);

	// 注入重载页面事件
	const reload: any = inject("reload");

	const useAuths: any = useAuthStore();
	// 获取用户名 username
	const { userData } = storeToRefs(useAuths);

	// 获取所有自定义的svg图标的名称
	const files = import.meta.glob("../assets/icon/svg/*.svg");
	// 存储所有自定义的svg图标的名称
	const el: any = [];
	for (const key in files) {
		if (Object.prototype.hasOwnProperty.call(files, key)) {
			el.push(key.replace("../assets/icon/svg/", "").replace(".svg", ""));
		}
	}

	// 声明 reloadRefresh 方法
	const reloadRefresh = () => {
		refresh.value = false;
		nextTick(() => {
			refresh.value = true;
		});
	};

	// 提供
	provide("reloadRefresh", reloadRefresh);

	onMounted(() => {
		const rou = sessionStorage.getItem("activePath");
		if (rou === null) {
			activePath.value = "/index";
			saveNavSate(activePath.value);
		} else {
			activePath.value = rou;
			saveNavSate(activePath.value);
		}
		initBreadcrumbList();
	});

	// 控制菜单展开与收起
	const openMenu = () => {
		layoutStore.collapse();
	};

	// 控制 全屏
	const toggleScreen = () => {
		full.value = !full.value;
		screenfull.toggle();
	};

	// 控制三角动画
	const handleClick = () => {
		fullSvg.value = !fullSvg.value;
	};

	// 从后台返回的菜单数组中，筛选符合当前用户权限的菜单
	const menuOperation = (menuArr) => {
		const ne: any = [];
		if (menuArr) {
			for (let n = 0; n < menuArr.length; n++) {
				if (menuArr[n].alwaysShow === "0") {
					ne.push(JSON.parse(JSON.stringify(menuArr[n])));
				}
			}
			ne.forEach((e) => {
				if (e.children.length > 0) {
					const ind = e.children.findIndex((item) => item.alwaysShow !== "0");
					if (ind !== -1) {
						e.children.splice(ind, 1);
					}
				}
			});
		}
		return ne;
	};

	// 请求后台获取菜单列表
	const getAllMenu = async () => {
		await getMenu()
			.then((res) => {
				const menuArr: any = res.data;
				//  menuOperation(menuArr) 返回值赋值给菜单列表
				allMenu.value = menuOperation(menuArr);
				menus.value = res.data;
				if (menus.value) {
					// for循环删除不必要的属性
					for (let i = 0; i < menus.value.length; i++) {
						addrou.value.push(JSON.parse(JSON.stringify(menus.value[i])));
						addrou.value[i].meta.noCache = !!0;
						delete addrou.value[i].createTime;
						delete addrou.value[i].updateTime;
						delete addrou.value[i].menuType;
						delete addrou.value[i].menu_id;
						delete addrou.value[i].parent_id;
						delete addrou.value[i].status;
						delete addrou.value[i].orderNum;
						if (addrou.value[i].children.length > 0) {
							for (let j = 0; j < addrou.value[i].children.length; j++) {
								addrou.value[i].children[j].meta.noCache = !!0;
								delete addrou.value[i].children[j].createTime;
								delete addrou.value[i].children[j].updateTime;
								delete addrou.value[i].children[j].menuType;
								delete addrou.value[i].children[j].menu_id;
								delete addrou.value[i].children[j].parent_id;
								delete addrou.value[i].children[j].status;
								delete addrou.value[i].children[j].orderNum;
							}
						}
					}
				}
				routerList.value = [];
				routerList.value = addrou.value;
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// // 保存连接的激活状态
	const saveNavSate = (path) => {
		if (path === undefined) return;
		sessionStorage.setItem("activePath", path);
		activePath.value = sessionStorage.getItem("activePath");
	};

	// 个人中心
	const personalCenter = () => {
		router.push("/personalCenter");
		saveNavSate("/personalCenter");
	};

	// 退出登录
	const loginOut = () => {
		ElMessageBox.confirm("确定要退出登录吗?", "提醒", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(() => {
				router.push("/");
				ElMessage({
					type: "success",
					message: "退出成功"
				});
				// 清空pinia中的数据，让页面重新加载
				// window.location.reload();
				sessionStorage.clear();
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消退出"
				});
			});
	};

	const handleMenu = (i: string) => {
		console.log("i", i);
	};

	// 点击跳转至首页
	const goIndex = () => {
		router.push("/index");
		saveNavSate("/index");
		initBreadcrumbList();
		reload();
	};

	const initBreadcrumbList = () => {
		const arr: any = [];
		setTimeout(() => {
			const result: any | null = route.matched.find((v) => {
				return v.path === sessionStorage.getItem("activePath");
			});
			if (routerList.value !== undefined && result !== undefined) {
				for (let i = 0; i < routerList.value.length; i++) {
					for (let j = 0; j < routerList.value[i].children.length; j++) {
						if (result.path === routerList.value[i].children[j].path) {
							arr.push(routerList.value[i].meta.title);
							arr.push(routerList.value[i].children[j].meta.title);
						}
					}
				}
			}
			if (arr.length === 0) {
				arr.push(result?.meta.title);
			}
			breadcrumbList.value = arr;
			activePath.value = sessionStorage.getItem("activePath");
		}, 100); // 延迟执行，防止网络等问题照成routerList为空
	};

	// 监听路由的变化
	watch(
		() => [route.path, route.name, activePath.value, sessionStorage.getItem("activePath")],
		() => {
			initBreadcrumbList();
		},
		{ deep: true }
	);

	getAllMenu();

	return {
		isCollapse,
		full,
		userData,
		allMenu,
		activePath,
		fullSvg,
		breadcrumbList,
		viewKey,
		el,
		refresh,
		handleClick,
		loginOut,
		personalCenter,
		openMenu,
		toggleScreen,
		saveNavSate,
		goIndex,
		handleMenu,
		reload
	};
};
