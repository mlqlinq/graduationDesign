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
import { useRouter } from "vue-router";
import { useRouterStore } from "@/stores/modules/router";
import { useAuthStore } from "@/stores/modules/userToken";
import { getMyPoorData } from "@/http/api/nationalGrants/poorStudCertific";
import Moment from "moment";
import { exportWord } from "@/util/tool/exportWord";

const router = useRouter();

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);
const store = useRouterStore();

const poorStudCertificData = ref([]);

const uploadBtn: any = ref(null);
const taskTableRef: any = ref(null);

const tableH = ref(650);
let printData: any = reactive({});

const getTableData = async () => {
	const query: any = {};
	if (userData.value.id_card_number) {
		query.id_card_number = userData.value.id_card_number;
	} else if (userData.value.username) {
		query.id_card_number = userData.value.username;
	}
	console.log("🚀 ~ file: poorStudCertific.vue:65 ~ getTableData ~ query", query);
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
	if (JSON.stringify(data) == "{}")
		return ElNotification({
			title: "提示~",
			message: "请先选择要打印的表！",
			type: "warning"
		});

	// 预览的配置及数据
	const config: any = {
		file: "@/../public/1673445157685.docx", // 模板文件的地址
		filename: "下载test文档", // 文件名称
		fileType: "docx", // 文件类型
		folder: "下载测试文档", // 批量下载压缩包的文件名
		data: {} // 数据 (数组默认批量，对象默认单个下载）
	};
	config.data = data;

	exportWord(config);
	ElNotification({
		title: "提示",
		message: "下载成功",
		type: "success"
	});
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
		let del_row = selection.shift();
		taskTableRef.value.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
	}
	row.whether = row.is_comprehensive_survey == "0" ? true : false;
	row.student_birthday = Moment(row.student_birthday).format("YYYY年MM月");
	row.student_start_year = Moment(row.student_start_year).format("YYYY年MM月");
	printData = row;
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
