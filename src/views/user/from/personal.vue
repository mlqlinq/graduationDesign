<template>
	<div class="person">
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="130px" label-position="right">
			<el-row>
				<el-col :span="16">
					<el-row>
						<el-col :span="12">
							<el-form-item label="姓名：" prop="student_name">
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
							<el-form-item label="身份证号：" prop="id_card_number">
								<el-input v-model="form.id_card_number" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证件类型：" prop="id_card_type">
								<el-select v-model="form.id_card_type">
									<el-option v-for="item in idCardTypeList" :key="item.id" :label="item.value" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="8" class="my_avatar">
					<el-form-item label="个人照：" class="uploader">
						<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" style="width: 100px; height: 140px" />
						<el-button v-if="form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">更换</el-button>
						<el-button v-if="!form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">上传</el-button>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="联系电话：" prop="contact_number">
						<el-input v-model="form.contact_number" />
					</el-form-item>
				</el-col>
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
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="班级名称：" prop="class_name">
						<el-input v-model="form.class_name" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="专业名称：" prop="student_major">
						<el-select v-model="form.student_major">
							<el-option v-for="item in majorList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="专业大类：" prop="major_categories">
						<el-select v-model="form.major_categories">
							<el-option v-for="item in majorCategoriesList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
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
					<el-form-item label="学籍状态：" prop="student_status">
						<el-select v-model="form.student_status">
							<el-option v-for="item in statusList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
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
					<el-form-item label="学制：" prop="educational_system">
						<el-select v-model="form.educational_system">
							<el-option v-for="item in educationalList" :key="item.id" :label="item.data" :value="item.data" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="培养层次：" prop="training_level">
						<el-select v-model="form.training_level">
							<el-option v-for="item in trainingLevelList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="培养方式：" prop="cultivation_method">
						<el-select v-model="form.cultivation_method">
							<el-option v-for="item in cultivationMethodList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="学习形式：" prop="learning_form">
						<el-select v-model="form.learning_form">
							<el-option v-for="item in learningformList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="毕业时间：" prop="student_finish_year">
						<el-config-provider :locale="zhCn">
							<el-date-picker v-model="form.student_finish_year" type="month" format="YYYY-MM" value-format="YYYY-MM" />
						</el-config-provider>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="年级：" prop="grade">
						<el-select v-model="form.grade">
							<el-option v-for="item in gradeList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="入学方式：" prop="mode_of_admission">
						<el-select v-model="form.mode_of_admission">
							<el-option v-for="item in modeAdmissionList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="电子邮箱：">
						<el-input v-model="form.e_mail" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
	<AvatarCropper :dialogVisible="dialogVisibles" :url="form.imageUrl" @upRrl="getUrl" @parentChang="parentChang"></AvatarCropper>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";
import AvatarCropper from "@/components/VueCropper/index.vue";
import { studentNationList, educationalList, idCardTypeList, majorList, majorCategoriesList, statusList, politicalOutlookList, trainingLevelList, cultivationMethodList, gradeList, learningformList, modeAdmissionList, collegeList } from "@/util/tool/JsonData";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const formRef = ref<FormInstance>();

const form = reactive({
	student_name: "",
	student_sex: "",
	imageUrl: "http://www.mlqzclqq.xyz:8888/down/vnOq8jIgazEZ.gif",
	student_birthday: "",
	student_nation: "",
	id_card_type: "",
	id_card_number: "",
	contact_number: "",
	university_name: "",
	student_college: "",
	class_name: "",
	student_major: "",
	major_categories: "",
	political_outlook: "",
	student_status: "",
	student_no: "",
	student_start_year: "",
	educational_system: "",
	training_level: "",
	cultivation_method: "",
	learning_form: "",
	grade: "",
	mode_of_admission: "",
	student_finish_year: "",
	e_mail: ""
});

const formRules = reactive<FormRules>({
	student_name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
	student_sex: [{ required: true, message: "请选择您的性别", trigger: "change" }],
	student_birthday: [{ required: true, message: "请选择您的出生日期", trigger: "change" }],
	student_nation: [{ required: true, message: "请选择您的民族", trigger: "change" }],
	id_card_type: [{ required: true, message: "请选择您的身份证件类型", trigger: "change" }],
	id_card_number: [{ required: true, message: "请输入您的身份证号", trigger: "blur" }],
	contact_number: [{ required: true, message: "请输入您的联系电话", trigger: "blur" }],
	university_name: [{ required: true, message: "请输入您的学校名称", trigger: "blur" }],
	student_college: [{ required: true, message: "请选择您的所属学院", trigger: "change" }],
	class_name: [{ required: true, message: "请输入您的班级名称", trigger: "blur" }],
	student_major: [{ required: true, message: "请选择您的专业名称", trigger: "change" }],
	major_categories: [{ required: true, message: "请选择您的专业大类", trigger: "change" }],
	political_outlook: [{ required: true, message: "请选择您的政治面貌", trigger: "change" }],
	student_status: [{ required: true, message: "请选择您的学籍状态", trigger: "change" }],
	student_no: [{ required: true, message: "请输入您的学号", trigger: "blur" }],
	student_start_year: [{ required: true, message: "请选择您的入学年月", trigger: "change" }],
	educational_system: [{ required: true, message: "请选择您的学制", trigger: "change" }],
	training_level: [{ required: true, message: "请选择您的培养层次", trigger: "change" }],
	cultivation_method: [{ required: true, message: "请选择您的培养方式", trigger: "change" }],
	learning_form: [{ required: true, message: "请选择您的学习形式", trigger: "change" }],
	grade: [{ required: true, message: "请选择您的s所属年级", trigger: "change" }],
	student_finish_year: [{ required: true, message: "请选择您的毕业时间", trigger: "change" }],
	mode_of_admission: [{ required: true, message: "请选择您的入学方式", trigger: "change" }]
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
</script>

<style lang="scss" scoped>
.el-select,
:deep(.el-date-editor.el-input),
.el-input {
	width: 260px !important;
}
.person {
	height: 100%;
	.el-form {
		:deep(.el-form-item__label) {
			justify-content: flex-end !important;
		}
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
</style>
