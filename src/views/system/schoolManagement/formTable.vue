<template>
	<div class="formTb">
		<el-card class="form"></el-card>
		<el-card class="table">
			<el-table :data="getTableData()" border stripe style="width: 100%">
				<el-table-column prop="date" label="Date" width="180" />
				<el-table-column prop="name" label="Name" width="180" />
				<el-table-column prop="address" label="Address" />
			</el-table>
			<Paginations class="page" :total="total" :page-size="queryInfo.pagesize" @currentPage="handleCurrentChange"> </Paginations>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import Paginations from "@/components/Paginations/index.vue";

const tableData = [
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	}
];
const queryInfo = reactive({
	query: "", // 查询参数
	pagenum: 1, // 当前页码
	pagesize: 10 // 每页显示条数
});
const total = ref(0); // 总数据条数

onMounted(() => {
	total.value = tableData.length;
});

// 监听 页码值 改变的事件
const handleCurrentChange = (newPage) => {
	queryInfo.pagenum = newPage;
};

//前端限制分页（tableData为当前展示页表格）
const getTableData = () => {
	return tableData.filter((item, index) => index < queryInfo.pagenum * queryInfo.pagesize && index >= queryInfo.pagesize * (queryInfo.pagenum - 1));
};
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
