<template>
	<div>
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="200px" label-position="right" :disabled="disabled">
			<el-card>
				<div slot="header" class="clear-fix">
					<span>其他相关信息</span>
				</div>
				<el-row>
					<el-col :span="8">
						<el-form-item prop="per_capita_annual_income">
							<template #label>
								<el-tooltip effect="dark" content="家庭人均年收入(标准)（自行查询当地当年最低生活保障标准）" placement="bottom">
									<p style="height: 100%; width: 200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block">家庭人均年收入(标准)（自行查询当地当年最低生活保障标准）：</p>
								</el-tooltip>
							</template>
							<el-select v-model="form.per_capita_annual_income" placeholder="请选择">
								<el-option v-for="item in perCapitaAnnualIncomeOfHouseholds" :key="item.value" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭人均年收入（元）:" prop="annual_per_capita">
							<el-input v-model="form.annual_per_capita" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="accumulated_losses_three_years">
							<template #label>
								<el-tooltip effect="dark" content="家庭遭受自然灾害累计损失情况(近三年)" placement="bottom">
									<p style="height: 100%; width: 200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block">家庭遭受自然灾害累计损失情况(近三年)：</p>
								</el-tooltip>
							</template>
							<el-select v-model="form.accumulated_losses_three_years" placeholder="请选择">
								<el-option v-for="item in cumulativeLossesOfHouseholdsSufferedFromNaturalDisasters" :key="item.value" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item prop="accidents_three_years">
							<template #label>
								<el-tooltip effect="dark" content="家庭遭受意外事件累计损失情况(近三年)" placement="bottom">
									<p style="height: 100%; width: 200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block">家庭遭受意外事件累计损失情况(近三年)：</p>
								</el-tooltip>
							</template>
							<el-select v-model="form.accidents_three_years" placeholder="请选择">
								<el-option v-for="item in cumulativeLossesOfHouseholdsSufferedFromNaturalDisasters" :key="item.value" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="household_debt">
							<template #label>
								<el-tooltip effect="dark" content="家庭负债情况(不包括房贷、车贷及其他消费贷款)" placement="bottom">
									<p style="height: 100%; width: 200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; display: inline-block">家庭负债情况(不包括房贷、车贷及其他消费贷款)：</p>
								</el-tooltip>
							</template>
							<el-select v-model="form.household_debt" placeholder="请选择">
								<el-option v-for="item in householdDebt" :key="item.value" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭有哪些大额支出：" prop="large_expenditure">
							<el-select v-model="form.large_expenditure" multiple placeholder="请选择">
								<el-option v-for="item in largeHouseholdExpenditure" :key="item.value" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="家庭其他收入来源：" prop="household_income_source">
							<el-select v-model="form.household_income_source" multiple placeholder="请选择">
								<el-option v-for="item in otherSourcesOfHouseholdIncome" :key="item.id" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="学生家庭住房情况:" prop="housing_situation">
							<el-select v-model="form.housing_situation" placeholder="请选择">
								<el-option v-for="item in housingSituationOfStudentsFamilies" :key="item.id" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭是否拥有汽车：" prop="own_a_car">
							<el-select v-model="form.own_a_car" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="其他情况情况描述:" prop="other_situations">
							<el-input v-model="form.other_situations" type="textarea" />
						</el-form-item>
					</el-col>
					<el-col :span="8"> </el-col>
				</el-row>
				<div class="card-container">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>家庭遭受自然灾害累计损失情况辅助说明材料(如家庭遭受自然灾害累计损失情况填写为后3项,可在此处上传1-3张图片作为佐证，没有可不上传)</span>
						</div>
						<el-row>
							<el-col :span="8">
								<el-form-item label="辅助说明材料一：">
									<el-upload class="upload-demo" :file-list="one1" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess1" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料二：">
									<el-upload class="upload-demo" :file-list="two2" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess2" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料三：">
									<el-upload class="upload-demo" :file-list="three3" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess3" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</div>
				<div class="card-container">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>家庭遭受意外事件累计损失情况辅助说明材料(如家庭遭受意外事件累计损失情况填写为后3项,可在此处上传1-3张图片作为佐证，没有可不填)</span>
						</div>
						<el-row>
							<el-col :span="8">
								<el-form-item label="辅助说明材料一：">
									<el-upload class="upload-demo" :file-list="four4" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess4" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料二：">
									<el-upload class="upload-demo" :file-list="five5" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess5" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料三：">
									<el-upload class="upload-demo" :file-list="six6" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess6" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</div>
				<div class="card-container">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>辅助说明材料(如有可以说明家庭经济困难的相关材料可在此处上传1-3张图片，没有可不填)</span>
						</div>
						<el-row>
							<el-col :span="8">
								<el-form-item label="辅助说明材料一：">
									<el-upload class="upload-demo" :file-list="seven7" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess7" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料二：">
									<el-upload class="upload-demo" :file-list="eight8" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess8" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料三：">
									<el-upload class="upload-demo" :file-list="nine9" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess9" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</div>
			</el-card>
		</el-form>
		<el-dialog v-model="dialogVisible" destroy-on-close>
			<img :src="dialogImageUrl" alt="查看" style="width: 100%; display: block; margin: 0 auto" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/index";
