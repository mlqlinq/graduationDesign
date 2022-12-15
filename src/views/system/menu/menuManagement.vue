<template>
  <el-button
    style="margin-left: 1%"
    type="primary"
    icon="Plus"
    plain
    @click="addMeun($event)"
  >
    新增
  </el-button>
  <el-table
    border
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
        <el-tag v-if="scope.row.alwaysShow === '0'" type="success" size="large">
          显示
        </el-tag>
        <el-tag v-else class="mx-1" type="info" size="large">隐藏</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="updateTime" label="创建时间" align="center" />
    <el-table-column align="center" label="操作" min-width="195px">
      <template #default="scope">
        <el-tooltip
          v-if="scope.row.menuType !== 'C'"
          effect="light"
          placement="bottom"
          content="添加"
        >
          <el-button
            type="success"
            icon="CirclePlus"
            circle
            @click="addMeun(scope.row)"
          />
        </el-tooltip>
        <el-tooltip effect="light" placement="bottom" content="修改">
          <el-button
            type="primary"
            icon="Edit"
            circle
            @click="editMenu(scope.row)"
          />
        </el-tooltip>
        <el-tooltip effect="light" placement="bottom" content="删除">
          <el-button
            type="danger"
            icon="Delete"
            circle
            @click="delMenu(scope.row)"
          />
        </el-tooltip>
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
</template>

<script setup lang="ts">
import * as ElIcons from "@element-plus/icons-vue"
import useMenu from "@/util/system/menuManagement"
const {
  menuList,
  diaTitle,
  dialogMenuFormVisible,
  data,
  Menuform,
  visibleIcons,
  ruleFormRef,
  MenuformRules,
  addMeun,
  editMenu,
  delMenu,
  submitForm,
  Cancel,
  visibleIconList,
  getIcon,
} = useMenu()
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
