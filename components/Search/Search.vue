<template>
	<view class="search-box">
		<view class="my-search-container">
			<!-- 使用 view 组件模拟 input 输入框的样式 -->
			<view class="my-search-box" @click="gotoSearch">
				<uni-icons type="search" size="17"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Search',

	data() {
		return {};
	},
	methods: {
		gotoSearch() {
			uni.navigateTo({
				url: '/subpkg/Search/Search'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;

	.my-search-container {
		display: flex;
		align-items: center;
		height: 100rpx;
		padding: 0 20rpx;
		background-color: #c00000;

		.my-search-box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 72rpx;
			border-radius: 30rpx;
			background-color: #ffffff;

			text {
				font-size: 30rpx;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