import { genFileId, type FormInstance, type FormRules, type UploadInstance, type UploadProps, type UploadRawFile } from "element-plus";
import { perCapitaAnnualIncomeOfHouseholds, cumulativeLossesOfHouseholdsSufferedFromNaturalDisasters, householdDebt, largeHouseholdExpenditure, housingSituationOfStudentsFamilies, otherSourcesOfHouseholdIncome } from "@/util/tool/JsonData";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const options = [
	{
		value: "是",
		label: "是"
	},
	{
		value: "否",
		label: "否"
	}
];

const formRef = ref<FormInstance>();

const form = reactive({
	per_capita_annual_income: "",
	annual_per_capita: "",
	accumulated_losses_three_years: "",
	accidents_three_years: "",
	household_debt: "",
	large_expenditure: "",
	household_income_source: "",
	housing_situation: "",
	own_a_car: "",
	other_situations: "",
	materials_of_natural_disasters: "", // 家庭遭受自然灾害累计损失情况辅助说明材料
	accidental_materials: "", // 家庭遭受意外事件累计损失情况辅助说明材料
	auxiliary_instruction_materials: "" // 辅助说明材料
});

const disabled = ref(false);

const formRules = reactive<FormRules>({
	annual_per_capita: [{ required: true, message: "请填写完整", trigger: "blur" }],
	per_capita_annual_income: [{ required: true, message: "请选择", trigger: "change" }],
	accumulated_losses_three_years: [{ required: true, message: "请选择", trigger: "change" }],
	accidents_three_years: [{ required: true, message: "请选择", trigger: "change" }],
	household_debt: [{ required: true, message: "请选择", trigger: "change" }],
	large_expenditure: [{ required: true, message: "请选择", trigger: "change" }],
	household_income_source: [{ required: true, message: "请选择", trigger: "change" }],
	housing_situation: [{ required: true, message: "请选择", trigger: "change" }],
	own_a_car: [{ required: true, message: "请选择", trigger: "change" }]
});

