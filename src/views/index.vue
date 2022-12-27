<template>
    <el-container class="layout-container-demo">
        <!-- 菜单区域 -->
        <el-aside :width="isCollapse ? '64px' : '233px'">
            <el-scrollbar>
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened :router="true" :collapse-transition="false" :default-active="activePath">
                    <el-menu-item index="/index" @click="saveNavSate('/index')">
                        <SvgIcon :class="!isCollapse ? 'menu_icon' : ' menu_icon_full'" :size="22" icon-name="homePage" />
                        <span>首页</span>
                    </el-menu-item>
                    <template v-for="item in allMenu" :key="item.menu_id">
                        <el-sub-menu popper-class="ziMenu" v-if="item.children && item.children.length" :index="item.path">
                            <template #title>
                                <SvgIcon :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'" :size="22" :icon-name="item.meta.icon" />
                                <span>{{ item.meta.title }}</span>
                            </template>
                            <el-menu-item v-for="item2 in item.children" :key="item2.menu_id" :index="item2.path" @click="saveNavSate(item2.path)">
                                <SvgIcon class="menu_icon meni" :size="22" :icon-name="item2.meta.icon" />
                                {{ item2.meta.title }}
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item v-else>
                            <SvgIcon :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'" :size="22" :icon-name="item.meta.icon" />

                            <span>{{ item.meta.title }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <!-- 头部 -->
        <el-container>
            <el-header>
                <!-- 展开和收起菜单 -->
                <span class="collapse_menu">
                    <el-icon size="24" color="#5a5e66" style="cursor: pointer" @click="openMenu">
                        <Fold v-if="!isCollapse" />
                        <Expand v-else />
                    </el-icon>
                </span>
                <span class="heard_bread">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
                            {{ item }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </span>
                <!-- <span class="header_title">家庭经济困难学生奖助学金综合管理系统</span> -->
                <span class="user_set">
                    <!-- 全屏按钮 -->
                    <span class="full_screen mag">
                        <SvgIcon :size="27" color="#5a5e66" :icon-name="full ? 'fullScreen' : 'cancelFullScreen'" @click="toggleScreen" />
                    </span>
                    <!-- 用户 -->
                    <span class="full_user mag">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <el-avatar icon="UserFilled"></el-avatar>
                                <SvgIcon style="color: #c0c4cc" :size="18" color="#5a5e66" icon-name="drapDown" />
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="personalCenter"> 个人中心 </el-dropdown-item>
                                    <el-dropdown-item @click="loginOut"> 退出登录 </el-dropdown-item>
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
const { isCollapse, full, openMenu, toggleScreen, allMenu, activePath, personalCenter, saveNavSate, loginOut, breadcrumbList } = index();
</script>

<style lang="scss" scoped>
.layout-container-demo {
    height: 100%;

    .el-header {
        height: 60px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        background-color: rgb(171 171 171 / 59%);
        color: #f9f0da !important;
        position: relative;
        padding-right: 8px;

        .collapse_menu {
            width: 2%;
            display: inline-block;
            text-align: left !important;
        }

        .heard_bread {
            position: fixed;
            margin-left: 40px;
            color: #f9f0da;
        }

        .header_title {
            font-size: 25px;
            display: inline-block;
        }

        .mag {
            margin: 0 7px;
        }

        .user_set {
            display: flex;
            align-items: center;
        }

        .full_screen {
            cursor: pointer;
        }

        .full_user {
            cursor: pointer;

            .el-dropdown-link {
                display: flex;
                align-items: flex-end;
            }
        }
    }

    .el-aside {
        color: var(--el-text-color-primary);
        // background: var(--el-color-primary-light-8);
        background: none;
        transition: all 1ms;
        -webkit-transition: width 0.5s;
        -moz-transition: width 0.5s;
        -webkit-transition: width 0.5s;
        -o-transition: width 0.5s;

        .scrollbar_headerTitle {
            display: flex;
            font-size: 20px;
            text-align: center;
            font-weight: bold;
            font-family: fantasy;
            line-height: 29px;
            padding: 14px 22px;
            justify-content: center;
            align-items: center;
        }

        ::v-deep(.el-scrollbar__view) {
            height: 100%;
        }
    }

    .el-main {
        padding: 0;
        margin-top: 10px;
        height: calc(100vh - 70px); // 设置主体 main 高度
    }

    .el-menu {
        border-right: none;
        height: 100%;
        transition: all 10ms;

        .menu_icon {
            vertical-align: middle;
            margin-right: 13px;
            margin-left: 10px;
            width: var(--el-menu-icon-width);
            text-align: center;
        }
        .menu_icon_full {
            vertical-align: middle;
            width: var(--el-menu-icon-width);
            text-align: center;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 233px;
    }
}
</style>
