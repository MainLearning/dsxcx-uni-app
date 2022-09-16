<template>
	<view v-if="goodInfo.goods_name" style="padding-bottom: 100rpx;">
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
		>
			<swiper-item v-for="(item, index) in goodInfo.pics" :key="item.goods_id">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<view class="price">￥{{ goodInfo.goods_price }}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{ goodInfo.goods_name }}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goodInfo.goods_introduce"></rich-text>
		<!-- 商品导航组件 -->
		<view class="goods_nav">
			<uni-goods-nav
				:fill="true"
				:options="options"
				:buttonGroup="buttonGroup"
				@click="onClick"
				@buttonClick="buttonClick"
			/>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('cart', ['total'])
	},
	watch: {
		// 监听 total 值的变化，通过第一个形参得到变化后的新值
		total: {
			handler(newValue) {
				const findResult = this.options.find(x => x.text === '购物车');
				if (findResult) {
					findResult.info = newValue;
				}
			},
			// 该属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
			immediate: true
		}
	},
	data() {
		return {
			// 商品详情对象
			goodInfo: {},
			// 左侧按钮组的配置对象
			options: [
				{
					icon: 'shop',
					text: '店铺'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 0
				}
			],
			// 右侧按钮组的配置对象
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	onLoad(options) {
		const { goods_id } = options;
		// 调用请求商品详情数据的方法
		this.getGoodsDetail(goods_id);
	},
	methods: {
		async getGoodsDetail(id) {
			const {
				data: { message, meta }
			} = await uni.$http.get('/api/public/v1/goods/detail', { goods_id: id });

			if (meta.status !== 200) return uni.$showMsg();

			message.goods_introduce = message.goods_introduce.replace(
				/<img /g,
				'<img style="display: block;"'
			);

			// 为 data 中的数据赋值
			this.goodInfo = message;
		},
		// 图片预览效果
		preview(index) {
			uni.previewImage({
				// 预览时，默认显示图片的索引
				current: index,
				// 所有图片 url 地址的数组
				urls: this.goodInfo.pics.map(x => x.pics_big)
			});
		},
		onClick(e) {
			if (e.content.text === '购物车') {
				// 切换到购物车页面
				uni.switchTab({
					url: '/pages/Cart/Cart'
				});
			}
		},
		...mapMutations('cart', ['addToCart']),
		buttonClick(e) {
			// 判断是否点击了 加入购物车 按钮
			if (e.content.text === '加入购物车') {
				// 组织一个商品的信息对象
				const goods = {
					goods_id: this.goodInfo.goods_id, // 商品的Id
					goods_name: this.goodInfo.goods_name, // 商品的名称
					goods_price: this.goodInfo.goods_price, // 商品的价格
					goods_count: 1, // 商品的数量
					goods_small_logo: this.goodInfo.goods_small_logo, // 商品的图片
					goods_state: true // 商品的勾选状态
				};

				this.addToCart(goods);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
swiper {
	height: 750rpx;

	image {
		width: 100%;
		height: 100%;
	}
}

.goods-info-box {
	padding: 20rpx;

	.price {
		margin: 20rpx 0;
		font-size: 36rpx;
		color: #c00000;
	}

	.goods-info-body {
		display: flex;
		justify-content: space-between;

		.goods-name {
			font-size: 26rpx;
			padding-right: 20rpx;
		}

		.favi {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 200rpx;
			font-size: 24rpx;
			border-left: 2rpx solid #efefef;
			color: gray;
		}
	}
}

.goods_nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
