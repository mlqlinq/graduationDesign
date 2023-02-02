<template>
	<div class="formTb">
		<!-- 筛选区域 -->
		<el-card class="form">
			<el-form :model="form" inline label-width="140px">
				<el-form-item label="筛选奖学金种类：">
					<el-select v-model="form.selectValue" clearable placeholder="请选择分类" @change="filterData" @clear="getAllData">
						<el-option v-for="item in shipOptions" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="筛选专业：">
					<el-select v-model="form.majorValue" clearable placeholder="请选择分类" @change="filterData" @clear="getAllData">
						<el-option v-for="item in majorOptions" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="筛选年级：">
					<el-select v-model="form.gradeValue" clearable placeholder="请选择分类" @change="filterData" @clear="getAllData">
						<el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 数据展示区域 -->
		<el-card class="table">
			<el-table :data="newArr" border stripe style="width: 100%" empty-text="空">
				<el-table-column label="序号" width="75" align="center">
					<template v-slot:default="scope">
						{{ queryInfo.pagesize * (queryInfo.pagenum - 1) + (scope.$index + 1) }}
					</template>
				</el-table-column>
				<el-table-column prop="student_name" label="学生姓名" align="center" />
				<el-table-column prop="type" label="申请类型" align="center">
					<template #default="scope">
						<div v-if="scope.row.type === '1'" style="cursor: pointer; color: black">校奖学金</div>
						<div v-if="scope.row.type === '2'" style="cursor: pointer; color: var(--el-color-warning)">区奖学金</div>
						<div v-if="scope.row.type === '3'" style="cursor: pointer; color: var(--el-color-primary)">国家奖学金</div>
						<div v-if="scope.row.type === '4'" style="cursor: pointer; color: var(--el-color-success)">国家励志奖学金</div>
					</template>
				</el-table-column>
				<el-table-column prop="student_sex" label="性别" align="center" />
				<el-table-column prop="grade" label="年级" align="center">
					<template #default="scope">
						<div v-if="!scope.row.grade">{{ scope.row.student_start_year.slice(0, 4) }}级</div>
					</template>
				</el-table-column>
				<el-table-column prop="student_major" label="专业" align="center" />
				<el-table-column prop="student_class" label="班级" align="center">
					<template #default="scope">
						<div v-if="!scope.row.student_class">{{ scope.row.class_name }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="id_card_number" label="身份证号码" />
				<el-table-column prop="political_outlook" label="政治面貌" align="center" />
				<el-table-column label="审核状态" align="center " width="160px">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.class_opinion && JSON.parse(scope.row.class_opinion).resource === '0'">班级审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.class_opinion && JSON.parse(scope.row.class_opinion).resource === '1'">班级审核不通过</el-tag>
						<el-tag type="info" effect="plain" v-else-if="scope.row.class_opinion === ''">班级未审核</el-tag>

						<el-tag type="success" effect="plain" v-if="scope.row.reason_for_recommendation && JSON.parse(scope.row.reason_for_recommendation).resource === '0'">班级审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.reason_for_recommendation && JSON.parse(scope.row.reason_for_recommendation).resource === '1'">班级审核不通过</el-tag>
						<el-tag type="info" effect="plain" v-else-if="scope.row.reason_for_recommendation === ''">班级未审核</el-tag>

						<el-tag type="success" effect="plain" v-if="scope.row.opinions_of_the_department && JSON.parse(scope.row.opinions_of_the_department).resource === '0'">院系审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.opinions_of_the_department && JSON.parse(scope.row.opinions_of_the_department).resource === '1'">院系审核不通过</el-tag>
						<el-tag type="info" effect="plain" v-else-if="scope.row.opinions_of_the_department === ''">院系未审核</el-tag>

						<el-tag type="success" effect="plain" v-if="scope.row.school_opinion && JSON.parse(scope.row.school_opinion).resource === '0'">高校审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.school_opinion && JSON.parse(scope.row.school_opinion).resource === '1'">高校审核不通过</el-tag>
						<el-tag type="info" effect="plain" v-else-if="scope.row.school_opinion === ''">高校未审核</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="250px">
					<template #default="scope">
						<el-button @click="handleEdit(scope.$index, scope.row)">查看</el-button>
						<el-button type="danger" @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Paginations class="page" :total="total" :page-size="queryInfo.pagesize" @currentPage="handleCurrentChange"> </Paginations>
		</el-card>

		<el-dialog v-model="dialogVisible" title="提交审核" width="600px" center destroy-on-close>
			<div>
				<el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm" status-icon>
					<el-form-item label="是否同意:">
						<el-radio-group v-model="ruleForm.resource">
							<!-- <el-radio label="0" value="0">同意</el-radio> -->
							<el-radio label="1" value="1">驳回</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="审核意见:">
						<el-input v-model="ruleForm.desc" type="textarea" />
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="Cancel">取消</el-button>
					<el-button type="primary" @click="submitForReview"> 提交 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/modules/userToken";
import Paginations from "@/components/Paginations/index.vue";
import { getShipData } from "@/http/api/Scholarship/allship";
import router from "@/router";
import { storeToRefs } from "pinia";
import postExamine from "@/util/Scholarship/toE";
import type { FormInstance } from "element-plus";
import _ from "lodash";

const { postUniverClassExamine, postUniverDepartmentExamine, postUniverSchoolExamine } = postExamine();

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);
const route = useRoute();

const ruleFormRef = ref<FormInstance>();
const ruleForm: any = reactive({
	resource: "1",
	desc: ""
});

