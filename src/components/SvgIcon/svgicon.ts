import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default {
	install: (app: any) => {
		for (const key in ElementPlusIconsVue) {
			const componentConfig = ElementPlusIconsVue[key];
			app.component(componentConfig.name, componentConfig);
		}
	}
};
