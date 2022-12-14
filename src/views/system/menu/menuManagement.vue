<template>
  <div>
    <el-button type="primary" icon="Plus" plain @click="addMeun($event)">
      新增
    </el-button>
    <el-table
      :data="menuList"
      style="width: 98%; margin-bottom: 20px; margin: 0 auto"
      row-key="menu_id"
      :header-cell-style="{ background: '#FAFAFA' }"
    >
      <el-table-column prop="meta.title" label="菜单名称" align="left" />
      <el-table-column label="图标" align="center" min-width="70px">
        <template #default="scope">
          <SvgIcon
            style="color: #c0c4cc"
            :size="18"
            color="#5a5e66"
            :icon-name="scope.row.meta.icon"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        align="center"
        sortable
        min-width="70px"
      />
      <el-table-column prop="path" label="路径" align="center" />
      <el-table-column label="状态" align="center" min-width="90px">
        <template #default="scope">
          <el-tag v-if="scope.row.status === '0'" type="success" size="large">
            正常
          </el-tag>
          <el-tag v-else class="mx-1" type="info" size="large">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="显示状态" align="center" min-width="90px">
        <template #default="scope">
          <el-tag
            v-if="scope.row.alwaysShow === '0'"
            type="success"
            size="large"
          >
            显示
          </el-tag>
          <el-tag v-else class="mx-1" type="info" size="large">隐藏</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="创建时间" align="center" />
      <el-table-column align="right" min-width="195px">
        <template #default="scope">
          <el-button
            type="primary"
            icon="CirclePlus"
            text
            v-if="scope.row.menuType !== 'C'"
            @click="addMeun(scope.row)"
          >
            新增
          </el-button>
          <el-button
            type="primary"
            icon="Edit"
            text
            @click="editMenu(scope.row)"
          >
            修改
          </el-button>
          <el-button
            type="primary"
            icon="Delete"
            text
            @click="delMenu(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 操作菜单  对话框 -->
    <el-dialog
      v-model="dialogMenuFormVisible"
      :title="diaTitle"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      style="width: 600px"
    >
      <el-form
        ref="ruleFormRef"
        :model="Menuform"
        :rules="MenuformRules"
        label-width="120px"
      >
        <el-form-item label="上级菜单" prop="parentMenu">
          <el-tree-select
            v-model="Menuform.parentMenu"
            :data="data"
            node-key="value"
            :default-expanded-keys="[0]"
            :current-node-key="0"
            filterable
            check-strictly
            highlight-current
            clearable
            placeholder="请选择上级菜单"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="Menuform.menuType">
            <el-radio border label="M">目录</el-radio>
            <el-radio border label="C">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-popover
            placement="bottom-start"
            :visible="visibleIcons"
            trigger="click"
            :teleported="false"
          >
            <template #reference>
              <el-input
                v-model="Menuform.icon"
                placeholder="点击选择图标"
                clearable
                @focus="visibleIconList"
                @blur="visibleIconList"
              >
                <template #prefix>
                  <el-icon
                    v-if="Menuform.icon === ''"
                    style="height: 32px; width: 16px"
                  >
                    <search />
                  </el-icon>
                  <div v-else style="width: 20px; height: 20px">
                    <component :is="Menuform.icon" />
                  </div>
                </template>
              </el-input>
            </template>
            <div
              v-for="(item, index) in Object.keys(ElIcons)"
              :key="index"
              class="bs-wrapper__container__item"
            >
              <div style="width: 24px; height: 24px" @click="getIcon(item)">
                <component :is="item" />
              </div>
              <div
                class="bs-wrapper__container__item__title"
                @click="getIcon(item)"
              >
                {{ item }}
              </div>
            </div>
          </el-popover>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input
                maxlength="8"
                clearable
                placeholder="请输入菜单名称"
                v-model="Menuform.menuName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                v-model="Menuform.orderNum"
                :min="0"
                :max="20"
                controls-position="right"
                placeholder="请选择排序"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="路由地址" prop="path">
          <el-input
            clearable
            placeholder="请输入路由地址"
            v-model="Menuform.path"
          ></el-input>
        </el-form-item>
        <el-row class="menu_allow">
          <el-col :span="1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="选择'隐藏'则路由将不会出现在侧边栏，但仍然可以访问"
              placement="top-end"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-col>
          <el-col :span="11">
            <el-form-item class="menu_show" label="显示状态" prop="alwaysShow">
              <el-radio-group v-model="Menuform.alwaysShow">
                <el-radio label="0">显示</el-radio>
                <el-radio label="1">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="选择'停用'则路由将不会出现在侧边栏，也不能被访问"
              placement="top-start"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-col>
          <el-col :span="11">
            <el-form-item class="menu_show" label="菜单状态" prop="status">
              <el-radio-group v-model="Menuform.status">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="menu_allow" v-if="Menuform.menuType === 'C'">
          <el-col :span="1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
              placement="top-end"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-col>
          <el-col :span="11">
            <el-form-item class="menu_show" label="组件路径" prop="component">
              <el-input
                v-model="Menuform.component"
                style="width: 90%"
                placeholder="请输入组件路径"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
              placement="top-start"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-col>
          <el-col :span="11">
            <el-form-item class="menu_show" label="是否缓存" prop="isCache">
              <el-radio-group v-model="Menuform.isCache">
                <el-radio :label="0">缓存</el-radio>
                <el-radio :label="1">不缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            提交
          </el-button>
          <el-button @click="Cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useMenuStore } from "@/stores/index"
import { ref, onMounted, reactive } from "vue"
import { getAllMenu } from "@/http/api/indexMenu.js"
import {
  ElMessage,
  ElMessageBox,
  type FormInstance,
  type FormRules,
} from "element-plus"
import * as ElIcons from "@element-plus/icons-vue"

// 获取 pinia 数据
const Menus = useMenuStore()
const { menuAll: menuList } = storeToRefs(Menus) // 解构

const diaTitle = ref(null) // 对话框 title
const dialogMenuFormVisible = ref(false) // 对话框控制

// 定义树形结构
interface menuTree {
  value: number
  label: string
  children?: menuTree[]
}

// 菜单列表
const data = ref<Array<menuTree>>([])

// 图标列表显示控制
const visibleIcons = ref<boolean>(false)

onMounted(() => {
  setmenuTree()
})

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
  diaTitle.value = "编辑菜单"
  dialogMenuFormVisible.value = true
  console.log(value)
}

// 删除按钮
const delMenu = (value) => {
  ElMessageBox.confirm("确定要删除该菜单吗?", "提醒--请注意！该操作不可逆！", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
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

// 请求菜单 数据树状化
const setmenuTree = () => {
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
</script>
<style lang="scss" scoped>
.btns {
  :deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}

:deep(.el-popper) {
  width: 100% !important;
  height: 200px;
  overflow: overlay;

  .bs-wrapper__container__item {
    display: inline-flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.15rem;
    cursor: pointer;
    font-size: 12px;
    height: 3rem;

    &__title {
      flex: 1; //独占一份
    }
  }
}

.menu_allow {
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: baseline;
  padding-left: 18px;
}

.menu_show {
  :deep(.el-form-item__label) {
    width: auto !important;
  }
}
</style>
