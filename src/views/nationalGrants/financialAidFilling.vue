<template>
	<div class="person" v-loading="loading">
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="160px" label-position="right" :disabled="disabled">
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>基本信息</span>
					</div>
					<el-row>
						<el-col :span="16">
							<el-row>
								<el-col :span="12">
									<el-form-item label="学生姓名：" prop="student_name">
										<el-input v-model="form.student_name" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="性别：" prop="student_sex">
										<el-select v-model="form.student_sex">
											<el-option label="男" value="男" />
											<el-option label="女" value="女" />
											<el-option label="其他" value="其他" />
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="民族：" prop="student_nation">
										<el-select v-model="form.student_nation">
											<el-option v-for="item in studentNationList" :key="item.id" :label="item.value" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="出生日期：" prop="student_birthday" v-if="!route.query.Num">
										<el-config-provider :locale="zhCn">
											<el-date-picker v-model="form.student_birthday" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
										</el-config-provider>
									</el-form-item>
									<el-form-item label="专业名称：" prop="student_major" v-if="route.query.Num">
										<el-select v-model="form.student_major">
											<el-option v-for="item in majorList" :key="item.id" :label="item.value" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="身份证号：" prop="id_card_number">
										<el-input v-model="form.id_card_number" />
									</el-form-item>
								</el-col>
								<el-col :span="12"
									><el-form-item label="联系电话：" prop="contact_number">
										<el-input v-model="form.contact_number" />
									</el-form-item>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="8" class="my_avatar">
							<el-form-item label="个人照：" class="uploader">
								<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" style="width: 100px; height: 140px" />
								<el-button v-if="form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">更换</el-button>
								<span v-if="!form.imageUrl">无</span>
								<el-button v-if="!form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">上传</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="高校名称：" prop="university_name">
								<el-input v-model="form.university_name" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="院系名称：" prop="student_college">
								<el-select v-model="form.student_college">
									<el-option v-for="item in collegeList" :key="item.id" :label="item.value" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="专业名称：" prop="student_major" v-if="!route.query.Num">
								<el-select v-model="form.student_major">
									<el-option v-for="item in majorList" :key="item.id" :label="item.value" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="班级名称：" prop="class_name">
								<el-input v-model="form.class_name" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="学号：" prop="student_no">
								<el-input v-model="form.student_no" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="入学年月：" prop="student_start_year">
								<el-config-provider :locale="zhCn">
									<el-date-picker v-model="form.student_start_year" type="month" format="YYYY-MM" value-format="YYYY-MM" />
								</el-config-provider>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="政治面貌：" prop="political_outlook">
								<el-select v-model="form.political_outlook">
									<el-option v-for="item in politicalOutlookList" :key="item.id" :label="item.value" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="学制：" prop="educational_system">
								<el-select v-model="form.educational_system">
									<el-option v-for="item in educationalList" :key="item.id" :label="item.data" :value="item.data" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="申请等级：" prop="application_level">
								<el-select v-model="form.application_level">
									<el-option label="2300" value="2300" />
									<el-option label="4300" value="4300" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-card>
				<div class="card-container">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>家庭经济情况</span>
						</div>
						<el-row>
							<el-col :span="8">
								<el-form-item label="家庭户口：" prop="nature_of_household_registration">
									<el-select v-model="form.nature_of_household_registration">
										<el-option v-for="item in householdList" :key="item.id" :label="item.value" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="家庭人口数：" prop="total_house_p">
									<el-input v-model="form.total_house_p" />
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="家庭月总收入(元):" prop="per_capita_annual_income">
									<el-input v-model="form.per_capita_annual_income" />
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="人均月收入(元)：" prop="annual_per_capita">
									<el-input v-model="form.annual_per_capita" />
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="家庭其他收入来源：" prop="source_of_income">
									<el-select v-model="form.source_of_income" multiple placeholder="请选择">
										<el-option v-for="item in otherSourcesOfHouseholdIncome" :key="item.id" :label="item.value" :value="item.value" />
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="家庭邮编：" prop="home_zip_code">
									<el-input v-model="form.home_zip_code" />
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="家庭地址：" prop="home_address">
									<el-input v-model="form.home_address" />
								</el-form-item>
							</el-col>
							<el-col :span="8"> </el-col>
							<el-col :span="8"> </el-col>
						</el-row>
						<!-- 成员信息表 -->
						<el-form-item label-width="0px" v-if="route.query.Num">
							<edit-table :columns="column" :data="list" ref="table" style="width: 100%" />
						</el-form-item>
					</el-card>
				</div>

				<div class="card-container">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>申请理由</span>
						</div>
						<el-form-item label="" label-width="0" prop="reason_for_application">
							<el-input v-model="form.reason_for_application" type="textarea" maxlength="200" />
						</el-form-item>
					</el-card>
				</div>
			</div>
		</el-form>
		<div class="btn">
			<el-button type="primary" @click="Diaisible = true" v-if="route.query.Num">
				提交审核<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
			</el-button>
			<el-button type="primary" @click="submitForm(formRef)" v-else>
				提交申请<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
			</el-button>
		</div>

		<!-- 审核弹窗 -->
		<el-dialog v-model="Diaisible" width="800px" center draggable :close-on-click-modal="false">
			<div>
				<el-form ref="ruleFormRef" :model="DiaRuleFormRef" label-width="200px" label-position="top" class="demo-ruleForm" status-icon>
					<template #header>
						<div class="my-header">
							<h4>提交审核</h4>
							<el-button icon="Search" circle />
						</div>
					</template>
					<el-form-item label="是否同意：">
						<el-radio-group v-model="DiaruleForm.resource">
							<el-radio label="0" value="0">同意</el-radio>
							<el-radio label="1" value="1">驳回</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="审核意见（或推荐理由）：" v-if="userData.userIdentity === '2' && DiaruleForm.resource === '0'">
						<el-input class="DiaInp" v-model="DiaruleForm.desc" />
						<el-select v-model="DiaValue" placeholder="请选择" @change="DiasetVal">
							<el-option v-for="item in typeOfDifficulty" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="审核意见（或推荐理由）：" v-else-if="DiaruleForm.resource === '0'">
						<el-input v-model="DiaruleForm.desc" type="textarea" />
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="DaiVisi">取消</el-button>
					<el-button type="primary" @click="submitForReview"> 提交 </el-button>
				</span>
			</template>
		</el-dialog>
		<AvatarCropper :dialogVisible="dialogVisibles" :url="form.imageUrl" @upRrl="getUrl" @parentChang="parentChang"></AvatarCropper>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";
