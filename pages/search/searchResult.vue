<template>
	<view class="search-result">
		<view class="nav-container">
			<!-- 搜索框 -->
			<y-search ref="searchResult" @back-btn-click="handleBackBtnClick" @change="handleChange"
				@search="handleSearch" @custom="handleCustom" @focus="handleFocus" @blur="handleBlur">
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

		<u-tabs :list="typeList" :current="currentTabIndex" :scrollable="false" lineColor="#e51419"
			@change="handleTabsChange">
		</u-tabs>

		<swiper class="m-swiper" :current="currentSwiperIndex" @change="handleSwiperChange">
			<swiper-item class="m-swiper-item">
				<scroll-view scroll-y='true' style="width: 100%;height: 100%;">
					<search-type-composite ref="searchTypeComposite">
					</search-type-composite>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view>单曲</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view>歌单</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view>视频</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getSearchSuggest,
		search
	}
	from '@/Api/api.js'
	import searchTypeComposite from "@/pages/search/searchTypeComposite.vue"
	export default {
		components: {
			searchTypeComposite
		},
		data() {
			return {
				//搜索建议
				searchSuggestList: [],
				//显示搜索建议
				searchSuggestShow: false,
				//输入框搜索值
				searchWord: '',
				currentTabIndex: 0,
				currentSwiperIndex: 0,
				typeList: [{
					name: '综合',
					type: 1018
				}, {
					name: '单曲',
					type: 1
				}, {
					name: '歌单',
					type: 1000
				}, {
					name: '视频',
					type: 1014
				}],

			}
		},
		onLoad(option) {
			let word = decodeURIComponent(option.searchWord);
			this.searchWord = word;
		},
		onReady() {
			this.doSearchByWord(this.searchWord, this.currentSwiperIndex);
		},
		mounted() {
			this.$refs.searchResult.setSearchWord(this.searchWord)
		},
		methods: {
			handleBackBtnClick() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			// 输入框内容发生变化时
			handleChange(value) {
				this.searchWord = value
				if (!value) {
					return;
				}
				// 获取搜索建议
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
				this.searchWord = value
				if (!value) {
					return;
				}
				this.$refs.searchResult.setSearchWord(value)
				this.doSearchByWord(value, this.currentSwiperIndex)
			},
			// 回车
			handleSearch(value) {
				this.searchWord = value
				if (!value) {
					return;
				}
				this.$refs.searchResult.setSearchWord(value)
				this.doSearchByWord(value, this.currentSwiperIndex)
			},
			// 点击搜索建议
			handleSuggestBoxCellClick(value) {
				this.searchWord = value.name
				if (!value.name) {
					return;
				}
				this.$refs.searchResult.setSearchWord(value.name)
				this.doSearchByWord(value.name, this.currentSwiperIndex)
			},
			handleTabsChange(index) {
				console.log('tabchang', index);
				this.currentSwiperIndex = index.index
			},
			handleSwiperChange(e) {
				console.log('swiper', e);
				this.currentTabIndex = e.detail.current
			},
			doSearchByWord(word, index) {
				if (!word) return;
				switch (index) {
					case 0:
						this.$refs.searchTypeComposite.doSearch(word);
						break;
					case 1:
						this.$refs.searchTypeSong.doSearch(word);
						break;
					case 2:
						this.$refs.searchTypePlaylit.doSearch(word);
						break;
					case 3:
						this.$refs.searchTypeVideo.doSearch(word);
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-result {
		height: 100%;
		width: 100%;
		top: 0;
		position: absolute;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;

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

		.m-swiper {
			// height: 100%;
			flex: 1;

			.m-swiper-item {
				// overflow: auto;
				padding-bottom: 100rpx;
			}
		}
	}
</style>
