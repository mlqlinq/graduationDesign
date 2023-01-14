<template>
	<div>
		<el-card>
			<div ref="container" id="container"></div>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { dataURLToBase64, exportWord, blob } from "@/util/tool/exportWord";
import { renderAsync } from "docx-preview"; // 引入异步渲染方法
import { useRouterStore } from "@/stores/modules/router";

const store = useRouterStore();
const config = store.getRouterparams;

const container: any = ref(null);
const filechange = (event) => {
	if (event === null)
		return ElNotification({
			title: "提示~",
			message: "请重新选择要打印的表！",
			type: "warning"
		});

	// document.getElementById("container") as HTMLElement
	renderAsync(event, container.value, null as unknown as HTMLElement, {
		className: "docx", // 默认和文档样式类的类名/前缀
		inWrapper: true, // 启用围绕文档内容渲染包装器
		ignoreWidth: false, // 禁止页面渲染宽度
		ignoreHeight: false, // 禁止页面渲染高度
		ignoreFonts: false, // 禁止字体渲染
		breakPages: true, // 在分页符上启用分页
		ignoreLastRenderedPageBreak: true, //禁用lastRenderedPageBreak元素的分页
		experimental: false, // 启用实验性功能（制表符停止计算）
		trimXmlDeclaration: true, // 如果为真，xml声明将在解析之前从xml文档中删除
		debug: false // 启用额外的日志记录
	});
};

onMounted(() => {
	exportWord(config);
	setTimeout(() => {
		filechange(blob.value);
	}, 100);
});
</script>

<style lang="scss" scoped></style>
