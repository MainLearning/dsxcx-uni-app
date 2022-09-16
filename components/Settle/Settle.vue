<template>
	<view>
		<view class="my-settle-container">
			<!-- 全选区域 -->
			<label class="radio" @click="changeAllState">
				<radio color="#C00000" :checked="isFullCheck" />
				<text>全选</text>
			</label>
			<!-- 合计区域 -->
			<view class="amount-box">
				合计:
				<text class="amount">￥{{ checkedGoodsAmount }}</text>
			</view>
			<!-- 结算按钮 -->
			<view class="btn-settle">结算({{ checkedCount }})</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	name: 'Settle',
	data() {
		return {};
	},
	computed: {
		...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
		// 是否全选
		isFullCheck() {
			return this.total === this.checkedCount;
		}
	},
	methods: {
		...mapMutations('cart', ['updateAllGoodsState']),
		changeAllState() {
			this.updateAllGoodsState(!this.isFullCheck);
		}
	}
};
</script>

<style lang="scss" scoped>
.my-settle-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	padding-left: 10rpx;
	font-size: 28rpx;
	background-color: white;

	.radio {
		display: flex;
		align-items: center;
	}

	.amount {
		color: #c00000;
	}

	.btn-settle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		height: 100rpx;
		color: #fff;
		background-color: #c00000;
	}
}
</style>
