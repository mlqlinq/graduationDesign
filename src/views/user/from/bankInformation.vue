<template>
	<div>
		<el-form :model="bankform" label-width="120px" label-position="right">
			<el-row>
				<el-col :span="8">
					<el-form-item label="学生银行户名：">
						<el-input v-model="bankform.student_bank_account_name" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="开户银行：">
						<el-input v-model="bankform.bank_of_deposit" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="银行卡号：">
						<el-input v-model="bankform.bank_card_no" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const bankform = reactive({
	student_bank_account_name: "",
	bank_of_deposit: "",
	bank_card_no: ""
});

const getData = () => {
	for (const key in bankform) {
		if (Object.prototype.hasOwnProperty.call(bankform, key)) {
			for (const s in userData.value) {
				if (Object.prototype.hasOwnProperty.call(userData.value, s)) {
					if (key === s) {
						bankform[key] = userData.value[s];
					}
				}
			}
		}
	}
};

defineExpose({
	bankform
});
onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped>
.el-input {
	width: 360px;
}
</style>