import AvatarCropper from "@/components/VueCropper/index.vue";
import { studentNationList, educationalList, majorList, politicalOutlookList, householdList, otherSourcesOfHouseholdIncome, collegeList } from "@/util/tool/JsonData";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { submitMyApplyData } from "@/http/api/nationalGrants/applyAid";
import { useTabsStore } from "@/stores/index";
import toE from "@/util/Scholarship/toE";
const { postApplyAidClassExamine, postApplyAidDepartmentExamine, postApplyAidSchoolExamine } = toE();

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);
const formRef = ref<FormInstance>();

const storesTabs = useTabsStore();

const router = useRouter();
const route = useRoute();

const loading = ref(true);

const form = reactive({
	university_name: "",
	student_college: "",
	student_no: "",
	student_start_year: "",
	grade: "",
	class_name: "",
	student_major: "",
	student_name: "",
	political_outlook: "",
	id_card_number: "",
	student_sex: "",
	student_nation: "",
	home_address: "",
	total_house_p: "",
	contact_number: "",
	family_member_information: "", // 家庭成员信息
	per_capita_annual_income: "",
	annual_per_capita: "",
	home_zip_code: "",
	nature_of_household_registration: "",
	application_level: "",
	source_of_income: "",
	reason_for_application: "",
	student_birthday: "",
	educational_system: "",
	imageUrl: ""
});

