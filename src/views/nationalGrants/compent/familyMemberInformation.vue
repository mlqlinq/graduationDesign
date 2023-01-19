<template>
	<div>
		<el-form ref="formRef" :model="form" :rules="formRules" label-width="250px" label-position="right">
			<el-card>
				<div slot="header" class="clear-fix">
					<span>家庭成员信息</span>
				</div>
				<el-row type="flex">
					<el-col :span="8">
						<el-form-item label="家庭人口数（含本人）：" label-width="180px" prop="total_house_p">
							<el-input v-model="form.total_house_p" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="本人联系电话：" prop="contact_number">
							<el-input v-model="form.contact_number" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家长联系电话：" prop="parent_contact_number" label-width="180px">
							<el-input v-model="form.parent_contact_number" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="户籍所在地(省)：" label-width="180px" prop="registered_residence_province">
							<el-select v-model="form.registered_residence_province" value-key="key" placeholder="请选择" @change="getcorresCityLidt">
								<el-option v-for="item in provinceData" :key="item.key" :label="item.value" :value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="户籍所在地(市)：" prop="registered_residence_city">
							<el-select v-model="form.registered_residence_city" value-key="key" placeholder="请选择" @change="getCorresCountyLidt">
								<el-option v-for="item in cityData" :key="item.key" :label="item.value" :value="item" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="户籍所在地(区县)：" prop="registered_residence_county" label-width="180px">
							<el-select v-model="form.registered_residence_county" placeholder="请选择">
								<el-option v-for="item in countyData" :key="item.key" :label="item.value" :value="item.value" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex">
					<el-col :span="8">
						<el-form-item label="家庭详细地址：" prop="home_address" label-width="180px">
							<el-input v-model="form.home_address" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="邮政编码：" prop="home_zip_code">
							<el-input v-model="form.home_zip_code" />
						</el-form-item>
					</el-col>
					<el-col :span="8"> </el-col>
				</el-row>
				<!-- 成员信息表 -->
				<el-form-item label-width="0px" prop="family_member_information">
					<edit-table :columns="column" :data="list" :blank="blank" @add="add" ref="table" :editableKeys="editableKeys" @onChange="onChange" @del="deleteAction" style="width: 100%" />
				</el-form-item>
				<div class="card-container" style="margin-top: 20px">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>父亲健康状况辅助说明材料(如父亲健康状况填写情况包含有严重疾病,可在此处上传1-3张图片作为佐证，没有可不上传)</span>
						</div>
						<el-row>
							<el-col :span="8">
								<el-form-item label="辅助说明材料一：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess1" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料二：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess2" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料三：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess3" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</div>
				<div class="card-container">
					<el-card>
						<div slot="header" class="clear-fix">
							<span>母亲健康状况辅助说明材料(如母亲健康状况填写情况包含有严重疾病,可在此处上传1-3张图片作为佐证，没有可不上传)</span>
						</div>
						<el-row>
							<el-col :span="8">
								<el-form-item label="辅助说明材料一：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess4" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料二：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess5" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="辅助说明材料三：">
									<el-upload class="upload-demo" show-file-list :action="upApi + upPath" :on-success="handleAvatarSuccess6" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
										<el-button type="primary">添加材料</el-button>
										<template #tip>
											<div class="el-upload__tip">请上传图片</div>
										</template>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
					</el-card>
				</div>
			</el-card>
		</el-form>
		<el-dialog v-model="dialogVisible" destroy-on-close>
			<img :src="dialogImageUrl" alt="查看" style="width: 100%; display: block; margin: 0 auto" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/index";
import { genFileId, type FormInstance, type FormRules, type UploadInstance, type UploadProps, type UploadRawFile } from "element-plus";
import EditTable from "@/components/EditTable/index.vue";
import { getCityData } from "@/http/api/cityData";
import { Myhealth, relativeAddress, relativeEducationStage, relativeOccupation } from "@/util/tool/JsonData";

const useAuths: any = useAuthStore();
const { userData } = storeToRefs(useAuths);

const formRef = ref<FormInstance>();

const form = reactive({
	total_house_p: "",
	contact_number: "",
	parent_contact_number: "",
	registered_residence_province: "",
	registered_residence_city: "",
	registered_residence_county: "",
	home_address: "",
	home_zip_code: "",
	family_member_information: "",
	father_health: "",
	mother_health: ""
});

