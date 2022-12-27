// import { onMounted, ref, watch } from "vue"
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import screenfull from "screenfull";
import { useLayoutStore, useMenuStore, useRouterStore } from "@/stores/index";
// import { ElMessage, ElMessageBox } from "element-plus"
import { getMenu } from "@/http/api/indexMenu";

export default () => {
    // 控制菜单展开与收起
    // const isCollapse = ref<boolean>(false);
    const layoutStore = useLayoutStore();
    const { isCollapse } = storeToRefs(layoutStore);

    // 展开全屏
    const full = ref(true);

    // 菜单列表
    interface menuStructure {
        menu_id: number;
        parent_id?: number;
        menu_name: string;
        path: string;
        status: string;
        orderNum: number;
        alwaysShow: string;
        meta: {
            title: string;
            icon: string;
            noCache: number;
            link: string;
        };
        children?: menuStructure[];
    }
    const allMenu = ref<Array<menuStructure>>();
    const useMenu = useMenuStore();
    const { menuAll: menus } = storeToRefs(useMenu);

    // 被激活的连接地址
    const activePath = ref<string>("/index");

    // 路由跳转
    const router = useRouter();

    // 路由路径
    const route = useRoute();
    const breadcrumbList = ref([]);

    onMounted(() => {
        // document.querySelector("body").setAttribute("style", "margin:0;");

        const rou = sessionStorage.getItem("activePath");
        if (rou === null) {
            activePath.value = "/index";
            // console.log(111, activePath.value);
            saveNavSate(activePath.value);
        } else {
            activePath.value = rou;
            // console.log(222, rou);
            saveNavSate(activePath.value);
        }
        initBreadcrumbList();
    });

    // 控制菜单展开与收起
    const openMenu = () => {
        layoutStore.collapse();
    };

    // 控制 全屏
    const toggleScreen = () => {
        full.value = !full.value;
        screenfull.toggle();
    };

    // 动态路由
    const addrou: any = ref([]);
    const addRouterList = useRouterStore();
    const { addrouters: routerList } = storeToRefs(addRouterList);

    // 从后台返回的菜单数组中，筛选符合当前用户权限的菜单
    const menuOperation = menuArr => {
        const ne: any = [];
        if (menuArr) {
            for (let n = 0; n < menuArr.length; n++) {
                if (menuArr[n].alwaysShow === "0") {
                    ne.push(JSON.parse(JSON.stringify(menuArr[n])));
                }
            }
            ne.forEach(e => {
                if (e.children.length > 0) {
                    const ind = e.children.findIndex(item => item.alwaysShow !== "0");
                    if (ind !== -1) {
                        e.children.splice(ind, 1);
                    }
                }
            });
        }
        return ne;
    };

    // 请求后台获取菜单列表
    const getAllMenu = async () => {
        await getMenu()
            .then(res => {
                const menuArr: any = res.data;

                //  menuOperation(menuArr) 返回值赋值给菜单列表
                allMenu.value = menuOperation(menuArr);

                menus.value = res.data;
                if (menus.value) {
                    // for循环删除不必要的属性
                    for (let i = 0; i < menus.value.length; i++) {
                        addrou.value.push(JSON.parse(JSON.stringify(menus.value[i])));
                        addrou.value[i].meta.noCache = 0 ? true : false;
                        delete addrou.value[i].createTime;
                        delete addrou.value[i].updateTime;
                        delete addrou.value[i].menuType;
                        delete addrou.value[i].menu_id;
                        delete addrou.value[i].status;
                        delete addrou.value[i].orderNum;
                        if (addrou.value[i].children.length > 0) {
                            for (let j = 0; j < addrou.value[i].children.length; j++) {
                                addrou.value[i].children[j].meta.noCache = 0 ? true : false;
                                delete addrou.value[i].children[j].createTime;
                                delete addrou.value[i].children[j].updateTime;
                                delete addrou.value[i].children[j].menuType;
                                delete addrou.value[i].children[j].menu_id;
                                delete addrou.value[i].children[j].status;
                                delete addrou.value[i].children[j].orderNum;
                            }
                        }
                    }
                }
                routerList.value = addrou.value;
            })
            .catch(err => {
                console.error(err);
            });
    };

    // // 保存连接的激活状态
    const saveNavSate = path => {
        sessionStorage.setItem("activePath", path);
        activePath.value = path;
    };

    // 个人中心
    const personalCenter = () => {
        router.push("/personalCenter");
    };

    // 退出登录
    const loginOut = () => {
        ElMessageBox.confirm("确定要退出登录吗?", "提醒", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                router.push("/");
                ElMessage({
                    type: "success",
                    message: "退出成功",
                });
                // 清空pinia中的数据，让页面重新加载
                // window.location.reload();
                sessionStorage.clear();
            })
            .catch(() => {
                ElMessage({
                    type: "info",
                    message: "取消退出",
                });
            });
    };

    const initBreadcrumbList = () => {
        const result = route.matched.find(v => {
            return v.path === sessionStorage.getItem("activePath");
        });
        const newArr: any = [];
        newArr.push(result);
        for (let i = 0; i < newArr.length - 1; i++) {
            breadcrumbList.value = newArr[i].meta.arr;
        }
    };
    // 监听路由的变化
    watch(
        () => route.path,
        () => {
            initBreadcrumbList();
        },
        { deep: true, immediate: true }
    );
    getAllMenu();

    return {
        isCollapse,
        full,
        personalCenter,
        openMenu,
        toggleScreen,
        allMenu,
        activePath,
        saveNavSate,
        loginOut,
        breadcrumbList,
    };
};
