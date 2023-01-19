<template>
	<div>
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="140px" label-position="right">
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
										<el-date-picker v-model="form.student_birthday" type="date" format="YYYY-MM" value-format="YYYY-MM" />
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
								<el-form-item label="个人健康状况：" prop="health">
									<el-select v-model="form.health">
										<el-option v-for="item in Myhealth" :key="item.id" :label="item.value" :value="item.value" />
									</el-select>
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
								<el-date-picker v-model="form.student_start_year" type="month" format="YYYY年MM月" value-format="YYYY年MM月" />
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
						<el-form-item label="专业：" prop="student_major">
							<el-input v-model="form.student_major" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="班级：" prop="grade">
							<el-input v-model="form.grade" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="所在年级：" prop="current_grade">
							<el-input v-model="form.current_grade" />
						</el-form-item>
					</el-col>
				</el-row>
				<div class="card-container">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>个人健康状况辅助说明材料(如个人健康状况填写情况为有严重疾病或长期就医,可在此处上传1-3张图片作为佐证，没有可不上传)</span>
						</div>
						<el-row>
							<el-col :span="8">
								<el-form-item label="辅助说明材料一：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess1" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料二：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess2" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料三：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess3" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
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
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { useAuthStore } from "@/stores/index";
import { genFileId } from "element-plus";
import type { FormInstance, FormRules, UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from "element-plus";
import { studentNationList, politicalOutlookList, collegeList } from "@/util/tool/JsonData";
import { Myhealth } from "@/util/tool/JsonData";

const one = ref("");
const two = ref("");
const three = ref("");

const imgurlList: any = ref([]);

const upload = ref<UploadInstance>();

const handleAvatarSuccess1: UploadProps["onSuccess"] = (response, uploadFile) => {
	one.value = response.url;
	imgurlList.value.push(response.url);
	form.health_materials = JSON.stringify(imgurlList.value);
};

const handleAvatarSuccess2: UploadProps["onSuccess"] = (response, uploadFile) => {
	two.value = response.url;
	imgurlList.value.push(response.url);
	form.health_materials = JSON.stringify(imgurlList.value);
};

const handleAvatarSuccess3: UploadProps["onSuccess"] = (response, uploadFile) => {
	three.value = response.url;
	imgurlList.value.push(response.url);
	form.health_materials = JSON.stringify(imgurlList.value);
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
		imgurlList.value.splice(0, 1);
		form.health_materials = JSON.stringify(imgurlList.value);
	}
	if (two.value === file.response.url) {
		two.value = "";
		if (imgurlList.value.length === 1) {
			imgurlList.value.splice(0, 1);
			form.health_materials = JSON.stringify(imgurlList.value);
		} else if (imgurlList.value.length === 2) {
			imgurlList.value.splice(1, 1);
			form.health_materials = JSON.stringify(imgurlList.value);
		} else if (imgurlList.value.length === 3) {
			imgurlList.value.splice(1, 1);
			form.health_materials = JSON.stringify(imgurlList.value);
		}
	}
	if (three.value === file.response.url) {
		three.value = "";
		if (imgurlList.value.length === 1) {
			imgurlList.value.splice(0, 1);
			form.health_materials = JSON.stringify(imgurlList.value);
		} else if (imgurlList.value.length === 2) {
			imgurlList.value.splice(1, 1);
			form.health_materials = JSON.stringify(imgurlList.value);
		} else if (imgurlList.value.length === 3) {
			imgurlList.value.splice(2, 1);
			form.health_materials = JSON.stringify(imgurlList.value);
		}
	}
};
const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm(`确定要删除 ${uploadFile.name} ?`).then(
		() => true,
		() => false
	);
};

const upApi = import.meta.env.VITE_BASE_API;
const upPath = "/upload/uploads/file";

const dialogVisible = ref(false);

const dialogImageUrl = ref();

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const formRef = ref<FormInstance>();

const form = reactive({
	student_name: "",
	student_sex: "",
	imageUrl: "",
	student_birthday: "",
	student_nation: "",
	health: "",
	id_card_number: "",
	university_name: "",
	student_college: "",
	class_name: "",
	political_outlook: "",
	student_start_year: "",
	student_no: "",
	student_major: "",
	grade: "",
	current_grade: "",
	health_materials: ""
});

const formRules = reactive<FormRules>({
	student_name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
	student_sex: [{ required: true, message: "请选择您的性别", trigger: "change" }],
	student_birthday: [{ required: true, message: "请选择您的出生日期", trigger: "change" }],
	student_nation: [{ required: true, message: "请选择您的民族", trigger: "change" }],
	id_card_number: [{ required: true, message: "请输入您的身份证号", trigger: "blur" }],
	university_name: [{ required: true, message: "请输入您的学校名称", trigger: "blur" }],
	student_college: [{ required: true, message: "请选择您的所属学院", trigger: "change" }],
	class_name: [{ required: true, message: "请输入您的班级名称", trigger: "blur" }],
	political_outlook: [{ required: true, message: "请选择您的政治面貌", trigger: "change" }],
	student_no: [{ required: true, message: "请输入您的学号", trigger: "blur" }],
	student_start_year: [{ required: true, message: "请选择您的入学年月", trigger: "change" }],
	health: [{ required: true, message: "请选择您的健康状况", trigger: "change" }],
	grade: [{ required: true, message: "请选择您的所属年级", trigger: "blur" }]
});

const dialogVisibles = ref(false);

const getCropper = () => {
	dialogVisibles.value = true;
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
	padding: 0 20px;

	.el-form {
		height: 100% !important;
		// padding: 0 10px;
		// overflow: auto;

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
