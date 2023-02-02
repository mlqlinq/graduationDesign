<template>
	<div class="formTb">
		<el-card class="form">
			<el-form :model="form" label-width="140px">
				<el-form-item label="筛选奖学金种类：">
					<el-select v-model="form.selectValue" clearable placeholder="请选择分类" size="large">
						<el-option v-for="item in shipOptions" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="table">
			<el-table :data="filterTableData" border stripe style="width: 100%">
				<el-table-column prop="student_name" label="学生姓名" />
				<el-table-column prop="type" label="申请类型">
					<template #default="scope">
						<div v-if="scope.row.type === '1'">校奖学金</div>
						<div v-if="scope.row.type === '2'">区奖学金</div>
						<div v-if="scope.row.type === '3'">国家奖学金</div>
						<div v-if="scope.row.type === '4'">国家励志奖学金</div>
					</template>
				</el-table-column>
				<el-table-column prop="student_sex" label="性别" />
				<el-table-column prop="student_class" label="班级">
					<template #default="scope">
						<div v-if="!scope.row.student_class">{{ scope.row.class_name }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="id_card_number" label="身份证号码" />
				<el-table-column prop="political_outlook" label="政治面貌" />
				<el-table-column label="操作" align="center " width="200px">
					<template #default="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
						<el-button size="small" type="primary" @click="handleExamine(scope.$index, scope.row)">审核</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
					</template>
				</el-table-column>
			</el-table>
			<Paginations class="page" :total="total" :page-size="queryInfo.pagesize" @currentPage="handleCurrentChange"> </Paginations>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import Paginations from "@/components/Paginations/index.vue";
import { getShipData } from "@/http/api/Scholarship/allship";
import router from "@/router";

watch(
	() => props.major,
	(newValue, oldValue) => {
		if (newValue !== oldValue) {
			getAllData();
		}
	}
);

const getAllData = async () => {
	console.log(props.major);

	await getShipData(props.major)
		.then((result) => {
			tableData.value = result.data;
			total.value = result.total;
		})
		.catch((err) => {
			console.log(err);
		});
};

defineExpose({
	getAllData
});

const form = reactive({
	selectValue: ""
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

const tableData: any = ref([]);

const queryInfo = reactive({
	query: "", // 查询参数
	pagenum: 1, // 当前页码
	pagesize: 10 // 每页显示条数
});
const total = ref(0); // 总数据条数

onMounted(() => {
	total.value = tableData.value.length;
});

// 监听 页码值 改变的事件
const handleCurrentChange = (newPage) => {
	queryInfo.pagenum = newPage;
};

//前端限制分页（tableData为当前展示页表格）
const getTableData = () => {
	return tableData.value.filter((item, index) => index < queryInfo.pagenum * queryInfo.pagesize && index >= queryInfo.pagesize * (queryInfo.pagenum - 1));
};

const filterTableData = computed(() => tableData.value.filter((data) => !form.selectValue || data.type.toLowerCase().includes(form.selectValue.toLowerCase())));

const handleEdit = (index, row) => {
	if (row.type === "1") {
		router.push("/fillInTheApplication");
	}
};
const handleExamine = (index, row) => {};
const handleDelete = (index, row) => {};
</script>

<style lang="scss" scoped>
.formTb {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	flex-wrap: nowrap;

	.form {
		height: 100px;
		margin-bottom: 10px;
	}

	.table {
		height: calc(100% - 110px);
		position: relative;

		.page {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 50px;
			right: 0;
		}
	}
}
</style>
