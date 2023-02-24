<template>
	<div class="person">
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="140px" label-position="right" disabled>
			<el-row>
				<el-col :span="16">
					<el-row>
						<el-col :span="12">
							<el-form-item label="姓名：" prop="secretary_name">
								<el-input v-model="form.secretary_name" />
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别：" prop="secretary_sex">
								<el-select v-model="form.secretary_sex">
									<el-option label="男" value="男" />
									<el-option label="女" value="女" />
									<el-option label="其他" value="其他" />
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="出生日期：" prop="secretary_birthday">
								<el-config-provider :locale="zhCn">
									<el-date-picker v-model="form.secretary_birthday" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
								</el-config-provider>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="民族：" prop="guide_nation">
								<el-select v-model="form.guide_nation">
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
							<el-form-item label="联系电话：" prop="telephone">
								<el-input v-model="form.telephone" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="8" class="my_avatar" v-if="form.imageUrl">
					<el-form :model="form" label-width="140px" label-position="right">
						<el-form-item label="个人照：" class="uploader">
							<el-image v-if="form.imageUrl" :src="form.imageUrl" :preview-src-list="srcList" class="avatar" style="width: 100px; height: 140px" />
							<el-button v-if="form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">更换</el-button>
							<el-button v-if="!form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">上传</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="院系名称：" prop="secretary_college">
						<el-select v-model="form.secretary_college">
							<el-option v-for="item in collegeList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="所属高校名称：" prop="universities">
						<el-input v-model="form.universities" />
					</el-form-item>
				</el-col>
				<el-col :span="8"> </el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="入职年份：" prop="entry_time">
						<el-config-provider :locale="zhCn">
							<el-date-picker v-model="form.entry_time" type="year" format="YYYY" value-format="YYYY" />
						</el-config-provider>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="家庭住址：" prop="address">
						<el-input v-model="form.address" />
					</el-form-item>
				</el-col>
				<el-col :span="8"> </el-col>
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
import { studentNationList, politicalOutlookList, collegeList } from "@/util/tool/JsonData";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { getSecretaryPerData, submitSecretaryImg } from "@/http/api/user/user";

const props = defineProps<{
	unId?: number;
}>();
const srcList: any = ref([]);

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const formRef = ref<FormInstance>();

const form = reactive({
	secretary_name: "",
	secretary_sex: "",
	secretary_birthday: "",
	guide_nation: "",
	id_card_number: "",
	imageUrl: "",
	telephone: "",
	secretary_college: "",
	class_name: "",
	entry_time: "",
	address: "",
	universities: ""
});

const formRules = reactive<FormRules>({
	secretary_name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
	secretary_sex: [{ required: true, message: "请选择您的性别", trigger: "change" }],
	secretary_birthday: [{ required: true, message: "请选择您的出生年月", trigger: "change" }],
	guide_nation: [{ required: true, message: "请选择您的民族", trigger: "change" }],
	id_card_number: [{ required: true, message: "请输入您的身份证号", trigger: "blur" }],
	telephone: [{ required: true, message: "请输入您的联系方式", trigger: "blur" }],
	universities: [{ required: true, message: "请输入您的所属高校", trigger: "blur" }],
	imageUrl: [{ required: true, message: "请上传您的证件照", trigger: "change" }],
	secretary_college: [{ required: true, message: "请选择您的所属院系", trigger: "change" }],
	class_name: [{ required: true, message: "请选择您的民族", trigger: "change" }],
	entry_time: [{ required: true, message: "请选择您的入职时间", trigger: "change" }],
	address: [{ required: true, message: "请输入您的家庭地址", trigger: "blur" }]
});

const dialogVisibles = ref(false);

const getCropper = () => {
	dialogVisibles.value = true;
};

const getUrl = async (url) => {
	if (url === "") return;
	await submitSecretaryImg({ imgUrl: url, secretaryId: userData.value.secretary_id })
		.then((result) => {
			ElNotification({
				message: result.msg
			});
			form.imageUrl = url;
		})
		.catch((err) => {
			ElNotification({
				message: err
			});
		});
};

const parentChang = (bool) => {
	dialogVisibles.value = bool;
};

onMounted(() => {
	if (props.unId) {
		getSecretaryData(props.unId);
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

// 管理员 抽屉
const getSecretaryData = async (id) => {
	await getSecretaryPerData(id)
		.then((res) => {
			if (res.data.length > 0) {
				const data = res.data[0];
				for (const key in form) {
					if (Object.prototype.hasOwnProperty.call(form, key)) {
						for (const s in data) {
							if (Object.prototype.hasOwnProperty.call(data, s)) {
								if (key === s) {
									form[key] = data[s];
								}
								if (key === "imageUrl") {
									srcList.value.push(data.imageUrl);
								}
							}
						}
					}
				}
			}
		})
		.catch((err) => {
			ElNotification({
				title: "网络请求错误",
				message: err
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
