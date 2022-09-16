const state = {
	cart: JSON.parse(uni.getStorageSync('cart') || '[]')
}

const mutations = {
	addToCart(state, goods) {
		// 根据提交的商品的Id，查询购物车中是否存在这件商品
		// 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
		const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

		if (!findResult) {
			// 如果购物车中没有这件商品，则直接 push
			state.cart.push(goods)
		} else {
			// 如果购物车中有这件商品，则只更新数量即可
			findResult.goods_count++
		}

		this.commit('cart/saveToStorage')
	},
	// 将购物车中的数据持久化存储到本地
	saveToStorage(state) {
		uni.setStorageSync('cart', JSON.stringify(state.cart))
	},
	// 更新购物车中商品的数量
	updateGoodsCount(state, goods) {
		const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		if (findResult) {
			// 更新对应商品的数量
			findResult.goods_count = goods.goods_count
			this.commit('cart/saveToStorage')
		}
	},
	// 更新购物车中商品的勾选状态
	updateGoodsState(state, goods) {
		// 根据 goods_id 查询购物车中对应商品的信息对象
		const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

		if (findResult) {
			// 更新对应商品的勾选状态
			findResult.goods_state = goods.goods_state

			this.commit('cart/saveToStorage')
		}
	},
	// 从购物车中删除对应的商品信息
	removeGoodsById(state, id) {
		state.cart = state.cart.filter(x => x.goods_id !== id)
		this.commit('cart/saveToStorage')
	},
	// 更新所有商品的勾选状态
	updateAllGoodsState(state, newState) {
		// 循环更新购物车中每件商品的勾选状态
		state.cart.forEach(x => x.goods_state = newState)
		this.commit('cart/saveToStorage')
	},

}

const actions = {}

const getters = {
	total(state) {
		let c = 0
		// 循环统计商品的数量，累加到变量 c 中
		state.cart.forEach(x => c += x.goods_count)
		return c
	},
	// 勾选的商品的总数量
	checkedCount(state) {
		return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
	},
	// 已勾选的商品的总价
	checkedGoodsAmount(state) {
		return state.cart.filter(x => x.goods_state)
			.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
			.toFixed(2)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
