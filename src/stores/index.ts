// store/index.ts

import type { App } from "vue";
import { createPinia } from "pinia";

const pinia = createPinia();

export function setupStore(app: App) {
  app.use(pinia);
}

export * from "./modules/layout";
export * from "./modules/userToken";
export * from "./modules/menu";
