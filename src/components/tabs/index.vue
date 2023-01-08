<template>
	<div class="tabs-box">
		<div class="tabs-menu">
			<el-tabs v-model="tabsMenuValue" type="card" @tab-click="menuClick" @tab-remove="tabRemove">
				<el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.title" :name="item.path" :closable="item.name === 'index' ? false : true">
					<template #label>
						<span @contextmenu.prevent="(e) => handleOpenContext(e, item, index)">
							{{ item.title }}
						</span>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>

	<!-- 右键菜单 -->
	<el-card
		v-if="contentVisible"
		:style="{
			left: `${positionContext.left}px`,
			top: `${positionContext.top}px`
		}"
	>
		<ul class="context-menu">
			<li @click="reR">
				<el-icon :size="18" style="margin-right: 2px">
					<RefreshLeft />
				</el-icon>
				刷新
			</li>
			<li v-if="currentContextIndex !== 0" @click="handleClose(tabs[currentContextIndex], currentContextIndex)">
				<el-icon :size="18" style="margin-right: 2px">
					<Close />
				</el-icon>
				关闭当前
			</li>
			<li @click="handleCloseOther">
				<el-icon :size="18" style="margin-right: 2px">
					<CircleClose />
				</el-icon>
				关闭其他
			</li>
			<li @click="handleCloseAll">
				<el-icon :size="18" style="margin-right: 2px">
					<CircleCloseFilled />
				</el-icon>
				关闭所有
			</li>
		</ul>
	</el-card>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { type ITabsItem, useTabsStore } from "@/stores/modules/tabs";
import { useRoute, useRouter } from "vue-router";
import type { TabPaneName, TabsPaneContext } from "element-plus";

// 注入重载页面事件  刷新
const reloadRefresh: any = inject("reloadRefresh") as Function;
const reload: any = inject("reload") as Function;
const reR = () => {
	reloadRefresh();
	reload();
};

const route = useRoute();
const router = useRouter();
const store = useTabsStore();

const tabsMenuValue = ref(route.fullPath);

const tabs = computed(() => {
	return store.tabs;
});

// 点击事件
const menuClick = (tabItem: TabsPaneContext) => {
	const fullPath = tabItem.props.name as string;
	router.push(fullPath);
	sessionStorage.setItem("activePath", fullPath);
};

// 右键菜单的位置
const positionContext = reactive({
	left: 0,
	top: 0
});

// 监听路由改变 若tabs中不存在当前路由，则增加路由
watch(
	() => [route.path, route.fullPath],
	() => {
		// 获取当前路由所在tabs的下标
		const index = tabs.value.findIndex((item) => {
			return item.name === route.name;
		});
		// 不存在则增加路由到tabs
		index < 0 && store.handleAddRoute(route);

		if (route.meta.noCache) return;
		// 防止浏览器后退/前进不变化
		sessionStorage.setItem("activePath", route.fullPath);
		tabsMenuValue.value = route.fullPath;
	},
	{ deep: true, immediate: true }
);

const currentRouteName = computed(() => {
	return route.name;
});

// 关闭其他
const handleCloseOther = () => {
	// 如果当前路由与右击页签路由不一致，则跳转至右击页签的路由
	if (currentRouteName.value !== tabs.value[currentContextIndex.value].name) {
		router.push({
			name: tabs.value[currentContextIndex.value].name
		});
	}
	store.handleCloseOther(currentContextIndex.value);
};

// 关闭所有
const handleCloseAll = () => {
	router.push("index");
	store.handleCloseAll();
};

// 关闭
const tabRemove = (name: TabPaneName): any => {
	const index = tabs.value.findIndex((item) => item.path === name);
	store.handleClose(index);
	// 如果关闭的是当前路由，则跳转到tabs的最后一个路由
	const isCurrentRoute = name.toLocaleString().replace("/", "") === currentRouteName.value;
	// 如果关闭的是当前路由，isCurrentRoute为true
	isCurrentRoute && router.push({ name: tabs.value[tabs.value.length - 1].name });
	setTimeout(() => {
		sessionStorage.setItem("activePath", tabs.value[tabs.value.length - 1].path);
	}, 100);
};

const handleClose = (item: ITabsItem, index: number) => {
	store.handleClose(index);
	// 如果关闭的是当前路由，则跳转到tabs的最后一个路由
	const isCurrentRoute = item.name === currentRouteName.value;
	// 如果关闭的是当前路由，isCurrentRoute为true
	isCurrentRoute && router.push({ name: tabs.value[tabs.value.length - 1].name });
	setTimeout(() => {
		sessionStorage.setItem("activePath", tabs.value[tabs.value.length - 1].path);
	}, 100);
};

// 控制鼠标右键菜单
const contentVisible = ref(false);

// 右键时对应的横向菜单的下标
const currentContextIndex = ref(0);

// 鼠标右键菜单出现的位置
const handleOpenContext = (e: any, item: ITabsItem, index: number) => {
	currentContextIndex.value = index;
	contentVisible.value = true;

	// 通过事件 e 获取当前鼠标位置
	positionContext.left = e.x;
	positionContext.top = e.y;
};

// 监听鼠标
watch(contentVisible, (val: boolean) => {
	const _fn = () => {
		contentVisible.value = false;
	};
	if (val) {
		window.addEventListener("click", _fn);
	} else {
		window.removeEventListener("click", _fn);
	}
});
</script>

<style lang="scss" scoped>
.tabs-box {
	background-color: #ffffff;
	margin-bottom: 10px;
	:deep(.tabs-menu) {
		position: relative;
		width: 100%;
		.el-dropdown {
			position: absolute;
			top: 8px;
			right: 13px;
		}
		.tabs-icon {
			top: 2px;
			font-size: 15px;
		}
		.el-tabs__nav-wrap {
			position: absolute;
			width: calc(100% - 110px);
		}
		.el-tabs--card > .el-tabs__header {
			box-sizing: border-box;
			height: 40px;
			padding: 0 10px;
			margin: 0;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__nav {
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item {
			color: #cccccc;
			border: none;
		}
		.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
			color: var(--el-color-primary);
			border-bottom: 2px solid var(--el-color-primary);
		}
		.el-tabs__item .is-icon-close svg {
			margin-top: 0.5px;
		}
	}
}
.el-card {
	width: 105px;
	height: auto;
	position: fixed;
	top: 10px;
	z-index: 9999;

	:deep(.el-card__body) {
		padding: 0 !important;

		.context-menu {
			background: #fff;
			z-index: 99999;
			text-align: center;
			padding: 0;
			margin: 10px;

			li {
				height: 30px;
				cursor: pointer;
				line-height: 30px;
				list-style: none;
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			li:hover {
				color: #8fc6ff;
			}
		}
	}
}
</style>
