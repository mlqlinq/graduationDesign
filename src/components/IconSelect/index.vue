<template>
  <el-dialog title="title" v-model="currentVisiable">
    <div class="bs-wrapper__container"></div>
  </el-dialog>
</template>

<script lang="ts" setup>
import * as ElIcons from "@element-plus/icons-vue"
import { ref, watch } from "vue"
const currentVisiable = ref<boolean>(true)
// 拷贝一份父组件传递过来的visiable
// 监听visiable的变化

watch(
  () => currentVisiable.value,
  (val) => {
    currentVisiable.value = val
  }
)
</script>
