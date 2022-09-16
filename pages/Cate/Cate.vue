<template>
	<view>
		<Search />
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view
				scroll-y="true"
				class="left-scroll-view"
				:style="{ height: wh + 'px' }"
			>
				<block v-for="(item, i) in cateList" :key="item.cat_id">
					<view
						:class="['left-scroll-view-item', i === active ? 'active' : '']"
						@click="activeChange(i)"
					>
						{{ item.cat_name }}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view
				scroll-y="true"
				class="right-scroll-view"
				:style="{ height: wh + 'px' }"
			>
				<view class="cate-lv2" v-for="item in cateLevel2" :key="item.cat_id">
					<view class="cate-lv2-title">{{ item.cat_name }}</view>
					<!-- 三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<view
							class="cate-lv3-item"
							v-for="item2 in item.children"
							@click="goTo(item2.cat_id)"
						>
							<image :src="item2.cat_icon" class="cate-lv3-item"></image>
							<text>{{ item2.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
			// 窗口的可用高度
			wh: 0,
			// 分类数据列表
			cateList: [],
			active: 0,
			// 二级分类列表
			cateLevel2: []
		};
	},
	onLoad() {
		const { windowHeight } = uni.getSystemInfoSync();
		this.wh = windowHeight - 50;
		this.getCateList();
	},
	methods: {
		async getCateList() {
			const {
				data: { message, meta }
			} = await uni.$http.get('/api/public/v1/categories');

			if (meta.status !== 200) return uni.$showMsg();
			this.cateList = message;
			// 为二级分类赋值
			this.cateLevel2 = message[0].children;
		},
		activeChange(i) {
			this.active = i;
			// 为二级分类列表重新赋值
			this.cateLevel2 = this.cateList[i].children;
		},
		goTo(query) {
			uni.navigateTo({
				url: `/subpkg/GoodsList/GoodsList?cid=${query}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-view-container {
	display: flex;

	.left-scroll-view {
		width: 120px;

		.left-scroll-view-item {
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			background-color: #f7f7f7;

			&.active {
				background-color: #ffffff;
				position: relative;

				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}

	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 33.3%;
			margin-bottom: 20rpx;

			image {
				width: 120rpx;
				height: 120rpx;
			}

			text {
				font-size: 24rpx;
			}
		}
	}
}
</style>
