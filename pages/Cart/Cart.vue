<template>
	<view>
		<view style="padding-bottom: 100rpx;" v-if="cart.length !== 0">
			<Address />
			<!-- 购物车商品列表的标题区域 -->
			<view class="cart-title">
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 描述文本 -->
				<text class="cart-title-text">购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="item in cart" :key="item.goods_id">
					<uni-swipe-action-item
						:right-options="options"
						:show="isOpened"
						:auto-close="false"
						@click="bindClick(item.goods_id)"
					>
						<Shop
							:goods="item"
							@radioChangeHandler="radioChangeHandler"
							@numberChangeHandler="numberChangeHandler"
						/>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<Settle />
		</view>
		<view class="empty-cart" v-else>
			<image src="../../static/image/shop.png" class="empty-img"></image>
			<text class="tip-text">空空如也~</text>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import Shop from '@/components/Shop/Shop.vue';
import Address from '@/components/Address/Address.vue';
import Settle from '@/components/Settle/Settle.vue';
export default {
	components: { Shop, Address, Settle },
	computed: {
		...mapGetters('cart', ['total']),
		...mapState('cart', ['cart'])
	},
	data() {
		return {
			options: [
				{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}
			],
			isOpened: true
		};
	},
	onShow() {
		this.setBadge();
	},
	methods: {
		...mapMutations('cart', [
			'updateGoodsCount',
			'removeGoodsById',
			'updateGoodsState'
		]),
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			});
		},
		// 商品的勾选状态发生了变化
		radioChangeHandler(e) {
			this.updateGoodsState(e);
		},
		// 商品的数量发生了变化
		numberChangeHandler(e) {
			this.updateGoodsCount(e);
			this.setBadge();
		},
		bindClick(id) {
			this.removeGoodsById(id);
			this.setBadge();
		}
	}
};
</script>

<style lang="scss" scoped>
.cart-title {
	display: flex;
	align-items: center;
	height: 80rpx;
	padding-left: 10rpx;
	border-bottom: 4rpx solid #efefef;
	font-size: 28rpx;

	.cart-title-text {
		margin-left: 20rpx;
	}
}

.empty-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 300rpx;

	.empty-img {
		width: 180rpx;
		height: 180rpx;
	}

	.tip-text {
		margin-top: 30rpx;
		font-size: 24rpx;
		color: gray;
	}
}
</style>
