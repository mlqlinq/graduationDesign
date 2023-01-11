<template>
	<div class="home card">
		<el-card>
			<img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
		</el-card>
	</div>
</template>

<script setup lang="ts" name="home"></script>
<style lang="scss" scoped>
.home {
	width: 97%;
	height: calc(100% - 10px);
	margin: 0 auto;

	.el-card {
		height: calc(100% - 10px);
		border-radius: 10px;
		:deep(.el-card__body) {
			padding: 0;
			text-align: center;

			.home-bg {
				width: 80%;
				height: 100%;
				display: block;
				margin: 0 auto;
				// margin-bottom: 20px;
			}
		}
	}
}
</style>
