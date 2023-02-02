<template>
	<div class="paginations">
		<el-pagination :hide-on-single-page="pargS" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :small="small" :background="background" layout="prev, pager, next, jumper" :total="total" :pager-count="5"> </el-pagination>
		<el-button v-if="!pargS" type="primary" style="margin-left: 15px">确认</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps<{
	pageSize: number;
	total: number;
}>();
const { pageSize, total } = toRefs(props);

const emit = defineEmits(["currentPage"]);
const currentPage = ref(1);
const small = ref(false);
const background = ref(true);

const handleCurrentChange = (val: number) => {
	currentPage.value = val;
	emit("currentPage", currentPage.value);
};
const pargS = ref(true);

watch(
	() => total,
	(nval, oval) => {
		if (nval.value < 10) {
			pargS.value = false;
		}
	},
	{ deep: true }
);
</script>

<style lang="scss" scoped>
.paginations {
	width: 100%;
	// display: flex;
	// justify-content: center;
}
</style>
