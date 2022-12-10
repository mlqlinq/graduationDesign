/**
 * createRouter 这个为创建路由的方法 *
 * createWebHashHistory 这个就是vue2中路由的模式， *
 * 这里的是hash模式，这个还可以是createWebHistory等 *
 * RouteRecordRaw 这个为要添加的路由记录，也可以说是routes的ts类型
 * */

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import { ElMessage } from "element-plus";

// 公共路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/home",
    name: "Layout",
    redirect: "/index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/home/homeIndex.vue"),
        meta: { arr: ["首页"] },
      },
      {
        path: "/userManagement",
        name: "userManagement",
        component: () => import("@/views/system/user/userManagement.vue"),
        meta: { arr: ["系统管理", "用户管理"] },
      },
      {
        path: "/menuManagement",
        name: "menuManagement",
        component: () => import("@/views/system/menu/menuManagement.vue"),
        meta: { arr: ["系统管理", "菜单管理"] },
      },
      {
        path: "/districtScho",
        name: "districtScho",
        component: () => import("@/views/Scholarship/districtScho.vue"),
        meta: { arr: ["奖学金申请", "区奖学金"] },
      },
      {
        path: "/nationalScho",
        name: "nationalScho",
        component: () => import("@/views/Scholarship/nationalScho.vue"),
        meta: { arr: ["奖学金申请", "国家奖学金"] },
      },
      {
        path: "/universityScho",
        name: "universityScho",
        component: () => import("@/views/Scholarship/universityScho.vue"),
        meta: { arr: ["奖学金申请", "校奖学金"] },
      },
      {
        path: "/jobRecruitment",
        name: "jobRecruitment",
        component: () => import("@/views/workStudy/jobRecruitment.vue"),
        meta: { arr: ["勤工助学管理", "岗位招聘"] },
      },
      {
        path: "/postManagement",
        name: "postManagement",
        component: () => import("@/views/workStudy/postManagement.vue"),
        meta: { arr: ["勤工助学管理", "岗位管理"] },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/") return next();
  // 获取token
  const tokenStr = sessionStorage.getItem("token");
  if (!tokenStr) {
    ElMessage.error("登录已过期，请重新登录！");
    return next("/");
  }
  next();
});

export default router;
