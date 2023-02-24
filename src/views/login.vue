<template>
	<div class="indexLogin">
		<section class="login_index">
			<h1>家庭经济困难学生奖助学金综合管理系统</h1>
			<div class="container">
				<div class="workinghny-form-grid">
					<div class="main-hotair">
						<div class="login_ind align-self">
							<div class="left_grid_info">
								<img alt="家庭经济困难学生奖助学金综合管理系统" class="img-fluid" src="@/assets/images/1.png" />
								<div style="font-size: 12px">
									<p style="color: aliceblue">测试号：密码默认123456</p>
									<span style="color: aliceblue; margin-right: 20px">高校：13640</span>
									<span style="color: aliceblue">书记：460400255221149642</span>
									<br />
									<span style="color: aliceblue; margin-right: 20px">导员：460400255221149657</span>
									<span style="color: aliceblue">学生：460400255221149662</span>
								</div>
							</div>
						</div>
						<div class="content-wthree">
							<h2>登&nbsp;&nbsp;&nbsp;&nbsp;录</h2>
							<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-position="left" label-width="100px" size="large">
								<el-form-item label="用户身份:" prop="userIdentity">
									<el-select v-model="ruleForm.userIdentity" placeholder="请选择" popper-class="userIdentity" clearable>
										<el-option label="管理员登录" :value="0" />
										<el-option label="高校登录" :value="1" />
										<el-option label="书记登录" :value="2" />
										<el-option label="导员登录" :value="3" />
										<el-option label="学生登录" :value="4" />
										<template #prefix>
											<el-icon>
												<HomeFilled />
											</el-icon>
										</template>
									</el-select>
								</el-form-item>
								<el-form-item label="账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:" prop="name">
									<el-input v-model="ruleForm.name" placeholder="请输入您的账号">
										<template #prefix>
											<el-icon>
												<User />
											</el-icon>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:" prop="password">
									<el-input v-model="ruleForm.password" placeholder="请输入密码" show-password type="password">
										<template #prefix>
											<el-icon>
												<Lock />
											</el-icon>
										</template>
									</el-input>
								</el-form-item>
								<el-form-item label="验&nbsp;&nbsp;证&nbsp;&nbsp;码:" prop="verificationCode">
									<el-row :gutter="20">
										<el-col :span="13">
											<el-input v-model="ruleForm.verificationCode" clearable />
										</el-col>
										<el-col :span="6">
											<div class="login-code" @click="getOnCode" v-html="imgUrl"></div>
										</el-col>
									</el-row>
								</el-form-item>
								<el-form-item class="item_btn">
									<el-button :disabled="isdisabled" :loading="showLoading" type="primary" @click="submitForm(ruleFormRef)">
										<span v-if="!showLoading">登 录</span>
										<span v-else>登 录 中...</span>
									</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</div>
			<!-- footer -->
			<Foot style="background: none" />
		</section>
	</div>
</template>

<script lang="ts" setup>
import login from "@/util/login";
import Foot from "@/components/Footer/index.vue";
const { imgUrl, getOnCode, ruleFormRef, ruleForm, rules, showLoading, isdisabled, submitForm } = login();
</script>

<style lang="scss" scoped src="../assets/css/login.scss"></style>
