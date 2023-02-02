<template>
	<div class="Mang">
		<el-row type="flex" justify="space-around">
			<el-col :span="4">
				<el-card class="peManagement">
					<div slot="header" class="clear-fix">
						<span>权限管理</span>
					</div>
					<el-input v-model="filterText" placeholder="检索..." style="margin-top: 10px" />
					<div class="tree">
						<el-tree ref="treeRef" class="filter-tree" :data="collegeListChildren" :props="defaultProps" highlight-current @node-click="nodeClick" :filter-node-method="filterNode" />
					</div>
				</el-card>
			</el-col>
			<el-col :span="19">
				<formTable :major="major"></formTable>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { collegeListChildren } from "@/util/tool/JsonData";
import { ElTree } from "element-plus";
import formTable from "./formTable.vue";

interface Tree {
	id: string;
	label: string;
	value: string;
	children?: Tree[];
}
const major = ref("");

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
	children: "children",
	label: "value",
	id: "id"
};

watch(filterText, (val) => {
	treeRef.value!.filter(val);
});

const filterNode: any = (value: string, data: Tree) => {
	if (!value) return true;
	return data.value.includes(value);
};

const nodeClick = (v, p, f, m) => {
	if ("children" in v) return;
	// console.log("🚀 ~ file: schoolManagement.vue:49 ~ nodeClick ~ v", v);
	major.value = v.value;
};
</script>

<style lang="scss" scoped>
.Mang {
	padding: 0 20px;
	height: calc(100% - 10px) !important;
	overflow: auto;

	.el-row {
		height: 99%;

		.el-col {
			height: 100%;
		}

		.peManagement {
			height: 100%;

			:deep(.el-card__body) {
				height: 100% !important;
				overflow: auto;

				.el-tree {
					height: 100% !important;
					padding-top: 12px;
				}
			}
		}
	}
}
</style>
