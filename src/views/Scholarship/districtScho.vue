<template>
	<div class="university">
		<el-card class="BtnCard">
			<div class="BtnCard_btns">
				<el-button type="primary" plain>打印我的申请表</el-button>
				<el-button type="warning" plain @click="downLoad">下载申请表模板</el-button>
				<el-upload class="upload" ref="upload" action="#" :on-change="upLoadMy" accept=".doc,.docx" :show-file-list="false" :auto-upload="false">
					<el-button type="success" slot="trigger" plain ref="uploadBtn" @click="upLoadMy">上传我的申请表 </el-button>
				</el-upload>
			</div>
		</el-card>
		<!-- 区政府 奖学金 -->
		<el-card class="tableCard">
			<el-table ref="taskTableRef" :data="DistrictschosData" :header-cell-style="{ background: '#e4e8e9', borderColor: '#cfcfcf' }" border :height="tableH" empty-text="没有数据" style="width: 100%" @select="selectClick">
				<el-table-column type="selection" width="55" align="center " />
				<el-table-column prop="create_time" label="年度" align="center " sortable />
				<el-table-column prop="school_name" label="高校名称" align="center " />
				<el-table-column prop="college" label="院系" align="center " />
				<el-table-column prop="student_major" label="专业" align="center " />
				<el-table-column prop="student_class" label="班级" align="center " />
				<el-table-column prop="student_name" label="姓名" align="center " />
				<el-table-column prop="student_sex" label="性别" align="center " />
				<el-table-column prop="id_card_number" label="身份证号" align="center " />
				<el-table-column prop="student_no" label="学号" align="center " />
				<el-table-column prop="student_nation" label="民族" align="center " />
				<el-table-column label="审核状态" align="center " width="160px">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.opinions_of_the_department === 0">院系审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.opinions_of_the_department === 1">院系审核不通过</el-tag>

						<el-tag type="success" effect="plain" v-if="scope.row.school_opinion === 0">学校审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.school_opinion === 1">学校审核不通过</el-tag>

						<el-tag effect="plain" v-else>待审核</el-tag>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="address" label="操作记录" align="center " /> -->
			</el-table>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";
import { getDistrictschosData, downloadDistrictsch } from "@/http/api/Scholarship/districtschos";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const DistrictschosData = ref([]);

const uploadBtn: any = ref(null);
const taskTableRef: any = ref(null);
const tableH = ref(650);

const getTableData = async () => {
	const query = userData.value.id_card_number;
	await getDistrictschosData({ query })
		.then((res) => {
			ElNotification({
				title: "提示",
				message: res.msg,
				type: "success",
				duration: 3000
			});
			DistrictschosData.value = res.data;
			if (DistrictschosData.value.length === 0) {
				tableH.value = 200;
			}
		})
		.catch((err) => {
			ElNotification({
				title: "错误",
				message: err,
				type: "error",
				duration: 1500
			});
		});
};

onMounted(() => {
	getTableData();
});

const downLoad = async () => {
	await downloadDistrictsch()
		.then((res) => {
			const link = document.createElement("a"); // 创建一个 a 标签用来模拟点击事件
			link.style.display = "none";
			link.href = res.url;
			link.setAttribute("download", "区人民政府奖学金申请表.doc");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			ElNotification({
				title: "提示",
				message: res.msg,
				type: "success"
			});
		})
		.catch((err) => {
			ElNotification({
				title: "错误",
				message: err,
				type: "error",
				duration: 5500
			});
		});
};

const upLoadMy = () => {
	ElNotification({
		title: "温馨提示",
		message: "正在上传，请稍后...",
		type: "warning"
	});
};
// 主要方法
// table选择项发生变化时会触发该事件
const selectClick = (selection: any, row: any) => {
	console.log("🚀 ~ file: universityScho.vue:119 ~ selectClick ~ row", row);
	if (selection.length > 1) {
		let del_row = selection.shift();
		taskTableRef.value.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
	}
};
</script>

<style lang="scss" scoped>
.university {
	width: 97%;
	height: calc(100% - 10px);
	margin: 0 auto;

	:deep(.BtnCard) {
		height: 50px;
		margin-bottom: 10px;

		.el-card__body {
			height: 100%;
			padding: 0;

			.upload,
			.BtnCard_btns {
				height: 100%;
				display: flex;
				align-items: center;
				margin-left: 20px;
			}
		}
	}
	// 隐藏全选按钮
	:deep(.el-table th.el-table__cell:nth-child(1) .cell) {
		visibility: hidden;
	}

	:deep(.tableCard) {
		min-height: calc(100% - 70px);
		border-radius: 10px;
		// overflow: auto;

		:deep(.el-card__body) {
			// padding: 0;
			padding-bottom: 0 !important;
			// text-align: center;

			.home-bg {
				width: 80%;
				height: 100%;
				display: block;
				margin: 0 auto;
				// margin-bottom: 20px;
			}
		}
	}
}
</style>
