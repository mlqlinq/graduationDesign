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
				<el-button v-if="route.query.Num" type="primary" @click="Diaisible = true">
					提交审核<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
				</el-button>
				<el-button v-else type="primary" @click="submitForm(essefromRef, typeDifficultyRef, familyMInRef, informationOnPRef, otherRelInforRef)">
					提交申请<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
				</el-button>
			</div>
		</el-form>

		<!-- 审核弹窗 -->
		<el-dialog v-model="Diaisible" width="800px" center draggable :close-on-click-modal="false">
			<div>
				<el-form ref="ruleFormRef" :model="DiaRuleFormRef" label-width="200px" label-position="top" class="demo-ruleForm" status-icon>
					<template #header>
						<div class="my-header">
							<h4>提交审核</h4>
							<el-button icon="Search" circle />
						</div>
					</template>
					<el-form-item label="是否同意：">
						<el-radio-group v-model="DiaruleForm.resource">
							<el-radio label="0" value="0">同意</el-radio>
							<el-radio label="1" value="1">驳回</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="审核意见（或推荐理由）：" v-if="userData.userIdentity === '3' && DiaruleForm.resource === '0'">
						<el-input class="DiaInp" v-model="DiaruleForm.desc" />
						<el-select v-model="DiaValue" placeholder="请选择" @change="DiasetVal">
							<el-option v-for="item in typeOfDifficulty" :key="item.value" :label="item.label" :value="item.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="审核意见（或推荐理由）：" v-else-if="DiaruleForm.resource === '0'">
						<el-input v-model="DiaruleForm.desc" type="textarea" />
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="DaiVisi">取消</el-button>
					<el-button type="primary" @click="submitForReview"> 提交 </el-button>
				</span>
			</template>
		</el-dialog>
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
import { useTabsStore, useAuthStore } from "@/stores/index";
import type { FormInstance } from "element-plus";
import { storeToRefs } from "pinia";
import toE from "@/util/Scholarship/toE";
const { postPoorStudCertificClassExamine, postPoorStudCertificDepartmentExamine, postPoorStudCertificSchoolExamine } = toE();

const storesTabs = useTabsStore();
const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const router = useRouter();
const route: any = useRoute();
const loading = ref(true);

const essefromRef: any = ref(null);
const typeDifficultyRef: any = ref(null);
const familyMInRef: any = ref(null);
const informationOnPRef: any = ref(null);
const otherRelInforRef: any = ref(null);

const Diaisible = ref(false);

const DiaRuleFormRef = ref<FormInstance>();
const DiaruleForm = reactive({
	resource: "0",
	desc: "",
	Alldesc: ""
});
if (userData.value.userIdentity === "1") {
	DiaruleForm.desc = "经学校评议及公示无异议，该同学为家庭经济困难学生。";
} else if (userData.value.userIdentity === "2") {
	DiaruleForm.desc = "经院系评议及公示无异议，该同学为家庭经济困难学生。";
} else if (userData.value.userIdentity === "3") {
	DiaruleForm.desc = "经评议及公示无异议，该同学为家庭经济困难学生,认定困难类型为：";
}

const DiaValue = ref("");

const typeOfDifficulty = [
	{
		value: "特别困难",
		label: "特别困难（A类）"
	},
	{
		value: "困难",
		label: "困难（B类）"
	},
	{
		value: "突发事件特殊困难",
		label: "突发事件特殊困难（C类）"
	}
];

const DiasetVal = (val) => {
	DiaruleForm.desc = "经评议及公示无异议，该同学为家庭经济困难学生,认定困难类型为：";
	DiaruleForm.Alldesc = DiaruleForm.desc + val;
};

/**
 * 提交申请
 * @param e
 * @param t
 * @param f
 * @param i
 * @param o
 */
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
	Examination();
});

/**
 * 表单回显
 */
