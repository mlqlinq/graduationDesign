<template>
	<div class="copyright">
		<p class="copy-footer-29">
			© 2022 Report. All rights reserved | Design by
			<a href="https://github.com/mlqlinq/graduationDesign" target="_blank">马林权</a>
		</p>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.copyright {
	height: 40px;
	width: 100%;
	background-color: #fff;
	display: inline-flex;
	justify-content: space-around;
	align-items: flex-end;
	overflow-x: hidden;
	position: fixed;
	bottom: 0;

	p {
		text-align: center;
		font-size: 17px;
		line-height: 10px;
		color: #000;
		opacity: 1;

		a {
			text-decoration: none;
			color: #000;
		}
	}
}
</style>
