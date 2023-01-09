<template>
	<div class="chenter">
		<el-form label-position="right" label-width="150px">
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>基本信息</span>
						<i class="float-right el-icon-arrow-down"></i>
					</div>
					<PersonInform ref="personS"></PersonInform>
				</el-card>
			</div>
			<div class="static-content-item" v-show="false">
				<el-divider direction="horizontal"></el-divider>
			</div>
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>银行卡信息</span>
						<i class="float-right el-icon-arrow-down"></i>
					</div>
					<BankInform ref="bankS"></BankInform>
				</el-card>
			</div>
			<div class="static-content-item" v-show="false">
				<el-divider direction="horizontal"></el-divider>
			</div>
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>家庭信息</span>
						<i class="float-right el-icon-arrow-down"></i>
					</div>
					<familyInform ref="familyS"></familyInform>
				</el-card>
			</div>
			<div style="text-align: center">
				<el-button type="primary" @click="submitForm(personS, bankS, familyS)">保存<SvgIcon icon-name="preserVation" :size="19" style="margin-left: 5px; margin-right: -3px"></SvgIcon></el-button>
			</div>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import PersonInform from "./from/personal.vue";
import BankInform from "./from/bankInformation.vue";
import familyInform from "./from/familyInformation.vue";

const personS: any = ref(null);
const bankS: any = ref(null);
const familyS: any = ref(null);

const submitForm = async (p, b, f) => {
	let formRuleValidates = [p.formRef.validate(), f.familyInformRef.validate()];
	Promise.all(formRuleValidates)
		.then((res) => {
			if (res[0] && res[1]) {
				console.log("chengg");
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
</script>

<style lang="scss" scoped>
.chenter {
	height: 100%;
	margin-bottom: 40px;
	.el-form {
		height: 100% !important;
		padding: 0 10px;
		overflow: auto;
	}
	.card-container {
		.el-card {
			margin-bottom: 10px;
			width: 100% !important;

			.clear-fix {
				margin-bottom: 10px;
			}
		}
	}
}
</style>