const Examination = () => {
	if ("data" in route.meta) {
		essefromRef.value.disabled = true;
		typeDifficultyRef.value.disabled = true;
		familyMInRef.value.disabled = true;
		informationOnPRef.value.disabled = true;
		otherRelInforRef.value.disabled = true;

		const data: any = route.meta.data;
		for (let i in data) {
			if (Object.prototype.hasOwnProperty.call(data, i)) {
				for (const e in essefromRef.value.form) {
					if (Object.prototype.hasOwnProperty.call(essefromRef.value.form, e)) {
						if (i === e) {
							essefromRef.value.form[e] = data[i];
						}
						e === "university_name" ? (essefromRef.value.form[e] = data.school_name) : "";
						e === "current_grade" ? (essefromRef.value.form[e] = data.grade) : "";
						e === "grade" ? (essefromRef.value.form[e] = data.class_name) : "";
						e === "imageUrl" ? (essefromRef.value.form[e] = "") : "";
					}
				}
				for (const e in typeDifficultyRef.value.form) {
					if (Object.prototype.hasOwnProperty.call(typeDifficultyRef.value.form, e)) {
						if (i === e) {
							typeDifficultyRef.value.form[e] = data[i];
						}
					}
				}
				for (const e in familyMInRef.value.form) {
					if (Object.prototype.hasOwnProperty.call(familyMInRef.value.form, e)) {
						if (i === e) {
							familyMInRef.value.form[e] = data[i];
						}
						if (e === "family_member_information") {
							familyMInRef.value.list = JSON.parse(data.family_member_information);
						}
					}
				}
				for (const e in informationOnPRef.value.form) {
					if (Object.prototype.hasOwnProperty.call(informationOnPRef.value.form, e)) {
						if (i === e) {
							informationOnPRef.value.form[e] = data[i];
						}
					}
				}
				for (const e in otherRelInforRef.value.form) {
					if (Object.prototype.hasOwnProperty.call(otherRelInforRef.value.form, e)) {
						if (i === e) {
							otherRelInforRef.value.form[e] = data[i];
						}
					}
				}
			}
		}
		if (data.health_materials !== "") {
			const val: any = JSON.parse(data.health_materials);
			essefromRef.value.one1.push({ name: "a.jpeg", response: { url: val[0] } });
			if (val.length === 2) {
				essefromRef.value.two2.push({ name: "b.jpeg", response: { url: val[1] } });
			}
			if (val.length === 3) {
				essefromRef.value.two2.push({ name: "b.jpeg", response: { url: val[1] } });
				essefromRef.value.three3.push({ name: "c.jpeg", response: { url: val[2] } });
			}
		}
		if (data.father_health !== "") {
			const val: any = JSON.parse(data.father_health);
			familyMInRef.value.one1.push({ name: "a.jpeg", response: { url: val[0] } });
			if (val.length === 2) {
				familyMInRef.value.two2.push({ name: "b.jpeg", response: { url: val[1] } });
			}
			if (val.length === 3) {
				familyMInRef.value.two2.push({ name: "b.jpeg", response: { url: val[1] } });
				familyMInRef.value.three3.push({ name: "c.jpeg", response: { url: val[2] } });
			}
		}
		if (data.mother_health !== "") {
			const val: any = JSON.parse(data.mother_health);
			familyMInRef.value.four4.push({ name: "a.jpeg", response: { url: val[0] } });
			if (val.length === 2) {
				familyMInRef.value.five5.push({ name: "b.jpeg", response: { url: val[1] } });
			}
			if (val.length === 3) {
				familyMInRef.value.five5.push({ name: "b.jpeg", response: { url: val[1] } });
				familyMInRef.value.six6.push({ name: "c.jpeg", response: { url: val[2] } });
			}
		}
		if (data.materials_of_natural_disasters !== "") {
			const val: any = JSON.parse(data.materials_of_natural_disasters);
			otherRelInforRef.value.one1.push({ name: "a.jpeg", response: { url: val[0] } });
			if (val.length === 2) {
				otherRelInforRef.value.two2.push({ name: "b.jpeg", response: { url: val[1] } });
			}
			if (val.length === 3) {
				otherRelInforRef.value.two2.push({ name: "b.jpeg", response: { url: val[1] } });
				otherRelInforRef.value.three3.push({ name: "c.jpeg", response: { url: val[2] } });
			}
		}
		if (data.accidental_materials !== "") {
			const val: any = JSON.parse(data.accidental_materials);
			otherRelInforRef.value.four4.push({ name: "a.jpeg", response: { url: val[0] } });
			if (val.length === 2) {
				otherRelInforRef.value.five5.push({ name: "b.jpeg", response: { url: val[1] } });
			}
			if (val.length === 3) {
				otherRelInforRef.value.five5.push({ name: "b.jpeg", response: { url: val[1] } });
				otherRelInforRef.value.six6.push({ name: "c.jpeg", response: { url: val[2] } });
			}
		}
		if (data.auxiliary_instruction_materials !== "") {
			const val: any = JSON.parse(data.auxiliary_instruction_materials);
			otherRelInforRef.value.seven7.push({ name: "a.jpeg", response: { url: val[0] } });
			if (val.length === 2) {
				otherRelInforRef.value.eight8.push({ name: "b.jpeg", response: { url: val[1] } });
			}
			if (val.length === 3) {
				otherRelInforRef.value.eight8.push({ name: "b.jpeg", response: { url: val[1] } });
				otherRelInforRef.value.nine9.push({ name: "c.jpeg", response: { url: val[2] } });
			}
		}
	}
};

/** 提交审核 */
const submitForReview = () => {
	if (DiaValue.value === "")
		return ElNotification({
			title: "提示~",
			message: "请选择困难类型！",
			type: "warning"
		});

	const data: any = JSON.parse(JSON.stringify(DiaruleForm));
	const idNum = route.query.Num;

	if (userData.value.userIdentity === "1") {
		postPoorStudCertificSchoolExamine({ ...data, ...route.query });
	} else if (userData.value.userIdentity === "2") {
		postPoorStudCertificDepartmentExamine({ ...data, ...route.query });
	} else if (userData.value.userIdentity === "3") {
		postPoorStudCertificClassExamine({ ...data, ...route.query });
	}
	// 关闭当前页面
	const index = storesTabs.getTansList.findIndex((item) => item.path === "/confirmationFilling");
	storesTabs.handleClose(index);
	// 返回上一页面
	router.go(-1);
	Diaisible.value = false;
};

/** 审核弹窗关闭 */
const DaiVisi = () => {
	Diaisible.value = false;
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

	:deep(.el-dialog__body:first-child) {
		height: 100%;
	}
	:deep(.el-input.DiaInp) {
		width: 450px !important;
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
