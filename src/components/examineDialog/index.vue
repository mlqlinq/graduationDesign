<template>
	<div>
		<el-dialog v-model="prop.visible" width="600px" center draggable>
			<div>
				<el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" label-position="left" class="demo-ruleForm" status-icon>
					<template #header>
						<div class="my-header">
							<h4>提交审核</h4>
							<el-button icon="Search" circle />
						</div>
					</template>
					<el-form-item label="是否同意:">
						<el-radio-group v-model="ruleForm.resource">
							<el-radio label="0" value="0">同意</el-radio>
							<el-radio label="1" value="1">驳回</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="审核意见(或推荐理由):">
						<el-input v-model="ruleForm.desc" type="textarea" />
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="Cancel">取消</el-button>
					<el-button type="primary" @click="postData"> 提交 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";
const prop: any = defineProps<{
	visible?: Boolean;
	news?: String;
}>();

const centerDialogVisible = ref(false);

onMounted(() => {
	centerDialogVisible.value = prop.visible;
	ruleForm.desc = prop.news;
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
	resource: "0",
	desc: ""
});

const emit = defineEmits(["DaiVisi", "postData"]);

/* 执行父组件传下来的方式 */
const postData = () => {
	emit("postData");
};

const Cancel = () => {
	emit("DaiVisi", false, ruleForm);
};

defineExpose({
	ruleForm
});
</script>
<style scoped>
.dialog-footer button:first-child {
	margin-right: 10px;
}

:deep(.el-textarea__inner) {
	height: 100px !important;
}
</style>
