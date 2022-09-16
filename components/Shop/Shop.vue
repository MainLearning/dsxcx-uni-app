<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio
				:checked="goods.goods_state"
				color="#C00000"
				@click="radioClickHandler"
			/>
			<image :src="goods.goods_small_logo" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{ goods.goods_price }}</view>
				<uni-number-box
					:min="1"
					:value="goods.goods_count"
					@change="numChangeHandler"
				></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Shop',
	props: {
		goods: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {};
	},
	methods: {
		radioClickHandler() {
			this.$emit('radioChangeHandler', {
				// 商品的 Id
				goods_id: this.goods.goods_id,
				// 商品最新的勾选状态
				goods_state: !this.goods.goods_state
			});
		},
		numChangeHandler(value) {
			this.$emit('numberChangeHandler', {
				// 商品的 Id
				goods_id: this.goods.goods_id,
				// 商品的最新数量
				goods_count: +value
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;

	.goods-item-left {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 5px;

		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}

	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.goods-name {
			font-size: 13px;
		}

		.goods-info-box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
}
</style>
