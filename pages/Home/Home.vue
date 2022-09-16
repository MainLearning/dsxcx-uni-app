<template>
	<view>
		<Search />
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
		>
			<swiper-item
				v-for="item in swiperList"
				:key="item.goods_id"
				@click="goToGoods(item.goods_id)"
			>
				<view class="swiper-item"><image :src="item.image_src"></image></view>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view
				class="nav-item"
				v-for="(item, index) in navList"
				:key="index"
				@click="navClickHandler(item)"
			>
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<!-- 左侧 -->
					<view
						class="left-img-box"
						@click="goToGoodsList(item.product_list[0].url)"
					>
						<image
							:src="item.product_list[0].image_src"
							:style="{ width: item.product_list[0].image_width + 'rpx' }"
							mode="widthFix"
						></image>
					</view>
					<!-- 右侧 -->
					<view class="right-img-box">
						<view
							class="right-img-item"
							v-for="(item2, i2) in item.product_list"
							:key="i2"
							v-if="i2 !== 0"
							@click="goToGoodsList(item2.url)"
						>
							<image
								:src="item2.image_src"
								mode="widthFix"
								:style="{ width: item2.image_width + 'rpx' }"
							></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import Search from '@/components/Search/Search.vue';
export default {
	components: {
		Search
	},
	data() {
		return {
			// 轮播图的数据列表
			swiperList: [],
			// 分类导航的数据列表
			navList: [],
			// 楼层的数据列表
			floorList: []
		};
	},
	onLoad() {
		this.getSwiperList();
		this.getNavList();
		this.getFloorList();
	},
	methods: {
		async getSwiperList() {
			const {
				data: { message, meta }
			} = await uni.$http.get('/api/public/v1/home/swiperdata');

			if (meta.status !== 200) return uni.$showMsg();
			this.swiperList = message;
		},
		goToGoods(id) {
			uni.navigateTo({
				url: `/subpkg/GoodsDetail/GoodsDetail?goods_id=${id}`
			});
		},
		async getNavList() {
			const {
				data: { message, meta }
			} = await uni.$http.get('/api/public/v1/home/catitems');
			// console.log(message);
			if (meta.status !== 200) return uni.$showMsg();
			this.navList = message;
		},
		navClickHandler(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/Cate/Cate'
				});
			}
		},
		async getFloorList() {
			const {
				data: { message, meta }
			} = await uni.$http.get('/api/public/v1/home/floordata');
			if (meta.status !== 200) return uni.$showMsg();
			message.forEach(item => {
				item.product_list.forEach(prod => {
					prod.url = `/subpkg/GoodsList/GoodsList?${
						prod.navigator_url.split('?')[1]
					}`;
				});
			});
			this.floorList = message;
		},
		goToGoodsList(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
swiper {
	height: 330rpx;

	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}

.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;

	image {
		width: 128rpx;
		height: 140rpx;
	}
}

.floor-list {
	.floor-title {
		display: flex;
		width: 100%;
		height: 60rpx;
	}

	.floor-img-box {
		display: flex;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
}
</style>