let formRules = reactive<FormRules>({
	student_name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
	student_sex: [{ required: true, message: "请选择您的性别", trigger: "change" }],
	student_birthday: [{ required: true, message: "请选择您的出生日期", trigger: "change" }],
	student_nation: [{ required: true, message: "请选择您的民族", trigger: "change" }],
	id_card_number: [{ required: true, message: "请输入您的身份证号", trigger: "blur" }],
	contact_number: [{ required: true, message: "请输入您的联系电话", trigger: "blur" }],
	university_name: [{ required: true, message: "请输入您的学校名称", trigger: "blur" }],
	student_college: [{ required: true, message: "请选择您的所属学院", trigger: "change" }],
	student_major: [{ required: true, message: "请选择您的专业名称", trigger: "change" }],
	class_name: [{ required: true, message: "请输入您的班级名称", trigger: "blur" }],
	student_no: [{ required: true, message: "请输入您的学号", trigger: "blur" }],
	student_start_year: [{ required: true, message: "请选择您的入学年月", trigger: "change" }],
	political_outlook: [{ required: true, message: "请选择您的政治面貌", trigger: "change" }],
	educational_system: [{ required: true, message: "请选择您的学制", trigger: "change" }],
	application_level: [{ required: true, message: "请选择申请等级", trigger: "change" }],
	nature_of_household_registration: [{ required: true, message: "请选择您的家庭户口类型", trigger: "change" }],
	total_house_p: [{ required: true, message: "请输入家庭人口数", trigger: "blur" }],
	per_capita_annual_income: [{ required: true, message: "请输入家庭月总收入", trigger: "blur" }],
	annual_per_capita: [{ required: true, message: "请输入人均月收入", trigger: "blur" }],
	home_zip_code: [{ required: true, message: "请输入人均月收入", trigger: "blur" }],
	home_address: [{ required: true, message: "请输入人均月收入", trigger: "blur" }]
});

// 动态表格 设置
const column = [
	{ name: "name", label: "姓名", width: "auto", align: "center" },
	{ name: "parentIDNum", label: "家长身份证号", width: "auto", align: "center" },
	{ name: "age", label: "年龄", width: "auto", align: "center" },
	{ name: "call", label: "称呼", width: "auto", align: "center" },
	{ name: "currentEducation", label: "当前所处教育阶段	", width: "auto", align: "center" },
	{ name: "occupation", label: "职业", width: "auto", align: "center" },
	{ name: "wSUnit", label: "工作（学习）单位", width: "auto", align: "center" },
	{ name: "annualIncome", label: "年收入（元）", width: "auto", align: "center" },
	{ name: "health", label: "健康状况", width: "auto", align: "center" },
	{ name: "healthDescription", label: "健康情况描述", width: "auto", align: "center" }
];

const list = ref([{ name: "", parentIDNum: "", age: "", call: "", currentEducation: "", occupation: "", wSUnit: "", annualIncome: "", health: "", healthDescription: "" }]);

const disabled = ref(false);

const Diaisible = ref(false);

const DiaRuleFormRef = ref<FormInstance>();
const DiaruleForm = reactive({
	resource: "0",
	desc: "",
	Alldesc: ""
});

if (userData.value.userIdentity === "1") {
	DiaruleForm.desc = "经评审，并在校内公示5个工作日，无异议，现报请同意该同学获得国家助学金。";
} else if (userData.value.userIdentity === "2") {
	DiaruleForm.desc = "情况属实，同意该生审评";
} else if (userData.value.userIdentity === "3") {
	DiaruleForm.desc = "情况属实，该生确定是经济困难学生！";
}

const dialogVisibles = ref(false);

const typeOfDifficulty = [
	{
		value: "一等助学金",
		label: "一等助学金"
	},
	{
		value: "二等助学金",
		label: "二等助学金"
	}
];
const DiaValue = ref("");

const DiasetVal = (val) => {
	DiaruleForm.desc = "情况属实，同意该生审评 ";
	DiaruleForm.Alldesc = DiaruleForm.desc + val;
};

const getCropper = () => {
	dialogVisibles.value = true;
};

const getUrl = (url) => {
	if (url === "") return;
	form.imageUrl = url;
};

const parentChang = (bool) => {
	dialogVisibles.value = bool;
};

onMounted(() => {
	loading.value = false;
	if ("data" in route.meta || sessionStorage.getItem("PreData")) {
		disabled.value = true;
		auditEcho();
	} else {
		getData();
	}
});

