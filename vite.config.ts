import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// ElementPlus 按需导入--自动导入--vite配置
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 导入 svg 图标文件依赖
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 引入 svg
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icon/svg")],
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  base: "./", // 打包路径
  // 配置前端服务地址和端口
  server: {
    host: "0.0.0.0",
    port: 3060, // 服务端口号
    open: false, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    https: false, // 是否开启 https
    // 设置代理，根据我们项目实际情况配置
    // /api 开头的全部使用代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4090",
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        rewrite: (path) => path.replace("/api", ""),
      },
    },
  },
});