/** 数组组对象去重 */
const fn1 = (tempArr) => {
	for (let i = 0; i < tempArr.length; i++) {
		for (let j = i + 1; j < tempArr.length; j++) {
			if (tempArr[i].value == tempArr[j].value) {
				tempArr.splice(j, 1);
				j--;
			}
		}
	}
	return tempArr;
};

/**
 * 网络请求
 */
const getAllData = async () => {
	let guide_college = "";
	if ("guide_college" in userData.value) {
		guide_college = userData.value.guide_college;
	} else if ("secretary_college" in userData.value) {
		guide_college = userData.value.secretary_college;
	} else if ("universities_name" in userData.value) {
		guide_college = userData.value.universities_name;
	}

	await getShipData({ userIdentity: userData.value.userIdentity, guide_college })
		.then((result) => {
			for (let i = 0; i < result.data.length; i++) {
				if ("grade" in result.data[i]) {
					gradeOptions.value.push({
						value: result.data[i].grade,
						label: result.data[i].grade
					});
				} else if ("student_start_year" in result.data[i]) {
					gradeOptions.value.push({
						value: result.data[i].student_start_year.slice(0, 4) + "级",
						label: result.data[i].student_start_year.slice(0, 4) + "级"
					});
				}

				if ("student_major" in result.data[i]) {
					majorOptions.value.push({
						value: result.data[i].student_major,
						label: result.data[i].student_major
					});
				}
			}
			fn1(gradeOptions.value);
			fn1(majorOptions.value);

			tableData.value = result.data;
			total.value = result.total;
		})
		.catch((err) => {
			console.log(err);
		});
};

const form = reactive({
	selectValue: "",
	majorValue: "",
	gradeValue: ""
});

const shipOptions = [
	{
		value: "1",
		label: "校奖学金"
	},
	{
		value: "2",
		label: "区奖学金"
	},
	{
		value: "3",
		label: "国家奖学金"
	},
	{
		value: "4",
		label: "国家励志奖学金"
	}
];

const gradeOptions: any = ref([]);
const majorOptions: any = ref([]);

const tableData: any = ref([]);

const queryInfo = reactive({
	query: "", // 查询参数
	pagenum: 1, // 当前页码
	pagesize: 5 // 每页显示条数
});
const total = ref(0); // 总数据条数

onMounted(() => {
	getAllData();
});

// 监听 页码值 改变的事件
const handleCurrentChange = (newPage) => {
	queryInfo.pagenum = newPage;
};

const filterData = (tableDat?: any) => {
	getAllData();

	const arr = _.cloneDeep(tableData.value);
	const newArr = computed(() =>
		arr
			.filter((data) => !form.selectValue || data.type.toLowerCase().includes(form.selectValue.toLowerCase()))
			.filter((data) => !form.majorValue || data.student_major.includes(form.majorValue))
			.filter((data) => !form.gradeValue || ("grade" in data ? data.grade.includes(form.gradeValue) : (data.student_start_year.slice(0, 4) + "级").includes(form.gradeValue)))
			.filter((item, index) => index < queryInfo.pagenum * queryInfo.pagesize && index >= queryInfo.pagesize * (queryInfo.pagenum - 1))
	);

	tableData.value = _.cloneDeep(newArr.value);
	total.value = tableData.value.length;
	fn1(gradeOptions.value);
	fn1(majorOptions.value);
};

const newArr = computed(() =>
	tableData.value
		.filter((data) => !form.selectValue || data.type.toLowerCase().includes(form.selectValue.toLowerCase()))
		.filter((data) => !form.majorValue || data.student_major.includes(form.majorValue))
		.filter((data) => !form.gradeValue || ("grade" in data ? data.grade.includes(form.gradeValue) : (data.student_start_year.slice(0, 4) + "级").includes(form.gradeValue)))
		.filter((item, index) => index < queryInfo.pagenum * queryInfo.pagesize && index >= queryInfo.pagesize * (queryInfo.pagenum - 1))
);

const handleEdit = (index, row) => {
	router.push({ path: "/fillInTheApplication", query: { Num: parseInt(row.type), id: row.id } });
	router.beforeEach(async (to) => {
		to.meta.data = await row;
	});
};

onBeforeRouteLeave((to, from) => {
	if (to.path !== "/fillInTheApplication") return;
	to.meta.title = "查看页";
});

const dialogVisible = ref(false);
const rowData = ref();

/**
 * 驳回操作
 * @param index
 * @param row
 */
const handleDelete = (index, row) => {
	if ("class_opinion" in row && row.class_opinion !== "") {
		return ElNotification({
			title: "温馨提示",
			message: "您已经审核过啦",
			type: "success"
		});
	} else {
		rowData.value = row;
		dialogVisible.value = true;
	}
};

/* 提交审核 */
const submitForReview = () => {
	ruleForm.id = rowData.value.id;
	console.log(userData.value.userIdentity);

	// postUniverClassExamine(ruleForm);
	delete ruleForm.id;
	// dialogVisible.value = false;
};

/* 审核弹窗关闭 */
const Cancel = () => {
	dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.formTb {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	flex-wrap: nowrap;
	padding: 0 20px;

	.form {
		// height: 70px;
		margin-bottom: 10px;
	}

	.table {
		height: calc(100% - 90px);
		position: relative;

		:deep(.el-card__body) {
			height: 100% !important;
		}

		:deep(.el-tag) {
			margin-bottom: 5px;
		}

		.el-table--fit {
			border-right: 0;
			border-bottom: 0;
			height: calc(100% - 70px);
			overflow: auto;
		}

		.page {
			display: inline-flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 5px;
			right: 0;
			z-index: 9999;
		}
	}
}

:deep(.el-textarea__inner) {
	height: 100px !important;
}
</style>