const getData = () => {
	for (const key in form) {
		if (Object.prototype.hasOwnProperty.call(form, key)) {
			for (const s in userData.value) {
				if (Object.prototype.hasOwnProperty.call(userData.value, s)) {
					if (key === s) {
						form[key] = userData.value[s];
					}
				}
			}
		}
	}
};

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl
		.validate(async (valid, fields) => {
			if (valid) {
				console.log("submit!");
				const data = form;
				await submitMyApplyData(data).then((result) => {
					ElNotification({
						title: "温馨提示",
						message: result.msg,
						type: "success"
					});
					// 关闭当前页面
					const index = storesTabs.getTansList.findIndex((item) => item.path === "/financialAidFilling");
					storesTabs.handleClose(index);
					// 返回上一页面
					router.go(-1);
				});
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

/**
 * 数据回显
 */
const auditEcho = () => {
	if ("data" in route.meta || sessionStorage.getItem("PreData")) {
		formRules = {};
		let data: any = route.meta.data;
		data ? sessionStorage.setItem("PreData", JSON.stringify(data)) : {};
		if (!data) {
			data = JSON.parse(sessionStorage.getItem("PreData"));
		}
		for (const key in form) {
			if (Object.prototype.hasOwnProperty.call(form, key)) {
				for (const s in data) {
					if (Object.prototype.hasOwnProperty.call(data, s)) {
						if (key === s) {
							form[key] = data[s];
						}
						key === "university_name" ? (form[key] = data.school_name) : "";
						key === "student_college" ? (form[key] = data.college) : "";
						key === "source_of_income" ? (form[key] = JSON.parse(data.source_of_income)) : "";
						data.family_member_information === "" ? "" : (list.value = JSON.parse(data.family_member_information));
					}
				}
			}
		}
	}
};

/**
 * 提交审核
 */
const submitForReview = () => {
	if (DiaValue.value === "")
		return ElNotification({
			title: "提示~",
			message: "请选择助学金类型！",
			type: "warning"
		});

	const data: any = JSON.parse(JSON.stringify(DiaruleForm));
	const idNum = route.query.Num;

	if (userData.value.userIdentity === "1") {
		postApplyAidSchoolExamine({ ...data, ...route.query });
	} else if (userData.value.userIdentity === "2") {
		postApplyAidDepartmentExamine({ ...data, ...route.query });
	} else if (userData.value.userIdentity === "3") {
		postApplyAidClassExamine({ ...data, ...route.query });
	}
	// 关闭当前页面
	const index = storesTabs.getTansList.findIndex((item) => item.path === "/confirmationFilling");
	storesTabs.handleClose(index);
	// 返回上一页面
	router.go(-1);
	Diaisible.value = false;
};

/** 审核弹窗关闭 */
const DaiVisi = () => {
	Diaisible.value = false;
};
</script>

<style lang="scss" scoped>
.el-select,
:deep(.el-date-editor.el-input),
.el-input {
	width: 260px !important;
}

.person {
	height: 100%;
	padding: 0 20px;
	overflow: auto;

	.btn {
		text-align: center;
		margin-bottom: 20px;
	}
	.el-textarea :deep(.el-textarea__inner) {
		min-height: 100px !important;
	}
	.card-container {
		.clear-fix {
			margin-bottom: 20px;
		}

		.el-card {
			margin-bottom: 10px;
			width: 100% !important;
			min-height: calc(100% - 10px);
			border-radius: 10px;
		}

		.my_avatar {
			display: inline-block;

			:deep(.uploader) {
				align-items: center;
				height: 120px;

				.el-form-item__content {
					:deep(.avatar-uploader) {
						background-color: #8c939d;
						.el-upload {
							border: 1px dashed var(--el-border-color);
							border-radius: 6px;
							position: relative;
							overflow: hidden;
							transition: var(--el-transition-duration-fast);
							// cursor: pointer;

							:deep(.avatar) {
								z-index: 99999;
								height: 100px;
								width: 100%;
								pointer-events: none;
							}
						}
					}
				}

				.avatar-uploader .el-upload:hover {
					border-color: var(--el-color-primary);
				}

				:deep(.el-icon.avatar-uploader-icon) {
					font-size: 28px;
					color: #8c939d;
					width: 150px;
					height: 150px;
					text-align: center;
				}
			}
		}
	}
}
</style>
