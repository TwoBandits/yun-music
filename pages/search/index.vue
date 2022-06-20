<template>
	<view class="search-page">
		<view class="nav-container">
			<u-icon class="search-back-btn" name="arrow-left" size="35rpx" @click="handleBackBtnClick"></u-icon>
			<u-search :placeholder="defaultSearchWork" :showAction="false" clearabled></u-search>
		</view>

		<view class="content">
			<view class="hot-search-list search-card">
				<view class="hot-search-list-title search-card-header">
					热搜榜
				</view>
				<view class="hot-search-list-content">
					<view class="hot-search-list-item" v-for="(item,index) of hotList" :key="index">
						<text class="number" :class="{'red-text':index < 3}">{{index+1}}</text>
						<text class="word">
							{{item.searchWord}}
						</text>
						<u-image v-show="item.iconUrl" width="30rpx" height="20rpx" radius="20rpx" mode="withFix"
							:src="item.iconUrl + '?param=70y70'" style="margin-left: 4rpx;">
						</u-image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDefaultSearchWork,
		getHotSearchDetail
	} from '../../Api/api.js';
	export default {
		data() {
			return {
				// 搜索默认词
				defaultSearchWork: '',
				// 热搜列表
				hotList: [],
			}
		},
		created() {
			getDefaultSearchWork().then(data => {
				this.defaultSearchWork = data.data.showKeyword;
			})
			getHotSearchDetail().then(data => {
				this.hotList = data.data
			})
		},
		methods: {
			handleBackBtnClick() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-page {
		.nav-container {
			display: flex;
			padding: 20rpx;
			border-bottom: 1rpx solid #f5f5f5;

			.search-back-btn {
				padding: 20rpx 30rpx 20rpx 20rpx;
			}
		}

		.search-card {
			margin: 30rpx 30rpx;
			padding: 20rpx 25rpx;
			border-radius: 15rpx;
			box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

			.search-card-header {
				font-size: 38rpx;
				font-weight: 800;
				padding: 30rpx 0;
				position: relative;

				&::after {
					content: "";
					display: block;
					width: 100%;
					height: 1rpx;
					background-color: #999;
					position: absolute;
					bottom: 0;
					left: 0;
				}
			}
		}

		.hot-search-list-item {
			display: flex;
			padding: 10rpx 0;

			.number {
				width: 55rpx;
				color: gray;
			}

			.red-text {
				color: red;
			}
		}
	}
</style>
