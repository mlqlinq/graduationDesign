import { onMounted, ref, watch } from "vue"
import screenfull from "screenfull"
import { getMenu } from "@/http/api/indexMenu"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"
import { useLayoutStore, useMenuStore } from "@/stores/index"
import { useRoute, useRouter } from "vue-router"

export default () => {
  // 控制菜单展开与收起
  // const isCollapse = ref<boolean>(false);
  const layoutStore = useLayoutStore()
  const { isCollapse } = storeToRefs(layoutStore)

  // 搜索框内容
  const searchctx = ref("")

  // 展开全屏
  const full = ref(true)

  // 菜单列表
  interface ziMenuStructure {
    menu_id: number
    name: string
    path: string
    alwaysShow: number
    status: string
    component: string
    orderNum: number
    meta: {
      title: string
      icon: string
      noCache: number
      link: string
    }
  }
  interface menuStructure {
    menu_id: number
    menu_name: string
    path: string
    status: string
    orderNum: number
    alwaysShow: number
    meta: {
      title: string
      icon: string
      noCache: number
      link: string
    }
    children?: menuStructure[]
  }
  const allMenu = ref<Array<menuStructure>>()
  const useMenu = useMenuStore()
  const { menuAll: menus } = storeToRefs(useMenu)

  // 被激活的连接地址
  const activePath = ref<string>("/index")

  // 路由跳转
  const router = useRouter()

  // 路由路径
  const route = useRoute()
  const breadcrumbList = ref([])

  onMounted(() => {
    document.querySelector("body").setAttribute("style", "margin:0;")

    const rou = sessionStorage.getItem("activePath")
    if (rou === null) {
      activePath.value = "/index"
      // console.log(111, activePath.value);
      saveNavSate(activePath.value)
    } else {
      activePath.value = rou
      // console.log(222, rou);
      saveNavSate(activePath.value)
    }
    initBreadcrumbList()
  })

  // 控制菜单展开与收起
  const openMenu = () => {
    layoutStore.collapse()
  }

  const getSearch = () => {
    const inp = document.querySelector(".search input")
    const icon = document.querySelector(".search_circle") as HTMLElement

    inp.className = "seainput"
    icon.style.display = "inline"
  }

  // 清空内容并关闭
  const searchClose = () => {
    const inp = document.querySelector(".search input")
    const icon = document.querySelector(".search_circle") as HTMLElement
    searchctx.value = ""
    inp.className = "search_inp"
    icon.style.display = "none"
  }

  // 控制 全屏
  const toggleScreen = () => {
    full.value = !full.value
    screenfull.toggle()
  }

  // 请求后台获取菜单列表
  const getAllMenu = async () => {
    await getMenu()
      .then((res) => {
        menus.value = res.data
        allMenu.value = menus.value
      })
      .catch((err) => {
        ElMessage.error(err)
      })
  }

  // // 保存连接的激活状态
  const saveNavSate = (path) => {
    sessionStorage.setItem("activePath", path)
    activePath.value = path
  }

  // 退出登录
  const loginOut = () => {
    ElMessageBox.confirm("确定要退出登录吗?", "提醒", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        router.push("/")
        ElMessage({
          type: "success",
          message: "退出成功",
        })
        sessionStorage.clear()
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消退出",
        })
      })
  }

  const initBreadcrumbList = () => {
    const result = route.matched.find((v) => {
      return v.path === sessionStorage.getItem("activePath")
    })
    const newArr = []
    newArr.push(result)
    for (let i = 0; i < newArr.length; i++) {
      breadcrumbList.value = newArr[i].meta.arr
    }
  }
  // 监听路由的变化
  watch(
    route,
    () => {
      initBreadcrumbList()
    },
    { deep: true }
  )
  getAllMenu()

  return {
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
  }
}
