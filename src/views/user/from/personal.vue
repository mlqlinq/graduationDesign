<template>
	<div class="person">
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="130px" label-position="right">
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
								<el-date-picker v-model="form.student_birthday" type="date" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="民族：" prop="student_nation">
								<el-select v-model="form.student_nation">
									<el-option label="男" value="男" />
									<el-option label="女" value="女" />
									<el-option label="其他" value="其他" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="身份证件类型：" prop="id_card_type">
								<el-select v-model="form.id_card_type">
									<el-option label="男" value="男" />
									<el-option label="女" value="女" />
									<el-option label="其他" value="其他" />
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
					<el-form-item label="个人照：" class="uploader">
						<el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false" accept=".jpg, .png, .JPG, .PNG, .jpeg, .JPEG" :on-change="handleChange">
							<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
							<el-button v-if="form.imageUrl" type="primary" style="margin-left: 10px">更换</el-button>
						</el-upload>
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
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
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
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="专业大类：" prop="major_categories">
						<el-select v-model="form.major_categories">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="政治面貌：" prop="political_outlook">
						<el-select v-model="form.political_outlook">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="学籍状态：" prop="student_status">
						<el-select v-model="form.student_status">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
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
						<el-date-picker v-model="form.student_start_year" type="date" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="学制：" prop="educational_system">
						<el-select v-model="form.educational_system">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="培养层次：" prop="training_level">
						<el-select v-model="form.training_level">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="培养方式：" prop="cultivation_method">
						<el-select v-model="form.cultivation_method">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="学习形式：" prop="learning_form">
						<el-select v-model="form.learning_form">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="毕业时间：" prop="graduation">
						<el-date-picker v-model="form.graduation" type="date" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="年级：" prop="grade">
						<el-select v-model="form.grade">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="入学方式：" prop="mode_of_admission">
						<el-select v-model="form.mode_of_admission">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
							<el-option label="其他" value="其他" />
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
</template>

<script setup lang="ts">
import type { FormInstance, UploadProps, FormRules, UploadRawFile, UploadUserFile } from "element-plus";
import { uploads } from "@/http/api/upload";

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
	graduation: "",
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
	graduation: [{ required: true, message: "请选择您的毕业时间", trigger: "change" }],
	mode_of_admission: [{ required: true, message: "请选择您的入学方式", trigger: "change" }]
});

const handleChange: UploadProps["onChange"] = (uploadFile: any, uploadFiles) => {
	if (uploadFile.raw.size / 1024 / 1024 > 2) {
		ElNotification({
			title: "Error",
			message: "文件大小不能超过2MB!",
			type: "error"
		});
		return false;
	}
	uploadFil(uploadFile.raw);
};

const uploadFil = async (file: any) => {
	const formdata = new FormData();
	formdata.append("file", file);
	await uploads(formdata)
		.then((res) => {
			form.imageUrl = res.url;
			ElNotification({
				title: "温馨提示",
				message: res.msg,
				type: "success"
			});
		})
		.catch((err) => {
			ElNotification({
				title: "温馨提示",
				message: err,
				type: "error"
			});
		});
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
