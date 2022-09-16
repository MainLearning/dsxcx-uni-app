<template>
	<view>
		<view class="goods-list">
			<block v-for="item in goodsList" :key="item.cat_id">
				<view class="goods-item" @click="gotoDetail(item.goods_id)">
					<!-- 商品左侧图片区域 -->
					<view class="goods-item-left">
						<image :src="item.goods_small_logo" class="goods-pic"></image>
					</view>
					<!-- 商品右侧信息区域 -->
					<view class="goods-item-right">
						<!-- 商品标题 -->
						<view class="goods-name">{{ item.goods_name }}</view>
						<view class="goods-info-box">
							<!-- 商品价格goods-price -->
							<view class="goods-price">
								￥{{ item.goods_price | toFixed }}
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 请求参数对象
			queryObj: {
				// 查询关键词
				query: '',
				// 商品分类Id
				cid: '',
				// 页码值
				pagenum: 1,
				// 每页显示多少条数据
				pagesize: 10
			},
			// 商品列表的数据
			goodsList: [],
			// 总数量，用来实现分页
			total: 0,
			// 是否正在请求数据
			isloading: false
		};
	},
	onLoad(options) {
		// 将页面参数转存到 this.queryObj 对象中
		this.queryObj.query = options.query || '';
		this.queryObj.cid = options.cid || '';

		// 调用获取商品列表数据的方法
		this.getGoodsList();
	},
	methods: {
		async getGoodsList(callback) {
			// 打开节流阀
			this.isloading = true;
			// 发起请求
			const {
				data: { message, meta }
			} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
			// 关闭节流阀
			this.isloading = false;
			// 只要数据请求完毕，就立即按需调用 cb 回调函数
			callback && callback();

			if (meta.status !== 200) return uni.$showMsg();
			// 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
			this.goodsList = [...this.goodsList, ...message.goods];
			this.total = message.total;
		},
		gotoDetail(id) {
			uni.navigateTo({
				url: `/subpkg/GoodsDetail/GoodsDetail?goods_id=${id}`
			});
		}
	},
	filters: {
		toFixed(num) {
			return Number(num).toFixed(2);
		}
	},
	// 触底的事件
	onReachBottom() {
		// 判断是否还有下一页数据
		if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
			return uni.$showMsg('数据加载完毕！');

		// 判断是否正在请求其它数据，如果是，则不发起额外的请求
		if (this.isloading) return;
		this.queryObj.pagenum++;
		this.getGoodsList();
	},
	// 下拉刷新的事件
	onPullDownRefresh() {
		// 重置关键数据
		this.queryObj.pagenum = 1;
		this.total = 0;
		this.isloading = false;
		this.goodsList = [];

		// 重新发起请求
		this.getGoodsList(() => uni.stopPullDownRefresh());
	}
};
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 20rpx 10rpx;
	border-bottom: 2rpx solid #f0f0f0;

	.goods-item-left {
		margin-right: 10rpx;

		.goods-pic {
			display: block;
			width: 200rpx;
			height: 200rpx;
		}
	}

	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.goods-name {
			font-size: 26rpx;
		}

		.goods-price {
			font-size: 32rpx;
			color: #c00000;
		}
	}
}
</style>
