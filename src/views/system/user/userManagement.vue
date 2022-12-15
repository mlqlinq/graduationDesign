<template>
  <el-button
    style="margin-left: 1%"
    type="primary"
    icon="Plus"
    plain
    @click="addUser($event)"
  >
    新增
  </el-button>
  <el-table
    border
    :data="userData"
    style="width: 98%; margin-bottom: 20px; margin: 0 auto"
    :header-cell-style="{ background: '#FAFAFA' }"
    empty-text="空"
  >
    <el-table-column prop="user_id" label="ID" align="center" />
    <el-table-column label="用户类型" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.user_type === '00'" size="large">
          系统用户
        </el-tag>
        <el-tag v-else type="warning" size="large">普通用户</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop=" " label="性别" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.sex === '0'">男</el-tag>
        <el-tag v-else-if="scope.row.sex === '1'" type="danger">女</el-tag>
        <el-tag v-else type="info">未知</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="username" label="用户账号" align="center" />
    <el-table-column prop="nick_name" label="用户昵称" align="center" />
    <el-table-column prop="avatar" label="用户头像" align="center" width="120">
      <template #default="scope">
        <img
          :src="scope.row.avatar"
          :alt="scope.row.nick_name + '的头像'"
          style="width: 75px; height: 75px"
        />
      </template>
    </el-table-column>
    <el-table-column prop="email" label="用户邮箱" align="center" />
    <el-table-column prop="phonenumber" label="手机号码" align="center" />

    <el-table-column label="账号状态" align="center" min-width="90px">
      <template #default="scope">
        <el-tag v-if="scope.row.status === '0'" type="success">正常</el-tag>
        <el-tag v-else type="info">停用</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="update_time" label="创建时间" align="center" />
    <el-table-column align="center" label="操作" min-width="195px">
      <template #default="scope">
        <el-tooltip
          v-if="scope.row.user_type !== '00'"
          effect="light"
          placement="bottom"
          content="添加"
        >
          <el-button
            type="success"
            icon="CirclePlus"
            circle
            @click="addUser(scope.row)"
          />
        </el-tooltip>
        <el-tooltip
          v-if="scope.row.user_type !== '00'"
          effect="light"
          placement="bottom"
          content="修改"
        >
          <el-button
            type="primary"
            icon="Edit"
            circle
            v-if="scope.row.user_type !== '00'"
            @click="editUser(scope.row)"
          />
        </el-tooltip>
        <el-tooltip
          v-if="scope.row.user_type !== '00'"
          effect="light"
          placement="bottom"
          content="删除"
        >
          <el-button
            type="danger"
            icon="Delete"
            circle
            v-if="scope.row.user_type !== '00'"
            @click="delUser(scope.row)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { getUserList } from "@/http/api/user/user"
import { onMounted, ref } from "vue"

// 用户数据列表
const userData = ref([])

onMounted(() => {
  getList()
})

const getList = () => {
  getUserList()
    .then((res) => {
      userData.value = res.data
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      ElMessage.error(err.mseesge)
    })
}

// 添加用户
const addUser = (val) => {}

// 编辑用户
const editUser = (val) => {}

// 删除用户
const delUser = (val) => {}
</script>

<style lang="scss" scoped></style>
