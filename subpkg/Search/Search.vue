<template>
	<view>
		<view class="search-box">
			<!-- 使用 uni-ui 提供的搜索组件 -->
			<uni-search-bar
				@input="input"
				:radius="100"
				cancelButton="none"
				placeholder="请输入搜索内容"
			></uni-search-bar>
		</view>
		<view class="sugg-list">
			<view
				class="sugg-item"
				v-for="(item, i) in searchResults"
				:key="i"
				@click="gotoDetail(item.goods_id)"
			>
				<view class="goods-name">{{ item.goods_name }}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box">
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag
					:text="item"
					v-for="(item, i) in historyList"
					:key="i"
				></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 延时器的 timerId
			timer: null,
			// 搜索关键词
			kw: '',
			// 搜索结果列表
			searchResults: [],
			// 搜索关键词的历史记录
			historyList: []
		};
	},
	methods: {
		input(e) {
			// 清除 timer 对应的延时器
			clearTimeout(this.timer);
			// 重新启动一个延时器，并把 timerId 赋值给 this.timer
			this.timer = setTimeout(() => {
				// 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
				this.kw = e;
				this.getSearchList();
			}, 500);
		},
		async getSearchList() {
			// 判断关键词是否为空
			if (this.kw === '') {
				this.searchResults = [];
				return;
			}

			// 发起请求，获取搜索建议列表
			const {
				data: { message, meta }
			} = await uni.$http.get('/api/public/v1/goods/qsearch', {
				query: this.kw
			});
			if (meta.status !== 200) return uni.$showMsg();
			this.searchResults = message;
		},
		gotoDetail(id) {
			uni.navigateTo({
				url: `/subpkg/GoodsDetail/GoodsDetail?goods_id=${id}`
			});
		},
		// 保存搜索关键词的方法
		saveSearchHistory() {
			// 将 Array 数组转化为 Set 对象
			const set = new Set(this.historyList);
			// 调用 Set 对象的 delete 方法，移除对应的元素
			set.delete(this.kw);
			// 调用 Set 对象的 add 方法，向 Set 中添加元素
			set.add(this.kw);
			// 将 Set 对象转化为 Array 数组
			this.historyList = Array.from(set);
		}
	}
};
</script>

<style lang="scss" scoped>
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;

	/deep/ .uni-searchbar {
		display: flex;
		flex-direction: row;
		position: relative;
		padding: 16rpx;
		background-color: #c00000;
	}
}

.sugg-list {
	padding: 0 5px;

	.sugg-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		font-size: 12px;

		.goods-name {
			// 文字不允许换行（单行文本）
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}

.history-box {
	padding: 0 5px;

	.history-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;

		.uni-tag {
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
