<template>
	<view>
		<Login v-if="JSON.stringify(information) === '{}'" />
		<UserComponents v-else />
	</view>
</template>

<script>
import { mapState } from 'vuex';
import Login from '@/components/Login/Login.vue';
import UserComponents from '@/components/UserInfo/UserInfo.vue';
export default {
	components: {
		Login,
		UserComponents
	},
	computed: {
		...mapState('user', ['information'])
	},
	data() {
		return {};
	},
	computed: {},
	onLoad() {
		console.log();
		if (JSON.stringify(this.information) === '{}') {
			uni.showModal({
				title: '授权',
				content: '是否授权',
				success: () => {
					this.$store.dispatch('user/getUserInfo');
				}
			});
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
