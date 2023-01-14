<template>
	<div class="person">
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="130px" label-position="right">
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
									<el-form-item label="出生日期：" prop="student_birthday">
										<el-config-provider :locale="zhCn">
											<el-date-picker v-model="form.student_birthday" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
										</el-config-provider>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="民族：" prop="student_nation">
										<el-select v-model="form.student_nation">
											<el-option v-for="item in studentNationList" :key="item.id" :label="item.value" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="联系电话：" prop="contact_number">
										<el-input v-model="form.contact_number" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="身份证号：" prop="id_card_number">
										<el-input v-model="form.id_card_number" />
									</el-form-item>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="8" class="my_avatar">
							<el-form-item label="个人照：" class="uploader" prop="imageUrl">
								<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" style="width: 100px; height: 140px" />
								<el-button v-if="form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">更换</el-button>
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
							<el-form-item label="班级名称：" prop="class_name">
								<el-input v-model="form.class_name" />
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
							<el-form-item label="入学时间：" prop="student_start_year">
								<el-config-provider :locale="zhCn">
									<el-date-picker v-model="form.student_start_year" type="month" format="YYYY-MM" value-format="YYYY-MM" />
								</el-config-provider>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="学号：" prop="student_no">
								<el-input v-model="form.student_no" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="入学年月：" prop="student_start_year">
								<el-config-provider :locale="zhCn">
									<el-date-picker v-model="form.student_start_year" type="month" format="YYYY-MM" value-format="YYYY-MM" />
								</el-config-provider>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="所在年级：" prop="grade">
								<el-select v-model="form.grade">
									<el-option v-for="item in gradeList" :key="item.id" :label="item.value" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8"></el-col>
					</el-row>
					<el-form-item label="曾获何种奖励：">
						<el-input v-model="form.awards" type="textarea" show-word-limit />
					</el-form-item>
				</el-card>
			</div>
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>家庭经济情况</span>
					</div>
					<el-row type="flex">
						<el-col :span="8">
							<el-form-item label="家庭人口总数：" prop="total_house_p">
								<el-input v-model="form.total_house_p" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="家庭月总收入：" prop="total_monthly_house">
								<el-input v-model="form.total_monthly_house" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="人均月收入：" prop="per_capita_monthly">
								<el-input v-model="form.per_capita_monthly" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex">
						<el-col :span="8">
							<el-form-item label="收入来源：" prop="source_of_income">
								<el-input v-model="form.source_of_income" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="家庭住址：" prop="home_address">
								<el-input v-model="form.home_address" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="邮政编码：" prop="postal_code">
								<el-input v-model="form.postal_code" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-card>
			</div>
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>学习成绩</span>
					</div>
					<el-row type="flex">
						<el-col :span="8">
							<el-form-item label="成绩排名：" prop="scoreRanking">
								<el-input v-model="form.scoreRanking" style="width: 50px !important" />
								<span style="margin: 0 10px">/</span>
								<el-form-item prop="total_class_size">
									<el-input v-model="form.total_class_size" style="width: 60px !important" />
								</el-form-item>
								<span>（名次 / 总人数）</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="必修课：" prop="required_quantity">
								<el-input v-model="form.required_quantity" style="width: 50px !important" />
								<span style="margin: 0 10px">/</span>
								<el-form-item prop="number_of_passes">
									<el-input v-model="form.number_of_passes" style="width: 60px !important" />
								</el-form-item>
								<span>（必修课数 / 必修课及格数）</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" prop="">
						<el-col :span="8">
							<el-form-item label="是否实行综合考评排名：" label-width="180px">
								<el-switch v-model="form.is_comprehensive_survey" active-text="是" inactive-text="否" :active-value="0" :inactive-value="1" />
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="form.is_comprehensive_survey === 0">
							<el-form-item label="综测排名：" prop="comprehensive_ranking">
								<el-input v-model="form.comprehensive_ranking" style="width: 50px !important" />
								<span style="margin: 0 10px">/</span>
								<el-form-item prop="total_number_of_comprehensive">
									<el-input v-model="form.total_number_of_comprehensive" style="width: 60px !important" />
									<span>（名次 / 总人数）</span>
								</el-form-item>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="申请理由：" prop="">
						<el-input v-model="form.reason_for_application" type="textarea" :show-word-limit="true" />
					</el-form-item>
				</el-card>
			</div>
			<div class="btn">
				<el-button type="primary" @click="submitForm(formRef)">
					提交申请<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
				</el-button>
			</div>
		</el-form>
		<AvatarCropper :dialogVisible="dialogVisibles" :url="form.imageUrl" @upRrl="getUrl" @parentChang="parentChang"></AvatarCropper>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";
