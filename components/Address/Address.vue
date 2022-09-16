<template>
	<view style="border-bottom: 4rpx dashed #009999;">
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button
				type="primary"
				size="mini"
				class="btnChooseAddress"
				@click="chooseAddress"
			>
				请选择收货地址+
			</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：
						<text>{{ address.userName }}</text>
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：
						<text>{{ address.telNumber }}</text>
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{ addstr }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	name: 'Address',
	data() {
		return {};
	},
	computed: {
		// 收货详细地址的计算属性
		...mapState('user', ['address']),
		...mapGetters('user', ['addstr'])
	},
	methods: {
		chooseAddress() {
			this.$store.dispatch('user/UpdateAddress');
		}
	}
};
</script>

<style lang="scss" scoped>
.address-choose-box {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 180rpx;
}

.address-info-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 180rpx;
	padding: 0 10rpx;
	font-size: 24rpx;

	.row1 {
		display: flex;
		justify-content: space-between;

		.row1-right {
			display: flex;
			align-items: center;

			.phone {
				margin-right: 5px;
			}
		}
	}

	.row2 {
		display: flex;
		align-items: center;
		margin-top: 10px;

		.row2-left {
			white-space: nowrap;
		}
	}
}
</style>
