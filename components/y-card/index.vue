<template>
	<view class="y-card">
		<view class="y-card-row">{{title}}</view>
		<view class="y-card-row">

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-card {
		margin: 0 30rpx;
		padding: 20rpx;
		box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

		.y-card-row {
			margin: 20rpx 0;
		}
	}
</style>
