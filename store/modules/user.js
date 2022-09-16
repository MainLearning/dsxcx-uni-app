const state = {
	// 收货地址
	address: JSON.parse(uni.getStorageSync('address') || '{}'),
	// 用户的基本信息
	information: JSON.parse(uni.getStorageSync('userinfo') || '{}')
}

const mutations = {
	UPDATEADDRESS(state, address) {
		state.address = address
	},
	SAVEADDRESSTOSTORAGE(state) {
		uni.setStorageSync('address', JSON.stringify(state.address))
	},
	// 更新用户的基本信息
	UPDATEUSERINFO(state, information) {
		state.information = information
	},
	SAVEUSERINFOTOSTORAGE(state) {
		uni.setStorageSync('information', JSON.stringify(state.information))
	}
}

const actions = {
	async UpdateAddress(context) {
		const [err, address] = await uni.chooseAddress().catch(err => err);
		// 用户成功的选择了收货地址
		if (err === null && address.errMsg === 'chooseAddress:ok') {
			context.commit('UPDATEADDRESS', address)
			context.commit('SAVEADDRESSTOSTORAGE')
		}
	},
	getUserInfo(context) {
		uni.getUserProfile({
			desc: '获取你的昵称、头像、地区及性别',
			success: res => {
				const {
					errMsg,
					userInfo
				} = res
				if (errMsg === 'getUserProfile:ok') {
					context.commit('UPDATEUSERINFO', userInfo)
					context.commit('SAVEUSERINFOTOSTORAGE')
				}
			},
			fail: err => {
				console.log(err);
			}
		})
	}
}

const getters = {
	addstr(state) {
		if (!state.address.provinceName) return '';

		// 拼接 省，市，区，详细地址 的字符串并返回给用户
		return (
			state.address.provinceName +
			state.address.cityName +
			state.address.countyName +
			state.address.detailInfo
		);
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
