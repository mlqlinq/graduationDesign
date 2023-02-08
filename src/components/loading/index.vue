<template>
	<div>
		<div class="circle-loader">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<span style="color: #fff; margin-top: 40px">正在加载，请稍后...</span>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.circle-loader {
	position: relative;
}

.circle-loader div {
	height: 10px;
	width: 10px;
	background-color: #03a9f4;
	border-radius: 50%;
	position: absolute;
	-webkit-animation: 1.3s opaque ease-in-out infinite both;
	animation: 1.3s opaque ease-in-out infinite both;
}

.circle-loader > div:nth-child(1) {
	top: -25px;
	left: 0;
}

.circle-loader > div:nth-child(2) {
	top: -17px;
	left: 17px;
	-webkit-animation-delay: 0.15s;
	animation-delay: 0.15s;
}

.circle-loader > div:nth-child(3) {
	top: 0;
	left: 25px;
	-webkit-animation-delay: 0.3s;
	animation-delay: 0.3s;
}

.circle-loader > div:nth-child(4) {
	top: 17px;
	left: 17px;
	-webkit-animation-delay: 0.45s;
	animation-delay: 0.45s;
}

.circle-loader > div:nth-child(5) {
	top: 25px;
	left: 0;
	-webkit-animation-delay: 0.6s;
	animation-delay: 0.6s;
}

.circle-loader > div:nth-child(6) {
	top: 17px;
	left: -17px;
	-webkit-animation-delay: 0.75s;
	animation-delay: 0.75s;
}

.circle-loader > div:nth-child(7) {
	top: 0;
	left: -25px;
	-webkit-animation-delay: 0.9s;
	animation-delay: 0.9s;
}

.circle-loader > div:nth-child(8) {
	top: -17px;
	left: -17px;
	-webkit-animation-delay: 1.05s;
	animation-delay: 1.05s;
}

@-webkit-keyframes opaque {
	0%,
	40%,
	100% {
		opacity: 0.1;
	}
	40% {
		opacity: 1;
	}
}

@keyframes opaque {
	0%,
	40%,
	100% {
		opacity: 0.1;
	}
	40% {
		opacity: 1;
	}
}
</style>