onMounted(() => {
	getData();
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

const upApi = import.meta.env.VITE_BASE_API;
const upPath = "/upload/uploads/file";

const dialogVisible = ref(false);

const dialogImageUrl = ref();

const one = ref("");
const two = ref("");
const three = ref("");
const four = ref("");
const five = ref("");
const six = ref("");
const seven = ref("");
const eight = ref("");
const nine = ref("");

const one1 = ref([]);
const two2 = ref([]);
const three3 = ref([]);
const four4 = ref([]);
const five5 = ref([]);
const six6 = ref([]);
const seven7 = ref([]);
const eight8 = ref([]);
const nine9 = ref([]);

const imgurlList1: any = ref([]);
const imgurlList2: any = ref([]);
const imgurlList3: any = ref([]);

const upload = ref<UploadInstance>();

const handleAvatarSuccess1: UploadProps["onSuccess"] = (response, uploadFile) => {
	one.value = response.url;
	imgurlList1.value.push(response.url);
	form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
};

const handleAvatarSuccess2: UploadProps["onSuccess"] = (response, uploadFile) => {
	two.value = response.url;
	imgurlList1.value.push(response.url);
	form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
};

const handleAvatarSuccess3: UploadProps["onSuccess"] = (response, uploadFile) => {
	three.value = response.url;
	imgurlList1.value.push(response.url);
	form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
};

const handleAvatarSuccess4: UploadProps["onSuccess"] = (response, uploadFile) => {
	four.value = response.url;
	imgurlList2.value.push(response.url);
	form.accidental_materials = JSON.stringify(imgurlList2.value);
};

const handleAvatarSuccess5: UploadProps["onSuccess"] = (response, uploadFile) => {
	five.value = response.url;
	imgurlList2.value.push(response.url);
	form.accidental_materials = JSON.stringify(imgurlList2.value);
};

const handleAvatarSuccess6: UploadProps["onSuccess"] = (response, uploadFile) => {
	six.value = response.url;
	imgurlList2.value.push(response.url);
	form.accidental_materials = JSON.stringify(imgurlList2.value);
};

const handleAvatarSuccess7: UploadProps["onSuccess"] = (response, uploadFile) => {
	seven.value = response.url;
	imgurlList3.value.push(response.url);
	form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
};

const handleAvatarSuccess8: UploadProps["onSuccess"] = (response, uploadFile) => {
	eight.value = response.url;
	imgurlList3.value.push(response.url);
	form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
};

const handleAvatarSuccess9: UploadProps["onSuccess"] = (response, uploadFile) => {
	nine.value = response.url;
	imgurlList3.value.push(response.url);
	form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
	upload.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	upload.value!.handleStart(file);
};

// 图片预览
const handlePreview: UploadProps["onPreview"] = (uploadFile: any) => {
	dialogImageUrl.value = uploadFile.response.url!;
	dialogVisible.value = true;
};
// 删除图片
const handleRemove: UploadProps["onRemove"] = (file: any, uploadFiles) => {
	console.log(file, uploadFiles);
	if (one.value === file.response.url) {
		one.value = "";
		imgurlList1.value.splice(0, 1);
		form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
	}
	if (two.value === file.response.url) {
		two.value = "";
		if (imgurlList1.value.length === 1) {
			imgurlList1.value.splice(0, 1);
			form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 2) {
			imgurlList1.value.splice(1, 1);
			form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 3) {
			imgurlList1.value.splice(1, 1);
			form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
		}
	}
	if (three.value === file.response.url) {
		three.value = "";
		if (imgurlList1.value.length === 1) {
			imgurlList1.value.splice(0, 1);
			form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 2) {
			imgurlList1.value.splice(1, 1);
			form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 3) {
			imgurlList1.value.splice(2, 1);
			form.materials_of_natural_disasters = JSON.stringify(imgurlList1.value);
		}
	}
	if (four.value === file.response.url) {
		four.value = "";
		imgurlList2.value.splice(0, 1);
		form.accidental_materials = JSON.stringify(imgurlList2.value);
	}
	if (five.value === file.response.url) {
		five.value = "";
		if (imgurlList2.value.length === 1) {
			imgurlList2.value.splice(0, 1);
			form.accidental_materials = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 2) {
			imgurlList2.value.splice(1, 1);
			form.accidental_materials = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 3) {
			imgurlList2.value.splice(1, 1);
			form.accidental_materials = JSON.stringify(imgurlList2.value);
		}
	}
	if (six.value === file.response.url) {
		six.value = "";
		if (imgurlList2.value.length === 1) {
			imgurlList2.value.splice(0, 1);
			form.accidental_materials = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 2) {
			imgurlList2.value.splice(1, 1);
			form.accidental_materials = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 3) {
			imgurlList2.value.splice(2, 1);
			form.accidental_materials = JSON.stringify(imgurlList2.value);
		}
	}
	if (seven.value === file.response.url) {
		seven.value = "";
		imgurlList3.value.splice(0, 1);
		form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
	}
	if (eight.value === file.response.url) {
		eight.value = "";
		if (imgurlList3.value.length === 1) {
			imgurlList3.value.splice(0, 1);
			form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
		} else if (imgurlList3.value.length === 2) {
			imgurlList3.value.splice(1, 1);
			form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
		} else if (imgurlList3.value.length === 3) {
			imgurlList3.value.splice(1, 1);
			form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
		}
	}
	if (nine.value === file.response.url) {
		nine.value = "";
		if (imgurlList3.value.length === 1) {
			imgurlList3.value.splice(0, 1);
			form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
		} else if (imgurlList3.value.length === 2) {
			imgurlList3.value.splice(1, 1);
			form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
		} else if (imgurlList3.value.length === 3) {
			imgurlList3.value.splice(2, 1);
			form.auxiliary_instruction_materials = JSON.stringify(imgurlList3.value);
		}
	}
};
const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm(`确定要删除 ${uploadFile.name} ?`).then(
		() => true,
		() => false
	);
};

defineExpose({
	form,
	formRef,
	disabled,
	one1,
	two2,
	three3,
	four4,
	five5,
	six6,
	seven7,
	eight8,
	nine9
});
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

	.el-form {
		height: 100% !important;

		:deep(.el-form-item__label) {
			justify-content: flex-end !important;
			align-items: center;
		}

		.el-card {
			margin-bottom: 10px;
			width: 100% !important;

			.clear-fix {
				margin-bottom: 10px;
			}
		}
	}
	.btn {
		text-align: center;
	}
	.el-textarea :deep(.el-textarea__inner) {
		min-height: 100px !important;
		width: 300px !important;
	}
}

.card-container {
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
</style>
