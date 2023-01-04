<template>
    <el-scrollbar id="scrollBar" ref="scrollContainer" class="margin-top-10 scroll-container">
        <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: currentRouteName === item.name }"
            @click="menuClick(item, index)"
            @contextmenu.prevent="(e) => handleOpenContext(e, item, index)"
        >
            <router-link
                :to="{
                    name: item.name,
                }"
                >{{ item.title }}</router-link
            >
            <el-icon v-if="item.name !== 'index'" class="el-icon-close" @click="handleClose(item, index)"> <CircleClose /> </el-icon>
            <!--            <close  style="width: 1em; height: 1em; vertical-align: middle" />-->
        </span>
    </el-scrollbar>
    <el-card
        v-if="contentVisible"
        :style="{
            left: `${positionContext.left}px`,
            top: `${positionContext.top}px`,
        }"
    >
        <ul class="context-menu">
            <li v-if="currentContextIndex !== 0" @click="handleClose(tabs[currentContextIndex], currentContextIndex)">
                <el-icon :size="18" style="margin-right: 2px"> <Close /> </el-icon>关闭当前
            </li>
            <li @click="handleCloseOther">
                <el-icon :size="18" style="margin-right: 2px"> <CircleClose /> </el-icon>关闭其他
            </li>
            <li @click="handleCloseAll">
                <el-icon :size="18" style="margin-right: 2px"> <CircleCloseFilled /> </el-icon>关闭所有
            </li>
        </ul>
    </el-card>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { type ITabsItem, useTabsStore } from "@/stores/modules/tabs";
import { useRoute, useRouter } from "vue-router";
import { ElScrollbar } from "element-plus";

const route = useRoute();
const router = useRouter();
const store = useTabsStore();
const tabs = computed(() => {
    return store.tabs;
});

// 点击事件
const menuClick = (item: { path: string }, index: any) => {
    sessionStorage.setItem("activePath", item.path);
};

// 右键菜单的位置
const positionContext = reactive({
    left: 0,
    top: 0,
});

// 监听路由改变 若tabs中不存在当前路由，则增加路由
watch(
    () => route.path,
    () => {
        // 获取当前路由所在tabs的下标
        const index = tabs.value.findIndex((item) => {
            return item.name === route.name;
        });
        // 不存在则增加路由到tabs
        index < 0 && store.handleAddRoute(route);
    },
    { deep: true, immediate: true }
);

const currentRouteName = computed(() => {
    return route.name;
});

// 关闭其他
const handleCloseOther = () => {
    // 如果当前路由与右击页签路由不一致，则跳转至右击页签的路由
    if (currentRouteName.value !== tabs.value[currentContextIndex.value].name) {
        router.push({
            name: tabs.value[currentContextIndex.value].name,
        });
    }
    store.handleCloseOther(currentContextIndex.value);
};

// 关闭所有
const handleCloseAll = () => {
    router.push("index");
    store.handleCloseAll();
};

// 关闭
const handleClose = (item: ITabsItem, index: number) => {
    store.handleClose(index);
    // 如果关闭的是当前路由，则跳转到tabs的最后一个路由
    const isCurrentRoute = item.name === currentRouteName.value;
    isCurrentRoute && router.push({ name: tabs.value[tabs.value.length - 1].name });
};

const scrollContainer = ref<InstanceType<typeof ElScrollbar> | any>();

// 控制鼠标右键菜单
const contentVisible = ref(false);

// 右键时对应的横向菜单的下标
const currentContextIndex = ref(0);

// 鼠标右键菜单出现的位置
const handleOpenContext = (e: any, item: ITabsItem, index: number) => {
    currentContextIndex.value = index;
    contentVisible.value = true;

    // 通过事件 e 获取当前鼠标位置
    positionContext.left = e.x;
    positionContext.top = e.y;
};

// 监听鼠标
watch(contentVisible, (val: boolean) => {
    const _fn = () => {
        contentVisible.value = false;
    };
    if (val) {
        window.addEventListener("click", _fn);
    } else {
        window.removeEventListener("click", _fn);
    }
});
</script>

<style lang="scss" scoped>
.el-card {
    width: 105px;
    height: auto;
    position: fixed;
    top: 10px;
    z-index: 9999;

    :deep(.el-card__body) {
        padding: 0 !important;

        .context-menu {
            background: #fff;
            z-index: 99999;
            text-align: center;
            padding: 0;
            margin: 10px;

            li {
                height: 30px;
                cursor: pointer;
                line-height: 30px;
                list-style: none;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            li:hover {
                color: #8fc6ff;
            }
        }
    }
}

.el-scrollbar {
    padding: 0 10px;
    line-height: 22px;
    height: 40px;
    white-space: nowrap;
    position: relative;
    overflow: auto !important;

    :deep(.el-scrollbar__view) {
        margin: 10px 0;
        white-space: nowrap;

        span {
            display: inline-flex;
            //width: auto;
            //min-width: 120px;
            text-align: center;
            background: #ffffff;
            border: 1px solid #ccc;
            box-sizing: border-box;
            position: relative;
            height: 28px;
            margin: 0 5px;
          padding: 3px 30px;
            color: #1890ff;

            a {
                color: #606266;
                display: inline-block;
                width: 100%;
                text-decoration: none;
                font-size: 14px;
            }

            &.active {
                border: none;
                background-color: #409eff;
                color: #ffffff !important;

                a {
                    color: #ffffff;
                }
            }

            .el-icon-close {
                position: absolute;
                right: 8px;
                top: 6px;
                opacity: 0;
                cursor: pointer;
            }

            &:hover {
                border-color: #409eff;

                .el-icon-close {
                    opacity: 1;
                    transition: all 0.5s;
                }
            }
        }
    }
}
</style>
