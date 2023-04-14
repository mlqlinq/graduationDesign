<template>
	<div class="university">
		<el-card class="BtnCard">
			<div class="BtnCard_btns">
				<el-button type="primary" plain @click="printMyInfrom(printData)">下载我的申请表</el-button>
				<el-button type="warning" plain @click="downLoad">下载申请表模板</el-button>
				<el-button type="success" slot="trigger" plain ref="uploadBtn" @click="upLoadMy">填写申请 </el-button>
			</div>
		</el-card>
		<!-- 校奖学金 -->
		<el-card class="tableCard">
			<el-table ref="taskTableRef" :data="universitySchoData" :header-cell-style="{ background: '#e4e8e9', borderColor: '#cfcfcf' }" border :height="tableH" style="width: 100%" @select="selectClick">
				<el-table-column type="selection" width="55" align="center " />
				<el-table-column prop="create_time" label="申请时间" align="center " sortable />
				<el-table-column prop="student_name" label="姓名" align="center " />
				<el-table-column prop="id_card_number" label="身份证号" align="center " />
				<el-table-column prop="school_name" label="高校名称" align="center " />
				<el-table-column prop="college" label="院系" align="center " />
				<el-table-column prop="student_major" label="专业" align="center " />
				<el-table-column prop="student_class" label="班级" align="center " />
				<el-table-column prop="student_no" label="学生证号" align="center " />
				<el-table-column prop="student_sex" label="性别" align="center " />
				<el-table-column prop="student_nation" label="民族" align="center " />
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
				<!-- <el-table-column prop="address" label="操作记录" align="center " /> -->
			</el-table>
		</el-card>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useRouterStore } from "@/stores/modules/router";
import { useAuthStore } from "@/stores/modules/userToken";
import { getUniversityScho, downloadApplicationForm } from "@/http/api/Scholarship/Scholarship";
import Moment from "moment";
import { exportWord } from "@/util/tool/exportWord";

const router = useRouter();
const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);
const store = useRouterStore();

const universitySchoData = ref([]);

const uploadBtn: any = ref(null);
const taskTableRef: any = ref(null);

const tableH = ref(650);
let printData: any = ref(null);

const getTableData = async () => {
	const query: any = {};
	if (userData.value.id_card_number) {
		query.id_card_number = userData.value.id_card_number;
	} else if (userData.value.username) {
		query.id_card_number = userData.value.username;
	}
	await getUniversityScho(query)
		.then((res) => {
			ElNotification({
				title: "提示",
				message: res.msg,
				type: "success",
				duration: 3000
			});
			universitySchoData.value = res.data;
		})
		.catch((err) => {
			ElNotification({
				title: "错误",
				message: err,
				type: "error"
			});
		});
};

onMounted(() => {
	getTableData();
});

// 打印事件
const printMyInfrom = async (data) => {
	if (!data)
		return ElNotification({
			title: "提示~",
			message: "请先选择要打印的表！",
			type: "warning"
		});
	if (Array.isArray(data)) {
		// 预览的配置及数据
		let config: any = {
			file: "@/../public/1673440587046.docx", // 模板文件的地址
			filename: "优秀学生奖学金审批表", // 文件名称
			fileType: "docx", // 文件类型
			folder: "下载文档", // 批量下载压缩包的文件名
			data: null // 数据 (数组默认批量，对象默认单个下载）
		};
		// for (let i = 0; i < data.length; i++) {
		// 	const element = data[i];

		// 	element.class_opinion = element.class_opinion !== "" ? JSON.parse(element.class_opinion).desc : "";
		// 	element.opinions_of_the_department = element.opinions_of_the_department !== "" ? JSON.parse(element.opinions_of_the_department).desc : "";
		// 	element.school_opinion = element.school_opinion !== "" ? JSON.parse(element.school_opinion).desc : "";
		// }
		config.data = data;

		await exportWord(config);
		ElNotification({
			title: "提示",
			message: "下载成功",
			type: "success"
		});

		getTableData();
	} else {
		// 预览的配置及数据
		const config: any = {
			file: "http://127.0.0.1:4090/uploads/download/1673440587046.docx", // 模板文件的地址
			filename: "优秀学生奖学金审批表", // 文件名称
			fileType: "docx", // 文件类型
			folder: "下载文档", // 批量下载压缩包的文件名
			data: {} // 数据 (数组默认批量，对象默认单个下载）
		};

		// data.class_opinion = data.class_opinion !== "" ? JSON.parse(data.class_opinion).desc : "";
		// data.opinions_of_the_department = data.opinions_of_the_department !== "" ? JSON.parse(data.opinions_of_the_department).desc : "";
		// data.school_opinion = data.school_opinion !== "" ? JSON.parse(data.school_opinion).desc : "";
		config.data = data;

		exportWord(config);
		ElNotification({
			title: "提示",
			message: "下载成功",
			type: "success"
		});

		getTableData();
	}
};

// 主要方法
// table选择项发生变化时会触发该事件
const selectClick = (selection: any, row: any) => {
	if (selection.length > 1) {
		// let del_row = selection.shift();
		// taskTableRef.value.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
		printData.value = [];
		for (let i = 0; i < selection.length; i++) {
			const element = JSON.parse(JSON.stringify(selection[i]));
			element.whether = element.is_comprehensive_survey == "0" ? true : false;
			element.student_birthday = Moment(element.student_birthday).format("YYYY年MM月");
			element.student_start_year = Moment(element.student_start_year).format("YYYY年MM月");
			element.class_opinion = element.class_opinion !== "" ? (element.class_opinion instanceof Object ? element.class_opinion : JSON.parse(element.class_opinion).desc) : "";
			element.opinions_of_the_department = element.opinions_of_the_department !== "" ? (element.opinions_of_the_department instanceof Object ? element.opinions_of_the_department : JSON.parse(element.opinions_of_the_department).desc) : "";
			element.school_opinion = element.school_opinion !== "" ? (element.school_opinion instanceof Object ? element.school_opinion : JSON.parse(element.school_opinion).desc) : "";
			printData.value.push(element);
		}
	} else if (selection.length == 0) {
		printData.value = null;
	} else {
		row = JSON.parse(JSON.stringify(row));
		row.whether = row.is_comprehensive_survey == "0" ? true : false;
		row.student_birthday = Moment(row.student_birthday).format("YYYY年MM月");
		row.student_start_year = Moment(row.student_start_year).format("YYYY年MM月");
		row.class_opinion = row.class_opinion !== "" ? (row.class_opinion instanceof Object ? row.class_opinion : JSON.parse(row.class_opinion).desc) : "";
		row.opinions_of_the_department = row.opinions_of_the_department !== "" ? (row.opinions_of_the_department instanceof Object ? row.opinions_of_the_department : JSON.parse(row.opinions_of_the_department).desc) : "";
		row.school_opinion = row.school_opinion !== "" ? (row.school_opinion instanceof Object ? row.school_opinion : JSON.parse(row.school_opinion).desc) : "";
		printData.value = row;
	}
	console.log(printData.value);
};
const downLoad = async () => {
	await downloadApplicationForm()
		.then((res) => {
			const link = document.createElement("a"); // 创建一个 a 标签用来模拟点击事件
			link.style.display = "none";
			link.href = res.url;
			link.setAttribute("download", "校优秀学生奖学金审批表.doc");
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

// 填写申请
const upLoadMy = () => {
	router.push("/fillInTheApplication");
	sessionStorage.setItem("activePath", "/fillInTheApplication");
	store.handleParams({ im: 1 });
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
