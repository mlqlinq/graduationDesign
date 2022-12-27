import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// ElementPlus 按需导入--自动导入--vite配置
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite";
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from "unplugin-vue-components/vite";
//element
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 导入 svg 图标文件依赖
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
// 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
// export default ({ mode }) => defineConfig({
export default defineConfig(({ mode }) => {
    console.log(mode === "development" ? "开发环境 " + mode : "生产环境 " + mode);
    // 获取环境配置文件
    const env = loadEnv(mode, process.cwd());
    const { VITE_BASE_API } = env;
    return {
        base: VITE_BASE_API === "production" ? "/" : "/",
        plugins: [
            vue(),
            //element按需导入
            AutoImport({
                //在ts文件中不用再导入ref，reactive等
                imports: ["vue", "vue-router"],
                resolvers: [
                    ElementPlusResolver({
                        importStyle: mode === "development" ? false : "sass",
                    }),
                ],
            }),
            Components({
                dirs: ["src/components"], // 要导入组件的目录路径
                extensions: ["vue"],
                deep: true, // 搜索子目录
                dts: false, // 不使用ts
                include: [/\.vue$/, /\.vue\?vue/], // 只识别vue文件
                resolvers: [
                    // 使用unplugin-vue-components按需加载样式，开发环境会导致项目异常卡顿
                    // 导致原因：vite会预加载style，当首次启动 vite 服务时会对 style 进行依赖预构建，，因为element-plus的按需样式会导入大量style文件，导致页面会卡住直至style构建完成
                    // https://github.com/antfu/unplugin-vue-components/issues/361
                    //  这里开发环境不按需加载样式，生产环境才按需加载样式
                    ElementPlusResolver({
                        importStyle: mode === "development" ? false : "sass",
                    }),
                ],
            }),
            // 这里自定义一个vite插件，更改src/main.ts内容，开发环境全局引入样式
            {
                name: "import-element-plus-style",
                transform(code, id) {
                    if (/src\/main.ts$/.test(id)) {
                        if (mode === "development") {
                            return {
                                code: `${code};import 'element-plus/dist/index.css';`,
                                map: null,
                            };
                        } else {
                            return {
                                code: `${code};import 'element-plus/theme-chalk/src/message-box.scss';import 'element-plus/theme-chalk/src/message.scss';`,
                                map: null,
                            };
                        }
                    }
                },
            },
            // 引入 svg
            createSvgIconsPlugin({
                iconDirs: [resolve(process.cwd(), "src/assets/icon/svg")],
                symbolId: "icon-[name]",
            }),
        ],
        // @ 的指向，这里设置为 src 目录
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            },
        },
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
                    // target: "http://127.0.0.1:4090",
                    target: loadEnv(mode, process.cwd()).VITE_BASE_API,
                    secure: false, // 如果是https接口，需要配置这个参数
                    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                    rewrite: path => path.replace("/api", ""), // 请求接口的时候把 /api 截掉
                },
            },
        },
        // 强制预构建插件包
        optimizeDeps: {
            include: ["axios"],
        },
        build: {
            // https://blog.csdn.net/lj1530562965/article/details/122231280
            // 混淆器设置,terser构建后文件体积更小
            minify: "terser",
            // 不生成source map文件，默认false
            sourcemap: false,
            // 指定输出路径（相对于项目根目录)，默认dist
            outDir: "dist",
            // 指定生成静态资源的存放路径，默认assets
            assetsDir: "assets",
            // chunk大小警告限制，默认500kbs
            chunkSizeWarningLimit: 1500,
            // 是否禁用css拆分(默认true)，设置false时所有CSS将被提取到一个CSS文件中
            cssCodeSplit: true,
            // 简要配置
            terserOptions: {
                compress: {
                    // 移除console
                    drop_console: true,
                    // 移除debugger
                    drop_debugger: true,
                },
                // 保留类名
                keep_classnames: true,
                format: {
                    // 移除所有的注释
                    comments: false,
                },
            },
            // js、css等文件打包到不同文件夹
            // https://rollupjs.org/guide/en/#outputoptions-object
            /* rollupOptions: {
                    output: {
                        chunkFileNames: "assets/js/[name]-[hash].js",
                        entryFileNames: "assets/js/[name]-[hash].js",
                        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
                    }
                } */
        },
    };
});
