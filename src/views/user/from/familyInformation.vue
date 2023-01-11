<template>
	<div>
		<el-form ref="familyInformRef" :model="familyInform" :rules="familyInformRules" label-width="130px" label-position="right">
			<el-row>
				<el-col :span="8">
					<el-form-item label="户口性质：" prop="nature_of_household_registration">
						<el-select v-model="familyInform.nature_of_household_registration" placeholder="Activity zone">
							<el-option v-for="item in householdList" :key="item.id" :label="item.value" :value="item.value" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="家庭地址：" prop="home_address">
						<el-input v-model="familyInform.home_address" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="家庭邮编：" prop="home_zip_code">
						<el-input v-model="familyInform.home_zip_code" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="家庭联系电话：" prop="home_contact_number">
						<el-input v-model="familyInform.home_contact_number" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8"></el-col>
				<el-col :span="8"></el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";
import { householdList } from "@/util/tool/JsonData";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const familyInformRef = ref<FormInstance>();

const familyInform = reactive({
	nature_of_household_registration: "",
	home_address: "",
	home_zip_code: "",
	home_contact_number: ""
});

const familyInformRules = reactive<FormRules>({
	nature_of_household_registration: [{ required: true, message: "请选择户口性质", trigger: "change" }],
	home_address: [{ required: true, message: "请输入家庭地址", trigger: "blur" }],
	home_zip_code: [{ required: true, message: "请输入家庭邮编", trigger: "blur" }],
	home_contact_number: [{ required: true, message: "请输入家庭联系电话", trigger: "blur" }]
});

const getData = () => {
	for (const key in familyInform) {
		if (Object.prototype.hasOwnProperty.call(familyInform, key)) {
			for (const s in userData.value) {
				if (Object.prototype.hasOwnProperty.call(userData.value, s)) {
					if (key === s) {
						familyInform[key] = userData.value[s];
					}
				}
			}
		}
	}
};

defineExpose({
	familyInform,
	familyInformRef
});

onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
	width: 360px;
}
</style>
