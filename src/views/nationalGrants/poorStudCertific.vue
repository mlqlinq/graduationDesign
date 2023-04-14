<template>
	<div class="university">
		<el-card class="BtnCard">
			<div class="BtnCard_btns">
				<el-button type="primary" plain @click="printMyInfrom(printData)">下载我的申请表</el-button>
				<el-button type="success" slot="trigger" plain ref="uploadBtn" @click="upLoadMy">填写申请 </el-button>
			</div>
		</el-card>
		<!-- 贫困生认证 -->
		<el-card class="tableCard">
			<el-table ref="taskTableRef" :data="poorStudCertificData" :header-cell-style="{ background: '#e4e8e9', borderColor: '#cfcfcf' }" border :height="tableH" empty-text="没有数据" style="width: 100%" @select="selectClick">
				<el-table-column type="selection" width="55" align="center " />
				<el-table-column prop="create_time" label="年度" align="center " sortable />
				<el-table-column prop="school_name" label="高校名称" align="center " />
				<el-table-column prop="student_name" label="姓名" align="center " />
				<el-table-column prop="student_sex" label="性别" align="center " />
				<el-table-column prop="id_card_number" label="身份证号" align="center " />
				<el-table-column prop="student_nation" label="民族" align="center " />
				<el-table-column label="审核状态" align="center " width="160px">
					<template #default="scope">
						<el-tag type="success" effect="plain" v-if="scope.row.reasons_for_democratic_review && JSON.parse(scope.row.reasons_for_democratic_review).resource === '0'">班级审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.reasons_for_democratic_review && JSON.parse(scope.row.reasons_for_democratic_review).resource === '1'">班级审核不通过</el-tag>
						<el-tag type="info" effect="plain" v-else-if="scope.row.reasons_for_democratic_review === ''">班级未审核</el-tag>

						<el-tag type="success" effect="plain" v-if="scope.row.opinions_of_the_department && JSON.parse(scope.row.opinions_of_the_department).resource === '0'">院系审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.opinions_of_the_department && JSON.parse(scope.row.opinions_of_the_department).resource === '1'">院系审核不通过</el-tag>
						<el-tag type="info" effect="plain" v-else-if="scope.row.opinions_of_the_department === ''">院系未审核</el-tag>

						<el-tag type="success" effect="plain" v-if="scope.row.school_review_comments && JSON.parse(scope.row.school_review_comments).resource === '0'">高校审核通过</el-tag>
						<el-tag type="warning" effect="plain" v-else-if="scope.row.school_review_comments && JSON.parse(scope.row.school_review_comments).resource === '1'">高校审核不通过</el-tag>
						<el-tag type="info" effect="plain" v-else-if="scope.row.school_review_comments === ''">高校未审核</el-tag>
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
import { getMyPoorData } from "@/http/api/nationalGrants/poorStudCertific";
import { exportWord } from "@/util/tool/exportWord";

const router = useRouter();

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);
const store = useRouterStore();

const poorStudCertificData = ref([]);

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
	await getMyPoorData(query)
		.then((res) => {
			ElNotification({
				title: "提示",
				message: res.msg,
				type: "success",
				duration: 3000
			});
			if (res.data) {
				poorStudCertificData.value = res.data;
				if (poorStudCertificData.value.length === 0) {
					tableH.value = 200;
				}
			}
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

	// 预览的配置及数据
	const config: any = {
		file: "http://127.0.0.1:4090/uploads/download/1673876460544.docx", // 模板文件的地址
		filename: "家庭经济困难学生认定申请表", // 文件名称
		fileType: "docx", // 文件类型
		folder: "下载文档", // 批量下载压缩包的文件名
		data: null // 数据 (数组默认批量，对象默认单个下载）
	};
	const Datas = processData(data);

	config.data = Datas;

	exportWord(config);
	ElNotification({
		title: "提示",
		message: "下载成功",
		type: "success"
	});

	getTableData();
};

// 填写申请
const upLoadMy = () => {
	router.push("/confirmationFilling");
	sessionStorage.setItem("activePath", "/confirmationFilling");
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
			printData.value.push(element);
		}
	} else if (selection.length == 0) {
		printData.value = null;
	} else {
		printData.value = JSON.parse(JSON.stringify(row));
	}
};

