/**
 * createRouter 这个为创建路由的方法 *
 * createWebHashHistory 这个就是vue2中路由的模式， *
 * 这里的是hash模式，这个还可以是createWebHistory等 *
 * RouteRecordRaw 这个为要添加的路由记录，也可以说是routes的ts类型
 * */
import { useRouterStore } from "@/stores/modules/router"

import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

import { ElMessage } from "element-plus"
import NProgress from "nprogress" // 导入全局进度条
import { storeToRefs } from "pinia"

// 公共路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    redirect: "/index", // 重定向
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/home/homeIndex.vue"),
        meta: { arr: ["首页"] },
      },
      // {
      //   path: "/userManagement",
      //   name: "userManagement",
      //   component: () => import("@/views/system/user/userManagement.vue"),
      //   meta: { arr: ["系统管理", "用户管理"] },
      // },
      // {
      //   path: "/menuManagement",
      //   name: "menuManagement",
      //   component: () => import("@/views/system/menu/menuManagement.vue"),
      //   meta: { arr: ["系统管理", "菜单管理"] },
      // },
      // {
      //   path: "/districtScho",
      //   name: "districtScho",
      //   component: () => import("@/views/Scholarship/districtScho.vue"),
      //   meta: { arr: ["奖学金申请", "区奖学金"] },
      // },
      // {
      //   path: "/nationalScho",
      //   name: "nationalScho",
      //   component: () => import("@/views/Scholarship/nationalScho.vue"),
      //   meta: { arr: ["奖学金申请", "国家奖学金"] },
      // },
      // {
      //   path: "/universityScho",
      //   name: "universityScho",
      //   component: () => import("@/views/Scholarship/universityScho.vue"),
      //   meta: { arr: ["奖学金申请", "校奖学金"] },
      // },
      // {
      //   path: "/jobRecruitment",
      //   name: "jobRecruitment",
      //   component: () => import("@/views/workStudy/jobRecruitment.vue"),
      //   meta: { arr: ["勤工助学管理", "岗位招聘"] },
      // },
      // {
      //   path: "/postManagement",
      //   name: "postManagement",
      //   component: () => import("@/views/workStudy/postManagement.vue"),
      //   meta: { arr: ["勤工助学管理", "岗位管理"] },
      // },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "/401",
    component: () => import("@/views/error/401.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

//定义变量判断是否已经动态添加过，如果刷新后load永远为 0
let load = 0

/**
 * 挂载路由导航守卫
 * @param {Object} to 即将要进入的目标 路由对象
 * @param {Object} from 当前导航正要离开的路由
 * @param {Function} next 一定要调用该方法来 resolve 这个钩子。
 */
router.beforeEach((to, from, next) => {
  //每次切换页面时，调用进度条
  NProgress.start()

  // 获取token
  const tokenStr = sessionStorage.getItem("token")

  // pinia如果放在外面会报错
  const store = useRouterStore()
  // 获取路由菜单
  const { addrouters } = store

  // vue3-vite动态路由导入组件不能使用模板字符串的问题
  const modules = import.meta.glob("../views/**/**.vue")

  if (to.path === "/") return next()

  if (!tokenStr) {
    ElMessage.error("登录已过期，请重新登录！")
    return next("/")
  } else if (load === 0 && addrouters.length && to.name !== "login") {
    // 非登录、有菜单数据、 没有进行添加（或者刷新了）
    addrouters.forEach((navigation) => {
      if (navigation.children) {
        navigation.children.forEach((item) => {
          router.addRoute("home", {
            path: `${item.path}`,
            meta: {
              icon: item.meta.icon,
              noCache: item.meta.noCache,
              title: item.meta.title,
            },
            name: item.title,
            component: modules[`../views/${item.component}.vue`],
          })
        })
      }
    })

    router.addRoute({
      path: "/:pathMatch(.*)*", // 捕获所有路由或 404 Not found 路由
      component: () => import("@/views/error/404.vue"),
    })

    load++

    // 添加后跳转到应访问的地址
    return next({ path: to.path })
  }
  // console.log(router.getRoutes(), "查看现有路由")
  next()
})

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})

export default router
