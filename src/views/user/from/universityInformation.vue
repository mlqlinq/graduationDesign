<template>
	<div class="person">
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="130px" label-position="right" disabled>
			<el-row>
				<el-col :span="8">
					<el-form-item label="高校名称：" prop="universities_name">
						<el-input v-model="form.universities_name" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="高校代码：" prop="id_card_number">
						<el-input v-model="form.id_card_number" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="校办电话：" prop="telephone">
						<el-input v-model="form.telephone" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="高校地址：" prop="address">
						<el-input v-model="form.address" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="邮箱：" prop="mailbox">
						<el-input v-model="form.mailbox" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="邮编：" prop="zip_code">
						<el-input v-model="form.zip_code" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const formRef = ref<FormInstance>();

const form = reactive({
	universities_name: "",
	id_card_number: "",
	telephone: "",
	address: "",
	mailbox: "",
	zip_code: ""
});

const formRules = reactive<FormRules>({});

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