const formRules = reactive<FormRules>({
	total_house_p: [{ required: true, message: "请填写完整", trigger: "blur" }],
	contact_number: [{ required: true, message: "请填写完整", trigger: "blur" }],
	parent_contact_number: [{ required: true, message: "请填写完整", trigger: "blur" }],
	home_address: [{ required: true, message: "请填写完整", trigger: "blur" }],
	home_zip_code: [{ required: true, message: "请填写完整", trigger: "blur" }],
	family_member_information: [{ required: true, message: "请填写家庭成员信息", trigger: "blur" }],
	registered_residence_province: [{ required: true, message: "请选择", trigger: "change" }],
	registered_residence_city: [{ required: true, message: "请选择", trigger: "change" }],
	registered_residence_county: [{ required: true, message: "请选择", trigger: "change" }]
});

// 所有城市数据
const allCityList: any = ref([]);
const provinceData: any = ref([]);
const cityData: any = ref([]);
const countyData: any = ref([]);

// 动态表格 设置
const column = [
	{ name: "name", label: "姓名", width: "auto", align: "center" },
	{ name: "parentIDNum", label: "家长身份证号", width: "auto", align: "center" },
	{ name: "age", label: "年龄", width: "auto", align: "center" },
	{ name: "call", label: "称呼", width: "auto", align: "center", valueType: "select", options: relativeAddress },
	{ name: "currentEducation", label: "当前所处教育阶段	", width: "auto", align: "center", valueType: "select", options: relativeEducationStage },
	{ name: "occupation", label: "职业", width: "auto", align: "center", valueType: "select", options: relativeOccupation },
	{ name: "wSUnit", label: "工作（学习）单位", width: "auto", align: "center" },
	{ name: "annualIncome", label: "年收入（元）", width: "auto", align: "center" },
	{ name: "health", label: "健康状况", width: "auto", align: "center", valueType: "select", options: Myhealth },
	{ name: "healthDescription", label: "健康情况描述", width: "auto", align: "center" }
];

const list = ref([{ name: "", parentIDNum: "", age: "", call: "", currentEducation: "", occupation: "", wSUnit: "", annualIncome: "", health: "", healthDescription: "" }]);
const editableKeys = ref([{ name: "", parentIDNum: "", age: "", call: "", currentEducation: "", occupation: "", wSUnit: "", annualIncome: "", health: "", healthDescription: "" }]);
const blank = ref({ name: "", parentIDNum: "", age: "", call: "", currentEducation: "", occupation: "", wSUnit: "", annualIncome: "", health: "", healthDescription: "" });

const add = (arr) => {
	for (let item of arr) {
		for (let attr in item) {
			if (attr.includes("edit")) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete item[attr];
			}
		}
	}
	form.family_member_information = JSON.stringify(arr); // 序列化
};
const onChange = (arr) => {
	list.value = arr;
	for (let item of arr) {
		for (let attr in item) {
			if (attr.includes("edit")) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete item[attr];
			}
		}
	}
	form.family_member_information = JSON.stringify(arr); // 序列化
};
const deleteAction = (row) => {
	for (let item of row) {
		for (let attr in item) {
			if (attr.includes("edit")) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete item[attr];
			}
		}
	}
	form.family_member_information = JSON.stringify(row); // 序列化
};

onMounted(() => {
	getData();
	getCityList();
});

/**
 * 获取所有城市数据
 * 赋值省份列表
 */
