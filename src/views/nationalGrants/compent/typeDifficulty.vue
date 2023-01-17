<template>
	<div>
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="250px" label-position="right">
			<el-card>
				<div slot="header" class="clear-fix">
					<span>困难类型</span>
				</div>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否脱贫家庭：" prop="poverty_relief_families">
							<el-select v-model="form.poverty_relief_families" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否城乡低保：" prop="subsistence_allowance">
							<el-select v-model="form.subsistence_allowance" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否城乡特困救助供养：" prop="special_poverty_relief">
							<el-select v-model="form.special_poverty_relief" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否脱贫不稳定家庭已消除风险：" prop="unstable_families">
							<el-select v-model="form.unstable_families" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否脱贫不稳定家庭未消除风险：" prop="have_not_eliminated_risks">
							<el-select v-model="form.have_not_eliminated_risks" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否边缘易致贫户家庭未消除风险：" prop="marginal_vulnerable_poor">
							<el-select v-model="form.marginal_vulnerable_poor" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否边缘易致贫户家庭已消除风险：" prop="risk_not_eliminated_by_the_family">
							<el-select v-model="form.risk_not_eliminated_by_the_family" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否烈士子女：" prop="martyr_children">
							<el-select v-model="form.martyr_children" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否孤儿（含事实无人抚养儿童）：" prop="orphan_or_not">
							<el-select v-model="form.orphan_or_not" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否建档困难职工家庭学生：" prop="employees_with_difficulties">
							<el-select v-model="form.employees_with_difficulties" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否突发严重困难户已消除风险：" prop="difficulties_have_been_eliminated">
							<el-select v-model="form.difficulties_have_been_eliminated" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否突发严重困难户未消除风险：" prop="difficulties_have_not_been">
							<el-select v-model="form.difficulties_have_not_been" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="是否突发事件致贫家庭：" prop="caused_by_emergencies">
							<el-select v-model="form.caused_by_emergencies" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="是否单亲家庭：" prop="single_parent_family">
							<el-select v-model="form.single_parent_family" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
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
	poverty_relief_families: "",
	subsistence_allowance: "",
	special_poverty_relief: "",
	unstable_families: "",
	have_not_eliminated_risks: "",
	marginal_vulnerable_poor: "",
	risk_not_eliminated_by_the_family: "",
	martyr_children: "",
	orphan_or_not: "",
	employees_with_difficulties: "",
	difficulties_have_been_eliminated: "",
	difficulties_have_not_been: "",
	caused_by_emergencies: "",
	single_parent_family: ""
});

const formRules = reactive<FormRules>({
	poverty_relief_families: [{ required: true, message: "请选择", trigger: "change" }],
	subsistence_allowance: [{ required: true, message: "请选择", trigger: "change" }],
	special_poverty_relief: [{ required: true, message: "请选择", trigger: "change" }],
	unstable_families: [{ required: true, message: "请选择", trigger: "change" }],
	have_not_eliminated_risks: [{ required: true, message: "请选择", trigger: "change" }],
	marginal_vulnerable_poor: [{ required: true, message: "请选择", trigger: "change" }],
	risk_not_eliminated_by_the_family: [{ required: true, message: "请选择", trigger: "change" }],
	martyr_children: [{ required: true, message: "请选择", trigger: "change" }],
	orphan_or_not: [{ required: true, message: "请选择", trigger: "change" }],
	employees_with_difficulties: [{ required: true, message: "请选择", trigger: "change" }],
	difficulties_have_been_eliminated: [{ required: true, message: "请选择", trigger: "change" }],
	difficulties_have_not_been: [{ required: true, message: "请选择", trigger: "change" }],
	caused_by_emergencies: [{ required: true, message: "请选择", trigger: "change" }],
	single_parent_family: [{ required: true, message: "请选择", trigger: "change" }]
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
