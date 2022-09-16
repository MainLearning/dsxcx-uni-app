<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="getUserInfo">
			一键登录
		</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {};
	},
	methods: {
		getUserInfo() {
			this.$store.dispatch('user/getUserInfo');
		}
	}
};
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	height: 750rpx;
	overflow: hidden;
	background-color: #f8f8f8;

	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		border-radius: 100%;
		transform: translateY(50%);
		background-color: white;
	}

	.btn-login {
		width: 90%;
		border-radius: 200rpx;
		margin: 30rpx 0;
		background-color: #c00000;
	}

	.tips-text {
		font-size: 24rpx;
		color: gray;
	}
}
</style>
