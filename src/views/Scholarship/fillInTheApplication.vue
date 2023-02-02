<template>
	<div class="person">
		<el-form ref="formRef" :model="form" :rules="formRules" :disabled="disabled" label-width="130px" label-position="right">
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>基本信息</span>
					</div>
					<el-row>
						<el-col :span="16">
							<el-row>
								<el-col :span="12">
									<el-form-item label="学生姓名：" prop="student_name">
										<el-input v-model="form.student_name" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="性别：" prop="student_sex">
										<el-select v-model="form.student_sex">
											<el-option label="男" value="男" />
											<el-option label="女" value="女" />
											<el-option label="其他" value="其他" />
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="出生日期：" prop="student_birthday">
										<el-config-provider :locale="zhCn" v-if="userim === 3">
											<el-date-picker v-model="form.student_birthday" type="date" format="YYYY年MM月" value-format="YYYY年MM月" />
										</el-config-provider>
										<el-config-provider :locale="zhCn" v-else>
											<el-date-picker v-model="form.student_birthday" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
										</el-config-provider>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="民族：" prop="student_nation">
										<el-select v-model="form.student_nation">
											<el-option v-for="item in studentNationList" :key="item.id" :label="item.value" :value="item.value" />
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="联系电话：" prop="contact_number">
										<el-input v-model="form.contact_number" />
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="身份证号：" prop="id_card_number">
										<el-input v-model="form.id_card_number" />
									</el-form-item>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="8" class="my_avatar">
							<el-form-item label="个人照：" class="uploader" prop="imageUrl">
								<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" style="width: 100px; height: 140px" />
								<el-button v-if="form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">更换</el-button>
								<el-button v-if="!form.imageUrl" type="primary" style="margin-left: 10px" @click="getCropper">上传</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="高校名称：" prop="university_name">
								<el-input v-model="form.university_name" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="院系名称：" prop="student_college">
								<el-select v-model="form.student_college">
									<el-option v-for="item in collegeList" :key="item.id" :label="item.value" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="所在班级号：" v-if="userim == 2 || userim == 1">
								<el-input v-model="form.student_class" />
							</el-form-item>
							<el-form-item label="班级名称：" prop="class_name" v-else>
								<el-input v-model="form.class_name" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label="政治面貌：" prop="political_outlook">
								<el-select v-model="form.political_outlook">
									<el-option v-for="item in politicalOutlookList" :key="item.id" :label="item.value" :value="item.value" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="宿舍表现：" prop="dormitory_performance" v-if="userim == 1">
								<el-select v-model="form.dormitory_performance">
									<el-option label="良好" value="良好" />
									<el-option label="优秀" value="优秀" />
								</el-select>
							</el-form-item>
							<el-form-item label="入学时间：" prop="student_start_year" v-else>
								<el-config-provider :locale="zhCn">
									<el-date-picker v-model="form.student_start_year" type="month" format="YYYY年MM月" value-format="YYYY年MM月" />
								</el-config-provider>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="学号：" prop="student_no">
								<el-input v-model="form.student_no" />
							</el-form-item>
						</el-col>
					</el-row>

					<el-row>
						<el-col :span="8">
							<el-form-item label="专业：" prop="student_major">
								<el-input v-model="form.student_major" />
							</el-form-item>
						</el-col>
						<el-col :span="8" v-if="userim === 2 || userim === 3">
							<el-form-item label="学制：" prop="educational_system">
								<el-input v-model="form.educational_system" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="所在年级：" prop="grade" v-if="userim === 2">
								<el-input v-model="form.grade" />
							</el-form-item>
							<el-form-item label="担任职务：" v-if="userim == 1">
								<el-input v-model="form.student_position" />
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item label="曾获何种奖励：" v-if="userim == 1 || userim == 2 || userim == 4">
						<el-input v-model="form.awards" type="textarea" show-word-limit />
					</el-form-item>
					<el-form-item label="主要先进事迹：" v-if="userim == 1">
						<el-input v-model="form.meritorious_deeds" type="textarea" show-word-limit />
					</el-form-item>
					<el-form-item label="专长、创新表现：" v-if="userim == 1">
						<el-input v-model="form.awards" type="textarea" show-word-limit />
					</el-form-item>
					<el-form-item label="大学期间主要获奖情况：" v-if="userim == 3" style="width: 100%">
						<edit-table :columns="column" :data="list" :blank="blank" @add="add" ref="table" :editableKeys="editableKeys" @onChange="onChange" @del="deleteAction" style="width: 100%" />
					</el-form-item>
				</el-card>
			</div>
			<div class="card-container" v-if="userim === 4">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>家庭经济情况</span>
					</div>
					<el-row type="flex">
						<el-col :span="8">
							<el-form-item label="家庭人口总数：" prop="total_house_p">
								<el-input v-model="form.total_house_p" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="家庭月总收入：" prop="total_monthly_house">
								<el-input v-model="form.total_monthly_house" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="人均月收入：" prop="per_capita_monthly">
								<el-input v-model="form.per_capita_monthly" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex">
						<el-col :span="8">
							<el-form-item label="收入来源：" prop="source_of_income">
								<el-input v-model="form.source_of_income" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="家庭住址：" prop="home_address">
								<el-input v-model="form.home_address" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="邮政编码：" prop="postal_code">
								<el-input v-model="form.postal_code" />
							</el-form-item>
						</el-col>
					</el-row>
				</el-card>
			</div>
			<div class="card-container">
				<el-card>
					<div slot="header" class="clear-fix">
						<span>学习成绩</span>
					</div>
					<el-row type="flex">
						<el-col :span="8">
							<el-form-item label="成绩排名：" prop="scoreRanking">
								<el-input v-model="form.scoreRanking" style="width: 50px !important" />
								<span style="margin: 0 10px">/</span>
								<el-form-item prop="total_class_size">
									<el-input v-model="form.total_class_size" style="width: 60px !important" />
								</el-form-item>
								<span>（名次 / 总人数）</span>
							</el-form-item>
						</el-col>
						<el-col :span="16">
							<el-form-item label="必修课：" prop="required_quantity" v-if="userim !== 1">
								<el-input v-model="form.required_quantity" style="width: 50px !important" />
								<span style="margin: 0 10px">/</span>
								<el-form-item prop="number_of_passes">
									<el-input v-model="form.number_of_passes" style="width: 60px !important" />
								</el-form-item>
								<span>（必修课数 / 必修课及格数）</span>
							</el-form-item>
							<el-col :span="16" v-if="userim == 1">
								<el-form-item label="综测排名：" prop="comprehensive_ranking">
									<el-input v-model="form.comprehensive_ranking" style="width: 50px !important" />
									<span style="margin: 0 10px">/</span>
									<el-form-item prop="total_number_of_comprehensive">
										<el-input v-model="form.total_number_of_comprehensive" style="width: 60px !important" />
										<span>（名次 / 总人数）</span>
									</el-form-item>
								</el-form-item>
							</el-col>
						</el-col>
					</el-row>
					<el-row type="flex">
						<el-col :span="8">
							<el-form-item label="是否实行综合考评排名：" label-width="180px" v-if="userim !== 1">
								<el-switch v-model="form.is_comprehensive_survey" active-text="是" inactive-text="否" active-value="0" inactive-value="1" />
							</el-form-item>
						</el-col>
						<el-col :span="12" v-if="form.is_comprehensive_survey == '0' && userim !== 1">
							<el-form-item label="综测排名：" prop="comprehensive_ranking">
								<el-input v-model="form.comprehensive_ranking" style="width: 50px !important" />
								<span style="margin: 0 10px">/</span>
								<el-form-item prop="total_number_of_comprehensive">
									<el-input v-model="form.total_number_of_comprehensive" style="width: 60px !important" />
									<span>（名次 / 总人数）</span>
								</el-form-item>
							</el-form-item>
						</el-col>
						<!-- <el-col :span="8"> </el-col> -->
					</el-row>
					<el-row type="flex" v-if="userim == 1">
						<el-col :span="8">
							<el-form-item label="英语过级情况：" prop="english_level">
								<el-input v-model="form.english_level" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="计算机过级情况：" prop="computer_level">
								<el-input v-model="form.computer_level" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-row type="flex" v-if="userim == 1">
						<el-col :span="8">
							<el-form-item label="学年成绩平均分：" prop="average">
								<el-input v-model="form.average" />
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="学年成绩最低分：" prop="minimum_core">
								<el-input v-model="form.minimum_core" />
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="申请理由：" prop="" v-if="userim !== 1">
						<el-input v-model="form.reason_for_application" type="textarea" :show-word-limit="true" />
					</el-form-item>
				</el-card>
			</div>
		</el-form>
		<div class="btn">
			<el-button type="primary" @click="Visible = true" v-if="route.query.Num">
				提交审核<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
			</el-button>
			<el-button type="primary" @click="submitForm(formRef)" v-else>
				提交申请<el-icon style="margin-left: 5px" :size="18"><TopRight /></el-icon>
			</el-button>
		</div>

		<examineDia ref="toexamineDia" :visible="Visible" :news="news" @DaiVisi="DaiVisi" @postData="submitForReview" v-if="route.query.Num && Visible"></examineDia>
		<AvatarCropper :dialogVisible="dialogVisibles" :url="form.imageUrl" @upRrl="getUrl" @parentChang="parentChang"></AvatarCropper>
	</div>
</template>

<script setup lang="ts">
import fillInTheApplication from "@/util/Scholarship/fillInTheApplication";
import examineDia from "@/components/examineDialog/index.vue";
const {
	toexamineDia,
	disabled,
	route,
	Visible,
	news,
	zhCn,
	EditTable,
	AvatarCropper,
	DaiVisi,
	studentNationList,
	politicalOutlookList,
	formRef,
	collegeList,
	userim,
	form,
	formRules,
	column,
	list,
	editableKeys,
	blank,
	add,
	onChange,
	deleteAction,
	dialogVisibles,
	getCropper,
	getUrl,
	parentChang,
	submitForm,
	submitForReview
} = fillInTheApplication();
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
		height: calc(100% - 40px) !important;
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
		margin-bottom: -500px;
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