import AvatarCropper from "@/components/VueCropper/index.vue";
import { studentNationList, politicalOutlookList, gradeList, collegeList } from "@/util/tool/JsonData";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);
const formRef = ref<FormInstance>();

const form = reactive({
	student_name: "",
	student_sex: "",
	imageUrl: "",
	student_birthday: "",
	student_nation: "",
	id_card_number: "",
	contact_number: "",
	university_name: "",
	student_college: "",
	class_name: "",
	political_outlook: "",
	student_no: "",
	student_start_year: "",
	grade: "",
	awards: "",
	reason_for_application: "",
	total_house_p: undefined,
	total_monthly_house: "",
	per_capita_monthly: "",
	source_of_income: "",
	home_address: "",
	postal_code: "",
	scoreRanking: "",
	total_class_size: undefined,
	required_quantity: undefined,
	number_of_passes: undefined,
	is_comprehensive_survey: 0,
	comprehensive_ranking: undefined,
	total_number_of_comprehensive: undefined
});

const formRules = reactive<FormRules>({
	student_name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
	student_sex: [{ required: true, message: "请选择您的性别", trigger: "change" }],
	student_birthday: [{ required: true, message: "请选择您的出生日期", trigger: "change" }],
	student_nation: [{ required: true, message: "请选择您的民族", trigger: "change" }],
	id_card_number: [{ required: true, message: "请输入您的身份证号", trigger: "blur" }],
	imageUrl: [{ required: true, message: "请上传您的个人照", trigger: "change" }],
	contact_number: [{ required: true, message: "请输入您的联系电话", trigger: "blur" }],
	university_name: [{ required: true, message: "请输入您的学校名称", trigger: "blur" }],
	student_college: [{ required: true, message: "请选择您的所属学院", trigger: "change" }],
	class_name: [{ required: true, message: "请输入您的班级名称", trigger: "blur" }],
	political_outlook: [{ required: true, message: "请选择您的政治面貌", trigger: "change" }],
	student_no: [{ required: true, message: "请输入您的学号", trigger: "blur" }],
	student_start_year: [{ required: true, message: "请选择您的入学年月", trigger: "change" }],
	grade: [{ required: true, message: "请选择您的所属年级", trigger: "change" }],
	total_house_p: [{ required: true, message: "请输入您的家庭人口总数", trigger: "change" }],
	total_monthly_house: [{ required: true, message: "请输入您的家庭月总收入", trigger: "change" }],
	per_capita_monthly: [{ required: true, message: "请输入您的收入的来源", trigger: "change" }],
	source_of_income: [{ required: true, message: "请输入您的人均月收入", trigger: "change" }],
	home_address: [{ required: true, message: "请输入您的家庭住址", trigger: "change" }],
	postal_code: [{ required: true, message: "请输入邮政编码", trigger: "change" }],
	scoreRanking: [{ required: true, message: "请填写完整", trigger: "change" }],
	total_class_size: [{ required: true, message: "请填写完整", trigger: "change" }],
	required_quantity: [{ required: true, message: "请填写完整", trigger: "change" }],
	number_of_passes: [{ required: true, message: "请填写完整", trigger: "change" }],
	comprehensive_ranking: [{ required: true, message: "请填写完整", trigger: "change" }],
	total_number_of_comprehensive: [{ required: true, message: "请填写完整", trigger: "change" }]
});

const dialogVisibles = ref(false);

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

const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			console.log("submit!");
		} else {
			console.log("error submit!", fields);
		}
	});
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

	.el-form {
		height: 100% !important;
		padding: 0 10px;
		overflow: auto;

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