const getCityList = async () => {
	await getCityData()
		.then((res) => {
			if (res.data) {
				allCityList.value = res.data;
				res.data.forEach((item) => {
					if (item.parenId === 0) {
						provinceData.value.push(item);
					}
				});
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

/**
 * 选择省份后触发
 * 赋值城市列表
 */
const getcorresCityLidt = (val) => {
	form.registered_residence_province = val.value;
	allCityList.value.forEach((item) => {
		if (item.parenId === val.key) {
			cityData.value.push(item);
		}
	});
};

/**
 * 选择城市后触发
 * 赋值县列表
 */
const getCorresCountyLidt = (val) => {
	form.registered_residence_city = val.value;
	allCityList.value.forEach((item) => {
		if (item.parenId === val.key) {
			countyData.value.push(item);
		}
	});
};

/**
 * 获取复制
 */

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

const upApi = import.meta.env.VITE_BASE_API;
const upPath = "/upload/uploads/file";

const dialogVisible = ref(false);

const dialogImageUrl = ref();

const one = ref("");
const two = ref("");
const three = ref("");
const four = ref("");
const five = ref("");
const six = ref("");

const imgurlList1: any = ref([]);
const imgurlList2: any = ref([]);

const upload = ref<UploadInstance>();

const handleAvatarSuccess1: UploadProps["onSuccess"] = (response, uploadFile) => {
	one.value = response.url;
	imgurlList1.value.push(response.url);
	form.father_health = JSON.stringify(imgurlList1.value);
};

const handleAvatarSuccess2: UploadProps["onSuccess"] = (response, uploadFile) => {
	two.value = response.url;
	imgurlList1.value.push(response.url);
	form.father_health = JSON.stringify(imgurlList1.value);
};

const handleAvatarSuccess3: UploadProps["onSuccess"] = (response, uploadFile) => {
	three.value = response.url;
	imgurlList1.value.push(response.url);
	form.father_health = JSON.stringify(imgurlList1.value);
};

const handleAvatarSuccess4: UploadProps["onSuccess"] = (response, uploadFile) => {
	four.value = response.url;
	imgurlList2.value.push(response.url);
	form.mother_health = JSON.stringify(imgurlList2.value);
};

const handleAvatarSuccess5: UploadProps["onSuccess"] = (response, uploadFile) => {
	five.value = response.url;
	imgurlList2.value.push(response.url);
	form.mother_health = JSON.stringify(imgurlList2.value);
};

const handleAvatarSuccess6: UploadProps["onSuccess"] = (response, uploadFile) => {
	six.value = response.url;
	imgurlList2.value.push(response.url);
	form.mother_health = JSON.stringify(imgurlList2.value);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
	upload.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	upload.value!.handleStart(file);
};

// 图片预览
const handlePreview: UploadProps["onPreview"] = (uploadFile: any) => {
	dialogImageUrl.value = uploadFile.response.url!;
	dialogVisible.value = true;
};
// 删除图片
const handleRemove: UploadProps["onRemove"] = (file: any, uploadFiles) => {
	console.log(file, uploadFiles);
	if (one.value === file.response.url) {
		one.value = "";
		imgurlList1.value.splice(0, 1);
		form.father_health = JSON.stringify(imgurlList1.value);
	}
	if (two.value === file.response.url) {
		two.value = "";
		if (imgurlList1.value.length === 1) {
			imgurlList1.value.splice(0, 1);
			form.father_health = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 2) {
			imgurlList1.value.splice(1, 1);
			form.father_health = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 3) {
			imgurlList1.value.splice(1, 1);
			form.father_health = JSON.stringify(imgurlList1.value);
		}
	}
	if (three.value === file.response.url) {
		three.value = "";
		if (imgurlList1.value.length === 1) {
			imgurlList1.value.splice(0, 1);
			form.father_health = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 2) {
			imgurlList1.value.splice(1, 1);
			form.father_health = JSON.stringify(imgurlList1.value);
		} else if (imgurlList1.value.length === 3) {
			imgurlList1.value.splice(2, 1);
			form.father_health = JSON.stringify(imgurlList1.value);
		}
	}
	if (four.value === file.response.url) {
		four.value = "";
		imgurlList2.value.splice(0, 1);
		form.mother_health = JSON.stringify(imgurlList2.value);
	}
	if (five.value === file.response.url) {
		five.value = "";
		if (imgurlList2.value.length === 1) {
			imgurlList2.value.splice(0, 1);
			form.mother_health = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 2) {
			imgurlList2.value.splice(1, 1);
			form.mother_health = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 3) {
			imgurlList2.value.splice(1, 1);
			form.mother_health = JSON.stringify(imgurlList2.value);
		}
	}
	if (six.value === file.response.url) {
		six.value = "";
		if (imgurlList2.value.length === 1) {
			imgurlList2.value.splice(0, 1);
			form.mother_health = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 2) {
			imgurlList2.value.splice(1, 1);
			form.mother_health = JSON.stringify(imgurlList2.value);
		} else if (imgurlList2.value.length === 3) {
			imgurlList2.value.splice(2, 1);
			form.mother_health = JSON.stringify(imgurlList2.value);
		}
	}
};
const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm(`确定要删除 ${uploadFile.name} ?`).then(
		() => true,
		() => false
	);
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
	padding: 0 20px;

	.el-form {
		height: 100% !important;

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
