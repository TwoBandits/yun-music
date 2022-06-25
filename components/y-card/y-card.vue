<template>
	<view class="y-card">
		<view class="y-card-row">{{title}}</view>
		<view class="y-card-row">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'YCard',
		props: {
			title: {
				type: String
			}
		}
	}
</script>

<style lang="scss">
	.y-card {
		margin: 20rpx 30rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
		box-sizing: border-box;

		.y-card-row {
			margin: 20rpx 0;
		}
	}
</style>
