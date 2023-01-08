<template>
	<router-view v-if="isRouterAlive"></router-view>
</template>
<script lang="ts" setup>
import { watchEffect } from "vue"; // watchEffect一进来就触发
import { useAuthStore } from "@/stores/index";

// 控制router-view的显示或隐藏，从而控制页面的再次加载
const isRouterAlive = ref<boolean>(true);

const store = useAuthStore();

// 声明 reload方法
const reload = () => {
	isRouterAlive.value = false;
	nextTick(() => {
		isRouterAlive.value = true;
	});
};

// 提供
provide("reload", reload);

// 页面刷新，pinia中存储的状态依然存在
watchEffect(() => {
	// watchEffect页面一刷新，方法立即被调用
	if (sessionStorage.token) {
		// 为了防止页面刷新之后，通过store存储的token内容会丢失，我们需要在App组件中，也进行存储
		store.setAuth(!!sessionStorage.token);
		store.setUser(sessionStorage.token);
	}
});
</script>

<style lang="scss">
html,
body,
#app {
	height: 100%;
	width: 100%;
	margin: 0;
	padding: 0;
	min-width: 1366px;
	background-color: #f6f8f9;

	#nprogress .bar {
		background: rgb(32, 203, 126) !important; // 进度条自定义颜色
	}
}
</style>
