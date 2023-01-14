<template>
	<el-dialog title="上传头像" v-model="props.dialogVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" destroy-on-close width="600px">
		<div class="avatar-container">
			<!-- 待上传图片 -->
			<div v-show="!options.img">
				<el-upload class="upload" ref="upload" action="#" :on-change="uploadData" accept="image/png, image/jpeg, image/jpg" :show-file-list="false" :auto-upload="false">
					<el-button slot="trigger" type="primary" ref="uploadBtn"> 选择图片 </el-button>
				</el-upload>
				<!-- <el-upload v-if="props.url" class="avatar-uploader" :auto-upload="false" :show-file-list="false" accept=".jpg, .png, .JPG, .PNG, .jpeg, .JPEG">
					<el-button v-if="props.url" type="primary" style="margin-left: 10px">更换</el-button>
				</el-upload> -->
			</div>
			<!-- <img :src="options.img" alt="" /> -->
			<!-- 已上传图片 -->
			<div v-if="options.img" class="avatar-crop">
				<vueCropper
					class="crop-box"
					ref="cropper"
					:img="options.img"
					:autoCrop="options.autoCrop"
					:fixedBox="options.fixedBox"
					:canMoveBox="options.canMoveBox"
					:autoCropWidth="options.autoCropWidth"
					:autoCropHeight="options.autoCropHeight"
					:centerBox="options.centerBox"
					:fixed="options.fixed"
					:fixedNumber="options.fixedNumber"
					:canMove="options.canMove"
					:canScale="options.canScale"
				></vueCropper>
			</div>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<div class="reupload" @click="reupload">
					<span v-if="options.img">重新上传</span>
				</div>
				<div>
					<el-button @click="closeDialog">取 消</el-button>
					<el-button type="primary" @click="getCrop">确 定</el-button>
				</div>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import type { UploadProps } from "element-plus";
import { uploads } from "@/http/api/upload";

const props = defineProps({
	dialogVisible: {
		type: Boolean,
		default: false
	},
	url: {
		type: String,
		default: ""
	}
});

const emits = defineEmits(["parentChang", "upRrl"]);

const cropper: any = ref(null);
const uploadBtn: any = ref(null);
const upload: any = ref(null);

// vueCropper组件 裁剪配置信息
const options: any = reactive({
	img: "", // 原图文件
	autoCrop: true, // 默认生成截图框
	fixedBox: false, // 固定截图框大小
	canMoveBox: true, // 截图框可以拖动
	autoCropWidth: 200, // 截图框宽度
	autoCropHeight: 280, // 截图框高度
	fixed: true, // 截图框宽高固定比例
	fixedNumber: [5, 7], // 截图框的宽高比例
	centerBox: true, // 截图框被限制在图片里面
	canMove: false, // 上传图片不允许拖动
	canScale: false // 上传图片不允许滚轮缩放
});

// 读取原图
const uploadData: UploadProps["onChange"] = (file: any, uploadFiles) => {
	const isIMAGE = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
	const isLt2M = file.raw.size / 1024 / 1024 > 2;
	if (!isIMAGE) {
		ElNotification({
			title: "温馨提示",
			message: "请选择 jpg、png 格式的图片",
			type: "warning"
		});
		return false;
	}
	if (isLt2M) {
		ElNotification({
			title: "温馨提示",
			message: "图片大小不能超过 2MB",
			type: "warning"
		});
		return false;
	}
	const reader = new FileReader();
	reader.readAsDataURL(file.raw);

	reader.onload = (e: any) => {
		options.img = e.target.result; // base64
	};
	upload.value.clearFiles(); // 这里处理重新上传时，upload组件change事件错误问题
};

// 获取截图信息
const getCrop = () => {
	// 获取截图的 base64 数据
	// cropper.value.getCropData((data) => {
	// 	console.log(data);
	// });
	// // 获取截图的 blob 数据
	// //console.log(cropper.value);
	cropper.value.getCropBlob(async (data) => {
		ElNotification({
			title: "温馨提示",
			message: "正在上传，请稍后...",
			type: "warning"
		});
		let formData = new FormData();
		//第三个参数是规定以什么为后缀，接口是根据后缀来返回地址格式的
		formData.append("file", data, "chris.jpg");
		//上传接口
		await uploads(formData)
			.then((res) => {
				options.img = res.url;
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				ElNotification({
					title: "温馨提示",
					message: err,
					type: "error"
				});
			});
		closeDialog();
	});
};

// 重新上传
const reupload = () => {
	uploadBtn.value.ref.click();
};

// 关闭弹框
const closeDialog = () => {
	emits("parentChang", false);
	emits("upRrl", options.img);
	options.img = "";
};
</script>

<style lang="scss" scoped>
.dialog-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	.reupload {
		color: #409eff;
		cursor: pointer;
	}
}
.avatar-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 560px;
	height: 350px;
	background-color: #f0f2f5;
	margin-right: 10px;
	border-radius: 4px;
	.upload {
		text-align: center;
		margin-bottom: 24px;
	}
	.avatar-crop {
		width: 560px;
		height: 350px;
		position: relative;
		.crop-box {
			width: 100%;
			height: 100%;
			border-radius: 4px;
			overflow: hidden;
		}
	}
}
</style>
