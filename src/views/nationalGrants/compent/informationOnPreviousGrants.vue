<template>
	<div>
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="180px" label-position="right">
			<el-card>
				<div slot="header" class="clear-fix">
					<span>曾获国家教育资助信息</span>
				</div>
				<el-row>
					<el-col :span="8">
						<el-form-item label="学前政府资助：" prop="preschool_government_funding">
							<el-select v-model="form.preschool_government_funding" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="义务教育家庭经济困难学生生活补助：" label-width="280px" prop="compulsory_education_family">
							<el-select v-model="form.compulsory_education_family" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="高中(含中职)国家助学金：" label-width="245px" prop="national_financial_aid">
							<el-select v-model="form.national_financial_aid" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="高中减免学费：" prop="tuition_reduction">
							<el-select v-model="form.tuition_reduction" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="本专科上学年国家助学金：" label-width="280px" prop="national_financial_aid_last_year">
							<el-select v-model="form.national_financial_aid_last_year" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="本专科上学年国家助学贷款：" label-width="245px" prop="national_student_loan">
							<el-select v-model="form.national_student_loan" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="本专科上学年减免学费：" prop="tuition_reduction_last_year">
							<el-select v-model="form.tuition_reduction_last_year" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8"> </el-col>
					<el-col :span="8"> </el-col>
				</el-row>
			</el-card>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/index";
import type { FormInstance, FormRules } from "element-plus";
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
	preschool_government_funding: "",
	compulsory_education_family: "",
	national_financial_aid: "",
	tuition_reduction: "",
	national_financial_aid_last_year: "",
	national_student_loan: "",
	tuition_reduction_last_year: ""
});

const formRules = reactive<FormRules>({
	preschool_government_funding: [{ required: true, message: "请选择", trigger: "change" }],
	compulsory_education_family: [{ required: true, message: "请选择", trigger: "change" }],
	national_financial_aid: [{ required: true, message: "请选择", trigger: "change" }],
	tuition_reduction: [{ required: true, message: "请选择", trigger: "change" }],
	national_financial_aid_last_year: [{ required: true, message: "请选择", trigger: "change" }],
	national_student_loan: [{ required: true, message: "请选择", trigger: "change" }],
	tuition_reduction_last_year: [{ required: true, message: "请选择", trigger: "change" }]
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

defineExpose({
	form,
	formRef
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
