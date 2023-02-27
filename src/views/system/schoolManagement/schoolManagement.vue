<template>
	<div class="Mang">
		<el-row type="flex" justify="space-around">
			<el-col :span="6">
				<el-card class="peManagement">
					<div slot="header" class="clear-fix">
						<el-input v-model="filterText" placeholder="检索..." style="margin-top: 10px" />
					</div>
					<div class="tree">
						<el-tree ref="treeRef" class="filter-tree" :data="treeData" :props="defaultProps" accordion highlight-current @node-click="nodeClick" :filter-node-method="filterNode" empty-text="没有数据">
							<template #default="{ data: { label, type } }">
								<span style="color: #000000">{{ label }}</span>
								<span style="float: right; color: gray">({{ type }})</span>
							</template>
						</el-tree>
					</div>
					<div class="connect">
						<span style="margin-right: 5px; font-size: 18px">是否左右连接</span>
						<el-switch v-model="switchValue" active-text="是" inactive-text="否" />
					</div>
				</el-card>
			</el-col>
			<el-col :span="18">
				<FormTable :tableData="tableData" :seeSearch="switchValue"></FormTable>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { getUniverMan } from "@/http/api/user/user";
import { ElTree } from "element-plus";
import FormTable from "./formTable.vue";
import _ from "lodash";

interface Tree {
	id: string;
	label: string;
	value: string;
	type: string;
	// children: Tree[];
	children: any;
}

const switchValue = ref(false);

const tableData = ref([]);

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

let treeData: any = ref<Tree[]>([]);

let treeStudentData: any = ref([]);

const defaultProps = {
	id: "id",
	label: "value",
	children: "children"
};

// 筛选树形数据
watch(filterText, (val) => {
	treeRef.value!.filter(val);
});

const filterNode: any = (value: string, data: Tree) => {
	if (!value) return true;
	return data.value.includes(value);
};

const nodeClick = (v, p, f, m) => {
	if (v.children.length === 0)
		return ElNotification({
			// title: "错误",
			message: "到底啦"
		});
	if (switchValue.value) {
		tableData.value = v.children;
	}
};

onMounted(() => {
	getUniverManData();
});

/**
 * 请求树形结构数据
 */
const getUniverManData = async () => {
	await getUniverMan()
		.then((res) => {
			const trData = _.cloneDeep(res.data);
			for (let i = 0; i < trData.length; i++) {
				const ti = trData[i];
				ti.includingDepartments = ti.includingDepartments === null ? [] : ti.includingDepartments;
				treeData.value.push({
					id: ti.universities_id,
					label: ti.universities_name,
					value: ti.universities_name,
					type: "高校",
					children: []
				});
				if (ti.includingDepartments.length > 0) {
					for (let j = 0; j < ti.includingDepartments.length; j++) {
						const tj: any = ti.includingDepartments[j];
						treeData.value[i].children?.push({
							id: tj.id,
							label: tj.value,
							value: tj.value,
							type: "院系",
							children: []
						});
						if (Array.isArray(tj.children)) {
							for (let m = 0; m < tj.children.length; m++) {
								const tm = tj.children[m];
								if (treeData.value[i].children?.length > 0 && parseInt(treeData.value[i].children[j].id) === tm.collegeId) {
									treeData.value[i].children[j].children.push({
										id: tm.secretary_id,
										label: tm.secretary_name,
										value: tm.secretary_name,
										type: "书记",
										children: []
									});
									if (Array.isArray(tm.children)) {
										for (let n = 0; n < tm.children.length; n++) {
											const tn = tm.children[n];
											if (treeData.value[i].children[j].children[m].id === tn.collegeId) {
												treeData.value[i].children[j].children[m].children.push({
													id: tn.guide_id,
													label: tn.guide_name,
													value: tn.guide_name,
													type: "导员",
													children: []
												});

												if ("children" in tn && Array.isArray(tn.children)) {
													for (let k = 0; k < tn.children.length; k++) {
														const tk = tn.children[k];
														treeData.value[i].children[j].children[m].children[n].children.push({
															id: tk.user_id,
															label: tk.student_name,
															value: tk.student_name,
															type: "学生",
															children: []
														});
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			tableData.value = _.cloneDeep(treeData.value);
		})
		.catch((err) => {
			ElNotification({
				title: "错误",
				message: err
			});
		});
};
</script>

<style lang="scss" scoped>
.Mang {
	padding: 0 10px;
	height: calc(100% - 10px) !important;
	overflow: auto;

	.el-row {
		height: 99%;

		.el-col {
			height: 100%;
		}

		.peManagement {
			height: 100%;

			.tree {
				min-height: calc(100% - 100px) !important;
			}

			.connect {
				width: 100%;
				display: inline-flex;
				justify-content: space-evenly;
				flex-direction: row;
				align-items: center;
				flex-wrap: nowrap;
				position: absolute;
				left: 0;
				bottom: 60px;
			}

			:deep(.el-card__body) {
				height: 100% !important;
				overflow: auto;
				position: relative;
				display: flex;
				flex-direction: column;
				flex-wrap: nowrap;
				align-items: stretch;

				.el-tree {
					height: calc(100% - 100px) !important;
					padding-top: 12px;
					overflow: auto;

					.el-tree-node__content {
						display: block;
					}
				}
			}
		}
	}
}
</style>
