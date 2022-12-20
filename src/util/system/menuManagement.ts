import { storeToRefs } from "pinia"
import { useMenuStore } from "@/stores/index"
// import { ref, onMounted, reactive } from "vue"
import { getAllMenu } from "@/http/api/indexMenu.js"
import type { FormInstance, FormRules } from "element-plus"
export default () => {
  // 获取 pinia 数据
  const Menus = useMenuStore()
  const { menuAll: menuList } = storeToRefs(Menus) // 解构

  const diaTitle = ref(null) // 对话框 title
  const dialogMenuFormVisible = ref(false) // 对话框控制

  // 定义树形结构
  interface menuTree {
    value: number
    label: string
    hasChildren?: boolean
    children?: menuTree[]
  }

  // 菜单列表
  const data = ref<Array<menuTree>>([])

  // 图标列表显示控制
  const visibleIcons = ref<boolean>(false)

  // 表单ref属性绑定
  const ruleFormRef = ref<FormInstance>()

  // 表单各属性绑定对象
  const Menuform = reactive({
    parentMenu: "", // 上级菜单
    menuType: "M", // 菜单类型
    icon: "", // 图标
    menuName: "", // 名称
    orderNum: null, // 排序
    path: "", // 路由地址
    alwaysShow: "0", // 显示状态
    status: "0", // 菜单状态
    component: "", // 组件路径
    isCache: 0, // 缓存状态
  })

  // 表单验证方法
  const MenuformRules = reactive<FormRules>({
    parentMenu: [
      {
        required: true,
        message: "请选择上级菜单",
        trigger: "change",
      },
      {
        validator(rule, value, callback, source, options) {
          if (value === "") {
            callback(new Error("请选择上级菜单"))
          } else {
            callback()
          }
        },
      },
    ],
    menuType: [
      {
        required: true,
        message: "请选择菜单类型",
        trigger: "change",
      },
    ],
    menuName: [
      {
        required: true,
        message: "请输入菜单名称",
        trigger: "blur",
      },
    ],
    orderNum: [
      {
        required: true,
        message: "请选择排序",
        trigger: "blur",
      },
      {
        validator(rule, value, callback, source, options) {
          if (value < 0) {
            callback(new Error("至少是0"))
          } else if (value > 20) {
            callback(new Error("最大是20"))
          } else {
            callback()
          }
        },
      },
    ],
    path: [
      {
        required: true,
        message: "请输入路由地址",
        trigger: "blur",
      },
    ],
    alwaysShow: [
      {
        required: true,
        message: "请选择菜单显示状态",
        trigger: "change",
      },
    ],
    status: [
      {
        required: true,
        message: "请选择菜单状态",
        trigger: "blur",
      },
    ],
    component: [
      {
        required: true,
        message: "请输入组件路径",
        trigger: "change",
      },
    ],
    isCache: [
      {
        required: true,
        message: "请选择是否缓存",
        trigger: "change",
      },
    ],
  })

  // 添加按钮
  const addMeun = (value) => {
    diaTitle.value = "添加菜单"
    dialogMenuFormVisible.value = true
    console.log(value)
  }

  // 编辑按钮
  const editMenu = (value) => {
    diaTitle.value = "修改菜单"
    dialogMenuFormVisible.value = true
    console.log(value)
  }

  // 删除按钮
  const delMenu = (value) => {
    ElMessageBox.confirm(
      "确定要删除该菜单吗?",
      "提醒--请注意！该操作不可逆！",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(() => {
        // eslint-disable-next-line no-undef
        ElNotification({
          title: "提示",
          message: "删除成功",
          type: "success",
          duration: 2000,
        })
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消删除",
        })
      })
  }

  // 提交按钮
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log("submit!", Menuform)
      } else {
        // eslint-disable-next-line no-undef
        ElNotification({
          title: "提示",
          message: "请全部填写！",
          type: "warning",
          duration: 1500,
        })
      }
    })
  }

  // 取消按钮
  const Cancel = () => {
    dialogMenuFormVisible.value = false
  }

  // 请求 树状菜单数据
  const setmenuTree = () => {
    if (data.value.length !== 0) return
    getAllMenu()
      .then((res) => {
        const menu: any = { value: 0, label: "主类目" }
        menu.children = JSON.parse(JSON.stringify(res.data))
        data.value.push(menu)
      })
      .catch((err) => {
        ElMessage.error(err.mseesge)
      })
  }

  // 控制图标列表显示
  const visibleIconList = () => {
    visibleIcons.value = !visibleIcons.value
  }

  // 点击获取设置的图标
  const getIcon = (icon) => {
    Menuform.icon = icon
  }

  // 弹窗关闭时重置表单
  const handleClose = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  return {
    menuList,
    diaTitle,
    dialogMenuFormVisible,
    data,
    Menuform,
    visibleIcons,
    ruleFormRef,
    MenuformRules,
    setmenuTree,
    addMeun,
    editMenu,
    delMenu,
    submitForm,
    Cancel,
    visibleIconList,
    getIcon,
    handleClose,
  }
}
