<template>
	<view class="search-page">
		<view class="nav-container">
			<!-- 搜索框 -->
			<y-search @back-btn-click="handleBackBtnClick" @change="handleChange" @search="handleSearch"
				@custom="handleCustom" @focus="handleFocus" @blur="handleBlur">
			</y-search>
			<!-- 搜索建议 -->
			<view class="search-suggest-box" v-show="searchSuggestShow && searchWord">
				<y-card>
					<u-cell-group>
						<u-cell :title="'搜索“'+ searchWord +'”'" titleStyle="color:blue"
							@click="handleSuggestBoxCellClick" :name="searchWord">
						</u-cell>
						<u-cell icon="search" v-for="suggest of searchSuggestList" :key="suggest.keyword"
							:title="suggest.keyword" :name="suggest.keyword" @click="handleSuggestBoxCellClick">
						</u-cell>
					</u-cell-group>
				</y-card>
			</view>
		</view>

		<view class="content">
			<view class="hot-search-list search-card">
				<view class="hot-search-list-title search-card-header">
					热搜榜
				</view>
				<view class="hot-search-list-content">
					<view class="hot-search-list-item" v-for="(item,index) of hotList" :key="index"
						@click="goToSearchResultPage(item.searchWord)">
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
		getHotSearchDetail,
		getSearchSuggest
	} from '@/Api/api.js';
	export default {
		data() {
			return {
				// 热搜列表
				hotList: [],
				searchWord: '',
				searchSuggestShow: false,
				searchSuggestList: []
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
			},
			handleChange(value) {
				this.searchWord = value
				if (!value) {
					return;
				}
				getSearchSuggest({
					keywords: value,
					type: 'mobile'
				}).then(res => {
					this.searchSuggestList = res.result.allMatch;
				})
			},
			// 聚焦时
			handleFocus(word) {
				this.searchSuggestShow = true
			},
			handleBlur() {
				let t = setTimeout(() => {
					this.searchSuggestShow = false;
				}, 10)
			},
			// 点击右侧搜索按钮
			handleCustom(value) {
				this.goToSearchResultPage(value)
			},
			// 回车
			handleSearch(value) {
				this.goToSearchResultPage(value)
			},
			// 点击搜索建议
			handleSuggestBoxCellClick(value) {
				this.goToSearchResultPage(value.name)
			},
			goToSearchResultPage(searchWord) {
				if (!searchWord) {
					return
				}
				uni.navigateTo({
					url: '/pages/search/searchResult?searchWord=' + encodeURIComponent(searchWord),
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-page {
		.search-suggest-box {
			width: 650rpx;
			heigth: 600rpx;
			background-color: #fff;
			position: absolute;
			top: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 99;
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
