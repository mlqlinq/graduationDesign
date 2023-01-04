<template>
    <el-card>
        <el-button icon="Plus" plain style="margin-left: 1%; margin-bottom: 10px" type="primary" @click="addUser($event)"> 新增 </el-button>
        <el-table
            v-loading="loading"
            :data="userData"
            :header-cell-style="{ background: '#f5f7fa' }"
            border
            element-loading-text="加载中..."
            empty-text="空"
            style="width: 98%; margin-bottom: 20px; margin: 0 auto"
        >
            <el-table-column align="center" label="ID" prop="user_id" />
            <el-table-column align="center" label="用户类型">
                <template #default="scope">
                    <el-tag v-if="scope.row.user_type === '00'" size="large"> 系统用户</el-tag>
                    <el-tag v-else size="large" type="warning">普通用户</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="性别" prop=" ">
                <template #default="scope">
                    <el-tag v-if="scope.row.sex === '0'">男</el-tag>
                    <el-tag v-else-if="scope.row.sex === '1'" type="danger">女</el-tag>
                    <el-tag v-else type="info">未知</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户账号" prop="username" />
            <el-table-column align="center" label="用户昵称" prop="nick_name" />
            <el-table-column align="center" label="用户头像" prop="avatar" width="120">
                <template #default="scope">
                    <img :alt="scope.row.nick_name + '的头像'" :src="scope.row.avatar" style="width: 75px; height: 75px" />
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户邮箱" prop="email" />
            <el-table-column align="center" label="手机号码" prop="phonenumber" />

            <el-table-column align="center" label="账号状态" min-width="40px">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === '0'" type="success">正常</el-tag>
                    <el-tag v-else type="info">停用</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" prop="update_time" />
            <el-table-column align="center" label="操作" min-width="100px">
                <template #default="scope">
                    <el-tooltip v-if="scope.row.user_type !== '00'" content="添加" placement="bottom">
                        <el-button circle icon="CirclePlus" type="success" @click="addUser(scope.row)" />
                    </el-tooltip>
                    <el-tooltip v-if="scope.row.user_type !== '00'" content="修改" placement="bottom">
                        <el-button v-if="scope.row.user_type !== '00'" circle icon="Edit" type="primary" @click="editUser(scope.row)" />
                    </el-tooltip>
                    <el-tooltip v-if="scope.row.user_type !== '00'" content="删除" placement="bottom">
                        <el-button v-if="scope.row.user_type !== '00'" circle icon="Delete" type="danger" @click="delUser(scope.row)" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script lang="ts" setup>
import { getUserList } from "@/http/api/user/user";
import { onMounted, ref } from "vue";

// 用户数据列表
const userData = ref([]);

// loading
const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        getList();
    }, 1000);
});

const getList = async () => {
    await getUserList()
        .then((res) => {
            userData.value = res.data;
            loading.value = false;
        })
        .catch((err) => {
            // eslint-disable-next-line no-undef
            ElMessage.error(err.mseesge);
        });
};

// 添加用户
const addUser = (val) => {};

// 编辑用户
const editUser = (val) => {};

// 删除用户
const delUser = (val) => {};
</script>

<style lang="scss" scoped></style>
