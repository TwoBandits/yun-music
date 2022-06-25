<template>
	<view class="y-search">
		<u-icon class="search-back-btn" name="arrow-left" size="35rpx" @click="$emit('back-btn-click')"></u-icon>
		<u-search v-model="searchWord" :placeholder="defaultSearchWork" clearabled @search="handleSearch"
			@custom="handleCustom" @focus="handleFocus" @blur="handleBlur" @change="handleChange">
		</u-search>
	</view>
</template>

<script>
	import _ from "lodash"
	import {
		getDefaultSearchWork
	} from '@/Api/api.js';
	import debounce from '@/utils/debounce.js'
	export default {
		name: 'YSearch',
		data() {
			return {
				// 搜索默认词
				defaultSearchWork: '',
				searchWord: ''
			}
		},
		created() {
			getDefaultSearchWork().then(data => {
				this.defaultSearchWork = data.data.showKeyword;
			})
		},
		methods: {
			handleFocus(value) {
				this.$emit('focus', value)
			},
			handleBlur(value) {
				this.$emit('blur', value)
			},
			handleCustom(value) {
				this.$emit('custom', value)
			},
			handleSearch(value) {
				this.$emit('search', value)
			},
			handleChange: _.debounce(
				function(value) {
					this.$emit('change', value)
				},
				1000, {
					'leading': true,
					'trailing': false
				}),
			// 在外部组件使用
			setSearchWord(word) {
				this.searchWord = word
			}
		}
	}
</script>

<style lang="scss" scoped>
	.y-search {
		display: flex;
		padding: 20rpx;
		border-bottom: 1rpx solid #f5f5f5;
		box-sizing: border-box;

		.search-back-btn {
			padding: 20rpx 30rpx 20rpx 20rpx;
		}
	}
</style>
