<template>
	<div class="formTb">
		<!-- 表单区域 -->
		<el-card class="form">
			<span>
				<el-button type="primary" icon="CirclePlus" plain @click="addUniverInform">添加高校信息</el-button>
				<el-button type="info" icon="CirclePlus" plain @click="addSecretaryInform">添加书记信息</el-button>
				<el-button type="success" icon="CirclePlus" plain @click="addGuideInform">添加导员信息</el-button>
				<el-button type="warning" icon="CirclePlus" plain @click="addStudentInform">添加学生信息</el-button>
				<el-button type="danger" icon="CirclePlus" plain @click="resetPassword">重置密码</el-button>
			</span>
			<el-form :model="form" :inline="true" label-width="90px" style="display: inline-block">
				<el-form-item label="人员搜索：" v-if="props.seeSearch" style="margin: 0">
					<el-input v-model="form.search" placeholder="搜索..." clearable />
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 表格展示 -->
		<el-card class="table">
			<el-table ref="taskTableRef" :data="getTableData" :header-cell-style="{ background: '#e4e8e9', borderColor: '#cfcfcf' }" border table-layout="fixed" row-key="value" style="width: 100%; min-height: 350px" max-height="550" @select="tableSelect">
				<el-table-column type="selection" align="center" />
				<el-table-column label="序号（ID）">
					<template #default="scope">
						<span style="display: block; text-align: center" v-if="scope.row.type === '导员' || scope.row.children.length === 0">{{ scope.row.id }}</span>
						<span v-else>{{ scope.row.id }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="value" label="名称" align="center" />
				<el-table-column prop="type" label="身份" align="center">
					<template #default="scope">
						<el-tag v-if="scope.row.type == '高校'" effect="dark">{{ scope.row.type }}</el-tag>
						<el-tag v-if="scope.row.type == '院系'" class="ml-2" effect="dark" type="success">{{ scope.row.type }}</el-tag>
						<el-tag v-if="scope.row.type == '书记'" class="ml-2" effect="dark" type="info">{{ scope.row.type }}</el-tag>
						<el-tag v-if="scope.row.type == '导员'" class="ml-2" effect="dark" type="warning">{{ scope.row.type }}</el-tag>
						<el-tag v-if="scope.row.type == '学生'" class="ml-2" effect="dark" type="danger">{{ scope.row.type }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" fixed="right">
					<template #default="scope">
						<el-tooltip content="查看信息" placement="bottom" v-if="scope.row.type !== '院系'">
							<el-button circle icon="View" type="warning" @click="seeOperation(scope.row)" />
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<Paginations class="page" :total="total" :page-size="queryInfo.pagesize" @currentPage="handleCurrentChange"></Paginations>
		</el-card>
		<!-- 查看抽屉 -->
		<el-drawer v-model="drawerData" :title="'查看' + drawerTitle + '信息'" direction="rtl" size="60%" destroy-on-close>
			<UniversityPerData :unId="rowId" v-if="drawerTitle === '高校'"></UniversityPerData>
			<SecretaryInform :unId="rowId" v-if="drawerTitle === '书记'"></SecretaryInform>
			<GuideInformation :unId="rowId" v-if="drawerTitle === '导员'"></GuideInformation>
			<StudentInform :unId="rowId" v-if="drawerTitle === '学生'"></StudentInform>
		</el-drawer>
		<!-- 上传 弹出框 -->
		<el-dialog v-model="DialogVisible" title="添加信息" :destroy-on-close="true" :close-on-click-modal="false">
			<div>
				<el-upload ref="upload" drag :action="upApi + upPath + '?idNum=' + idNum" accept=".xlsx" :show-file-list="false" :before-upload="beforeUpload" :on-success="handleSuccess">
					<el-icon class="el-icon--upload"><upload-filled /></el-icon>
					<div class="el-upload__text">将 文件 拖拽到这里 或者 <em>点击上传</em></div>
					<template #tip>
						<div class="el-upload__tip">请上传.xlsx 类型的文件。</div>
					</template>
				</el-upload>
			</div>
			<template #footer>
				<div>
					<el-button @click="DialogVisible = false">取消</el-button>
					<el-button type="primary" @click="DialogVisible = false"> 确定 </el-button>
				</div>
			</template>
		</el-dialog>
		<!-- 显示预览 -->
		<el-dialog v-model="previewDialogVisible" title="数据预览" :destroy-on-close="true" :close-on-click-modal="false" style="width: auto">
			<span>初始密码设置：</span><el-switch v-model="passValue" active-text="默认（123456）" inactive-text="按规则" />
			<el-table :data="gridData">
				<el-table-column v-for="(item, index) in tablecod[0]" :key="index" :property="tablecod[tablecod.length - 1][index]" :label="tablecod[0][index]" />
			</el-table>
			<Paginations class="Diapage" :total="Diatotal" :page-size="DiaqueryInfo.pagesize" @currentPage="DiahandleCurrentChange"></Paginations>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="previewDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="subT"> 提交 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import Paginations from "@/components/Paginations/index.vue";
import UniversityPerData from "@/views/user/from/universityInformation.vue";
import SecretaryInform from "@/views/user/from/secretaryInform.vue";
import GuideInformation from "@/views/user/from/guideInformation.vue";
import StudentInform from "@/views/user/from/personal.vue";
import { ElCard, ElTable, ElTableColumn, genFileId, type UploadInstance, type UploadProps, type UploadRawFile } from "element-plus";
import { submitInformation } from "@/http/api/user/user";
import _ from "lodash";
import { decrypt } from "@/util/tool/crypto";

interface Tree {
	id: string;
	label: string;
	value: string;
	type: string;
	// children: Tree[];
	children: any;
}

const upload = ref<UploadInstance>();
const taskTableRef: any = ref(null);
const passValue = ref(true);

const SecretaryData = ref();
const GuideData = ref();
const StudentData = ref();
const DialogVisible = ref(false);
const previewDialogVisible = ref(false);
const DiaTable: any = ref([]);
const tablecod = ref([]);
const idNum = ref(""); // 身份id
const tableRowData = ref();
const DiaqueryInfo = reactive({
	query: "", // 查询参数
	pagenum: 1, // 当前页码
	pagesize: 10 // 每页显示条数
});

const Diatotal: any = ref(0); // 总数据条数

// 监听 页码值 改变的事件
const DiahandleCurrentChange = (newPage) => {
	DiaqueryInfo.pagenum = newPage;
};
const gridData = computed(() => DiaTable.value.filter((item, index) => index < DiaqueryInfo.pagenum * DiaqueryInfo.pagesize && index >= DiaqueryInfo.pagesize * (DiaqueryInfo.pagenum - 1)));

const upApi = import.meta.env.VITE_BASE_API;
const upPath = "/univerMan/uploadFormiadble";

const props = defineProps<{
	tableData: Array<Tree>;
	seeSearch: boolean;
}>();

const drawerData = ref(false);
const drawerTitle = ref("");
const rowId = ref();

const form = reactive({
	search: ""
});

const queryInfo = reactive({
	query: "", // 查询参数
	pagenum: 1, // 当前页码
	pagesize: 10 // 每页显示条数
});

const total: any = ref(0); // 总数据条数

onMounted(() => {
	total.value = props.tableData?.length;
});

// 监听 页码值 改变的事件
const handleCurrentChange = (newPage) => {
	queryInfo.pagenum = newPage;
};

//前端限制分页（tableData为当前展示页表格）
const getTableData = computed(() =>
	props.tableData
		.filter((data) => {
			const List = !form.search || data.value.toLowerCase().includes(form.search.toLowerCase());
			return List;
		})
		.filter((item, index) => index < queryInfo.pagenum * queryInfo.pagesize && index >= queryInfo.pagesize * (queryInfo.pagenum - 1))
);

const tableSelect = (selection, row) => {
	if (selection.length === 0) {
		SecretaryData.value = {};
		GuideData.value = {};
		StudentData.value = {};
		return;
	}
	idNum.value = row.id;
	tableRowData.value = row;
	if (row.type === "高校") {
		SecretaryData.value = row;
	}
	if (row.type === "书记") {
		GuideData.value = row;
	}
	if (row.type === "导员") {
		StudentData.value = row;
	}
};

/**
 * 查看 操作
 * @param row 行数据
 */
const seeOperation = (row) => {
	drawerTitle.value = row.type;
	rowId.value = row.id;
	drawerData.value = true;
};

/**
 * 添加高校信息
 */
const addUniverInform = () => {
	DialogVisible.value = true;
};

/**
 * 添加书记信息
 */
const addSecretaryInform = () => {
	if (!SecretaryData.value.id)
		return ElNotification({
			message: "请选择所属学院！"
		});
	DialogVisible.value = true;
};

/**
 * 添加导员信息
 */
const addGuideInform = () => {
	if (!GuideData.value.id)
		return ElNotification({
			message: "请选择所属学院！"
		});
	DialogVisible.value = true;
};

/**
 * 添加学生信息
 */
const addStudentInform = () => {
	if (!StudentData.value.id)
		return ElNotification({
			message: "请选择所属导员！"
		});
	DialogVisible.value = true;
};

/**
 * 上传文件前 操作
 */
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
	if (rawFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
		ElNotification({
			message: "文件格式 不正确！请重新上传！"
		});
		return false;
	}
	return true;
};

const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
	DiaTable.value = JSON.parse(decrypt(response.data));
	tablecod.value = response.tablecod;
	Diatotal.value = JSON.parse(decrypt(response.data)).length;
	previewDialogVisible.value = true;
	ElNotification({
		message: response.msg
	});
};

const subT = async () => {
	const data: any = [];
	data.push(DiaTable.value);
	await submitInformation({ data, isP: passValue.value })
		.then((res) => {
			ElNotification({
				message: res.msg
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

/**
 * 重置密码
 */
const resetPassword = () => {};
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
		margin-bottom: 5px;

		:deep(.el-card__body) {
			padding: var(--el-card-padding);
			display: inline-flex;
			align-items: center;
		}
	}

	.table {
		height: calc(100% - 110px);
		position: relative;

		:deep(.el-card__body) {
			overflow: auto;
			height: 92%;
		}

		.page {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 10px;
			// position: absolute;
			// bottom: 18px;
			// right: 0;
		}
	}
}

.Diapage {
	display: flex;
	align-items: flex-end;
	justify-content: center;
	margin-top: 10px;
}
</style>
