<template>
	<view class="my-page-container">
		<button type="default" @click="handleClick">登录</button>

		<view class="user-info-container my-card">
			<u-avatar class="user-avatar" size="55"></u-avatar>
			<view class="user-name my-card-row">落落梅</view>
			<view class="my-card-row">
				<text class="n-data-k">26 关注</text><text class="n-data-k">0 粉丝</text><text
					class="n-data-k">Lv.{{userInfo.level}}</text>
			</view>
			<view class="user-tag-box my-card-row">
				<text>
					<u-icon name="man"></u-icon>
					95后 双子座
				</text>
				<text>重庆市</text>
				<text>村龄6年</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		visitorLogin,
		getUserInfo,
		getUserDetailById
	} from '@/Api/api.js'
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		created() {

		},
		methods: {
			handleClick() {
				getUserDetailById('32953014').then(data => {
					this.userInfo = data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-page-container {

		// my 页面的统一卡片
		.my-card {
			margin: 0 30rpx;
			padding: 20rpx;
			box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

			.my-card-row {
				margin: 20rpx 0;
			}
		}

		.user-info-container {
			position: relative;

			.user-avatar {
				position: absolute;
				top: -40rpx;
				left: 50%;
				transform: translateX(-50%);
			}

			.user-name {
				margin-top: 60rpx;
				font-size: 40rpx;
				font-weight: 800;
			}

			view {
				display: flex;
				justify-content: center;

				text.n-data-k {
					margin: 0 18rpx;
					font-size: 20rpx;
					color: gray;
				}
			}
		}

		.user-tag-box {
			& uni-text:nth-child(1) {
				width: 200rpx;
			}

			uni-text {
				display: inline-block;
				width: 120rpx;
				margin: 0 6rpx;
				border: 3rpx solid #f5f5f5;
				border-radius: 20rpx;
				font-size: 18rpx;
				display: flex;
				justify-content: center;
			}

			.u-icon {
				display: inline-block;
			}
		}
	}
</style>
