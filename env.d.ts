/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
	VITE_TITLE: string;
	VITE_NODE_ENV: string;
	VITE_BASE_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv; // 定义提示信息 数据是只读的无法被修改
}
