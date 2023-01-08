<template>
	<svg :height="props.size" :width="props.size" aria-hidden="true" class="icon">
		<use :href="symbolId" />
	</svg>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface IProps {
	// svg 的图标的名称
	iconName: string;
	// 大小
	size: number;
}

const props = defineProps<IProps>();
const symbolId = computed(() => `#icon-${props.iconName.slice(0, 1).toLowerCase() + props.iconName.slice(1)}`);
</script>
