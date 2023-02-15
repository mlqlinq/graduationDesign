<template>
	<div class="chenter" v-loading="loading">
		<el-form label-position="right" label-width="150px">
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>基本信息</span>
						<i class="float-right el-icon-arrow-down"></i>
					</div>
					<universityInformation v-if="userIm == '1'"></universityInformation>
					<secretaryInform ref="personS" v-if="userIm == '2'"></secretaryInform>
					<guideInformation ref="personS" v-if="userIm == '3'"></guideInformation>
					<PersonInform ref="personS" v-if="userIm == '4'"></PersonInform>
				</el-card>
			</div>
			<div class="card-container" v-if="userIm == '4'">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>银行卡信息</span>
						<i class="float-right el-icon-arrow-down"></i>
					</div>
					<BankInform ref="bankS"></BankInform>
				</el-card>
			</div>
			<div class="card-container" v-if="userIm == '4'">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>家庭信息</span>
						<i class="float-right el-icon-arrow-down"></i>
					</div>
					<familyInform ref="familyS"></familyInform>
				</el-card>
			</div>
			<div style="text-align: center" v-if="userIm == '4'">
				<el-button type="primary" @click="submitForm(personS, bankS, familyS)">保存<SvgIcon icon-name="preserVation" :size="19" style="margin-left: 5px; margin-right: -3px"></SvgIcon></el-button>
			</div>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import _ from "lodash";
import { modifyUser, modifyGuideUser } from "@/http/api/user/edit";
import PersonInform from "./from/personal.vue";
import BankInform from "./from/bankInformation.vue";
import familyInform from "./from/familyInformation.vue";
import secretaryInform from "./from/secretaryInform.vue";
import guideInformation from "./from/guideInformation.vue";
import universityInformation from "./from/universityInformation.vue";
import { getMyinformation } from "@/http/api/user/user";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/modules/userToken";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const userIm = userData.value.userIdentity;

const loading = ref(true);

const personS: any = ref(null);
const bankS: any = ref(null);
const familyS: any = ref(null);

// 注入重载页面事件
const reloadRefresh: any = inject("reloadRefresh");

const submitForm = async (p, b, f) => {
	if (b === null && f === null) {
		const formRuleValidates = [p.formRef.validate()];
		await Promise.all(formRuleValidates)
			.then(async (res) => {
				if (res[0]) {
					const data = p.form;
					data.userIdentity = userData.value.userIdentity;
					await modifyGuideUser(data).then((result) => {
						ElNotification({
							title: "温馨提示",
							message: result.msg,
							type: "success"
						});
					});
					useAuths.setUserData(data);
					// getMyInformationData();
					reloadRefresh();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	} else {
		const formRuleValidates = [p.formRef.validate(), f.familyInformRef.validate()];
		await Promise.all(formRuleValidates)
			.then(async (res) => {
				if (res[0] && res[1]) {
					const data = _.merge(p.form, b.bankform, f.familyInform);
					data.user_id = userData.value.user_id;
					data.user_identity = userData.value.userIdentity;
					await modifyUser(data).then((result) => {
						ElNotification({
							title: "温馨提示",
							message: result.msg,
							type: "success"
						});
					});
					useAuths.setUserData(data);
					// getMyInformationData();
					reloadRefresh();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
};

onMounted(() => {
	loading.value = false;
	getMyInformationData();
});

const getMyInformationData = async () => {
	const query: any = {};
	query.userIdentity = userData.value.userIdentity | userData.value.user_identity;
	if (userData.value.id_card_number) {
		query.id_card_number = userData.value.id_card_number;
	} else if (userData.value.username) {
		query.id_card_number = userData.value.username;
	}

	await getMyinformation(query)
		.then((res) => {
			if (res.data) {
				userData.value = res.data;
			}
			ElNotification({
				title: "温馨提示",
				message: res.msg,
				type: "success"
			});
		})
		.catch((err) => {
			console.log("err", err);
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
