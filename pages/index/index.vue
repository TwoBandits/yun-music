<template>
	<view class="find-page-container">
		<!-- 首页搜索输入框 -->
		<view class="find-search-container">
			<u-search class="find-search" :placeholder="defaultSearchWork" :show-action="false" :disabled="true"
				@click="handleSerachClick">
			</u-search>
		</view>
		<!-- 首页轮播图 -->
		<view class="banner-container">
			<u-swiper :list="banners" :radius="10" :indicator="true" indicatorMode="dot"></u-swiper>
		</view>
		<!-- 推荐歌单 -->
		<view class="recommend-playlist find-card">
			<view class="playlist-header find-card-header">
				<view class="title">
					推荐歌单
				</view>
			</view>
			<view class="playlist-content find-card-content">
				<scroll-view class="playlist-scroll scrool-x" style="white-space: nowrap;" :scroll-x="true">
					<view class="playlist-scroll-item scroll-x-item" v-for="recommendPlaylist in recommendPlaylists"
						:key="recommendPlaylist.id" :id="recommendPlaylist.id">
						<view class="image-box">
							<u-image width="200rpx" height="200rpx" radius="20rpx"
								:src="recommendPlaylist.picUrl + '?param=270y270'">
							</u-image>
						</view>
						<view class="playlist-title scroll-x-item-title">
							{{recommendPlaylist.name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDefaultSearchWork,
		getBanners,
		getDraganBallList,
		getRecommendPlaylists
	} from '../../Api/api.js'
	export default {
		data() {
			return {
				// 搜索默认词
				defaultSearchWork: '',
				// 圆形图标列表
				draganBallList: [],
				// 轮播图数据
				banners: [],
				// 推荐歌单数据
				recommendPlaylists: []
			}
		},
		created() {
			getDefaultSearchWork().then(data => {
				this.defaultSearchWork = data.data.showKeyword;
			});
			getDraganBallList().then(data => {
				this.draganBallList = data.data;
			})
			this.getBannerList();
			this.initPlaylist();

		},
		mounted() {},
		methods: {
			handleSerachClick() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			async getBannerList() {
				await getBanners().then(data => {
					this.banners = data.banners.map(item => {
						return item.imageUrl
					})
				})
			},
			async initPlaylist() {
				await getRecommendPlaylists().then(data => {
					this.recommendPlaylists = data.result
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.find-page-container {
		background-color: #f5f5f5;

		.find-search-container {
			height: 55rpx;
			background-color: #fff;
			padding: 20rpx;

			.find-search {
				width: 450rpx;
			}
		}
	}

	// 轮播图
	.banner-container {
		padding: 20px 10px;
		background-color: #fff;
		border-bottom: solid 1rpx #f5f5f5;
	}

	// 卡片统一
	.find-card {
		background-color: #fff;
		padding: 10px;
		margin-bottom: 20px;

		.find-card-header {
			margin: 20rpx;
			margin-left: 0;

			.title {
				font-size: 32rpx;
			}
		}
	}

	.scrool-x {
		.scroll-x-item {
			display: inline-block;
			width: 230rpx;

			.scroll-x-item-title {
				white-space: normal;

				display: -webkit-box;
				width: 220rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				word-wrap: break-word;
				white-space: normal !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}

	// 推荐歌单
	.playlist-content {}
</style>