/* 打印前处理数据 */
const processData = (data) => {
	data = JSON.parse(JSON.stringify(data));
	if (Array.isArray(data)) {
		let arr: any = [];
		for (let i = 0; i < data.length; i++) {
			const element = data[i];
			if (!Array.isArray(element.family_member_information)) {
				element.numberOfPeople = JSON.parse(element.family_member_information).length - element.family_member_information.split("非教育阶段").length;
				element.family_member_information = JSON.parse(element.family_member_information);
			} else {
				element.numberOfPeople = element.family_member_information.length - JSON.stringify(element.family_member_information).split("非教育阶段").length;
			}

			element.poverty = element.poverty_relief_families === "是" ? true : false;
			element.subsistence = element.subsistence_allowance === "是" ? true : false;
			element.unstable = element.unstable_families === "是" ? true : false;
			element.haveeliminated = element.have_not_eliminated_risks === "是" ? true : false;
			element.riskeliminated = element.risk_not_eliminated_by_the_family === "是" ? true : false;
			element.marginal = element.marginal_vulnerable_poor === "是" ? true : false;
			element.difficultieshave = element.difficulties_have_been_eliminated === "是" ? true : false;
			element.difficulties = element.difficulties_have_not_been === "是" ? true : false;
			element.special = element.special_poverty_relief === "是" ? true : false;
			element.martyr = element.martyr_children === "是" ? true : false;
			element.orphan = element.orphan_or_not === "是" ? true : false;

			element.employees = element.employees_with_difficulties === "是" ? true : false;
			element.single = element.single_parent_family === "是" ? true : false;

			element.preschool = element.preschool_government_funding === "是" ? true : false;
			element.compulsory = element.compulsory_education_family === "是" ? true : false;
			element.nationalaid = element.national_financial_aid === "是" ? true : false;
			element.tuition = element.tuition_reduction === "是" ? true : false;
			element.nationallastyear = element.national_financial_aid_last_year === "是" ? true : false;
			element.national = element.national_student_loan === "是" ? true : false;
			element.tuitionlastyear = element.tuition_reduction_last_year === "是" ? true : false;

			element.reasons_for_democratic_review = element.reasons_for_democratic_review !== "" ? (element.reasons_for_democratic_review instanceof Object ? element.reasons_for_democratic_review : JSON.parse(element.reasons_for_democratic_review).desc) : "";
			element.opinions_of_the_department = element.opinions_of_the_department !== "" ? (element.opinions_of_the_department instanceof Object ? element.opinions_of_the_department : JSON.parse(element.opinions_of_the_department).desc) : "";
			element.school_review_comments = element.school_review_comments !== "" ? (element.school_review_comments instanceof Object ? element.school_review_comments : JSON.parse(element.school_review_comments).desc) : "";
			arr.push(element);
		}
		return arr;
	} else {
		if (!Array.isArray(data.family_member_information)) {
			data.numberOfPeople = JSON.parse(data.family_member_information).length - data.family_member_information.split("非教育阶段").length;
			data.family_member_information = JSON.parse(data.family_member_information);
		} else {
			data.numberOfPeople = data.family_member_information.length - JSON.stringify(data.family_member_information).split("非教育阶段").length;
		}

		data.poverty = data.poverty_relief_families === "是" ? true : false;
		data.subsistence = data.subsistence_allowance === "是" ? true : false;
		data.unstable = data.unstable_families === "是" ? true : false;
		data.haveeliminated = data.have_not_eliminated_risks === "是" ? true : false;
		data.riskeliminated = data.risk_not_eliminated_by_the_family === "是" ? true : false;
		data.marginal = data.marginal_vulnerable_poor === "是" ? true : false;
		data.difficultieshave = data.difficulties_have_been_eliminated === "是" ? true : false;
		data.difficulties = data.difficulties_have_not_been === "是" ? true : false;
		data.special = data.special_poverty_relief === "是" ? true : false;
		data.martyr = data.martyr_children === "是" ? true : false;
		data.orphan = data.orphan_or_not === "是" ? true : false;

		data.employees = data.employees_with_difficulties === "是" ? true : false;
		data.single = data.single_parent_family === "是" ? true : false;

		data.preschool = data.preschool_government_funding === "是" ? true : false;
		data.compulsory = data.compulsory_education_family === "是" ? true : false;
		data.nationalaid = data.national_financial_aid === "是" ? true : false;
		data.tuition = data.tuition_reduction === "是" ? true : false;
		data.nationallastyear = data.national_financial_aid_last_year === "是" ? true : false;
		data.national = data.national_student_loan === "是" ? true : false;
		data.tuitionlastyear = data.tuition_reduction_last_year === "是" ? true : false;

		data.reasons_for_democratic_review = data.reasons_for_democratic_review !== "" ? (data.reasons_for_democratic_review instanceof Object ? data.reasons_for_democratic_review : JSON.parse(data.reasons_for_democratic_review).desc) : "";
		data.opinions_of_the_department = data.opinions_of_the_department !== "" ? (data.opinions_of_the_department instanceof Object ? data.opinions_of_the_department : JSON.parse(data.opinions_of_the_department).desc) : "";
		data.school_review_comments = data.school_review_comments !== "" ? (data.school_review_comments instanceof Object ? data.school_review_comments : JSON.parse(data.school_review_comments).desc) : "";

		return data;
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
