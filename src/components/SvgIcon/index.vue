<template>
  <svg aria-hidden="true" class="icon" :width="props.size" :height="props.size">
    <use :href="symbolId" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from "vue";
interface IProps {
  // svg 的图标的名称
  iconName: string;
  // 大小
  size: number;
}
const props = defineProps<IProps>();

const symbolId = computed(() => `#icon-${props.iconName}`);
</script>
