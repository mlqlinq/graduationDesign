<template>
  <el-container class="layout-container-demo">
    <!-- 菜单区域 -->
    <el-aside :width="isCollapse ? '64px' : '233px'">
      <el-scrollbar>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          unique-opened
          :router="true"
          :collapse-transition="false"
          :default-active="activePath"
        >
          <el-menu-item index="/index" @click="saveNavSate('/index')">
            <SvgIcon
              :class="!isCollapse ? 'menu_icon' : ' menu_icon_full'"
              :size="22"
              icon-name="homePage"
            />
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu
            popper-class="ziMenu"
            v-for="item in allMenu"
            :key="item.menu_id"
            :index="item.path"
          >
            <template #title>
              <SvgIcon
                :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'"
                :size="22"
                :icon-name="item.meta.icon"
              />
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="item2 in item.children"
                :key="item2.menu_id"
                :index="item2.path"
                @click="saveNavSate(item2.path)"
                ><SvgIcon
                  class="menu_icon meni"
                  :size="22"
                  :icon-name="item2.meta.icon"
                />{{ item2.meta.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- 头部 -->
    <el-container>
      <el-header>
        <!-- 展开和收起菜单 -->
        <span class="collapse_menu">
          <el-icon
            size="24"
            color="#5a5e66"
            style="cursor: pointer"
            @click="openMenu"
          >
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
        </span>
        <span class="heard_bread">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbList"
              :key="index"
              >{{ item }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </span>
        <!-- <span class="header_title">家庭经济困难学生奖助学金综合管理系统</span> -->
        <span class="user_set">
          <!-- 搜索框 -->
          <span class="search mag">
            <input
              class="search_inp"
              v-model="searchctx"
              type="text"
              maxlength="8"
              placeholder="搜索从这里开始..."
            />
            <el-icon class="search_circle" color="#5a5e66" @click="searchClose">
              <CircleClose />
            </el-icon>
            <el-button class="Search_btn" circle @click="getSearch">
              <template #icon>
                <SvgIcon :size="30" color="#5a5e66" icon-name="searchIcon" />
              </template>
            </el-button>
          </span>

          <!-- 全屏按钮 -->
          <span class="full_screen mag">
            <SvgIcon
              :size="27"
              color="#5a5e66"
              :icon-name="full ? 'fullScreen' : 'cancelFullScreen'"
              @click="toggleScreen"
            />
          </span>
          <!-- 用户 -->
          <span class="full_user mag">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar shape="square"> user </el-avatar>
                <SvgIcon
                  style="color: #c0c4cc"
                  :size="18"
                  color="#5a5e66"
                  icon-name="drapDown"
                />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="loginOut"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </span>
      </el-header>

      <!-- 主题内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import index from "@/util/index";
const {
  isCollapse,
  searchctx,
  full,
  openMenu,
  getSearch,
  searchClose,
  toggleScreen,
  allMenu,
  activePath,
  saveNavSate,
  loginOut,
  breadcrumbList,
} = index();
</script>

<style lang="scss" src="../assets/css/layout.scss" scoped></style>
