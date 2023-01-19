<template>
	<div class="person" v-loading="loading">
		<!-- 贫困认定填报 -->
		<el-form ref="formRef" label-width="130px" label-position="right">
			<div class="card-container">
				<essefrom ref="essefromRef"></essefrom>
			</div>
			<div class="card-container">
				<typeDifficulty ref="typeDifficultyRef"></typeDifficulty>
			</div>
			<div class="card-container">
				<familyMemberInformation ref="familyMInRef"></familyMemberInformation>
			</div>
			<div class="card-container">
				<informationOnPreviousGrants ref="informationOnPRef"></informationOnPreviousGrants>
			</div>
			<div class="card-container">
				<otherRelevantInformation ref="otherRelInforRef"></otherRelevantInformation>
			</div>

			<div class="btn">
				<el-button type="primary" @click="submitForm(essefromRef, typeDifficultyRef, familyMInRef, informationOnPRef, otherRelInforRef)">
					提交申请<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
				</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import _ from "lodash";
import essefrom from "./compent/essentialInformation.vue";
import typeDifficulty from "./compent/typeDifficulty.vue";
import informationOnPreviousGrants from "./compent/informationOnPreviousGrants.vue";
import familyMemberInformation from "./compent/familyMemberInformation.vue";
import otherRelevantInformation from "./compent/otherRelevantInformation.vue";
import { submitMyPoorData } from "@/http/api/nationalGrants/poorStudCertific";
import { useTabsStore } from "@/stores/index";

const storesTabs = useTabsStore();

const router = useRouter();
const loading = ref(true);

const essefromRef: any = ref(null);
const typeDifficultyRef: any = ref(null);
const familyMInRef: any = ref(null);
const informationOnPRef: any = ref(null);
const otherRelInforRef: any = ref(null);

const submitForm = async (e, t, f, i, o) => {
	let formRuleValidates = [e.formRef.validate(), t.formRef.validate(), f.formRef.validate(), i.formRef.validate(), o.formRef.validate()];
	await Promise.all(formRuleValidates)
		.then(async (res) => {
			if (res[0] && res[1]) {
				console.log(1);

				const data = _.merge(e.form, t.form, f.form, i.form, o.form);
				await submitMyPoorData(data).then((result) => {
					ElNotification({
						title: "温馨提示",
						message: result.msg,
						type: "success"
					});
				});
				// 关闭当前页面
				const index = storesTabs.getTansList.findIndex((item) => item.path === "/confirmationFilling");
				storesTabs.handleClose(index);
				// 返回上一页面
				router.go(-1);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

onMounted(() => {
	loading.value = false;
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
	overflow: auto;

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
		margin-bottom: 20px;
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
