<template>
	<view class="search-type-composite">
		<view class="all-box">
			<y-card>
				<u-cell-group title="你可能感兴趣" :border="false">
					<!-- 歌手列表 -->
				</u-cell-group>
			</y-card>
		</view>

		<!-- 单曲 -->
		<y-card class="song-list-box">
			<u-cell-group :border="false" v-if="songBoxShow">
				<view style="font-size: 38rpx;color: #000;font-weight: bold;padding: 20rpx;">
					单曲
				</view>
				<u-cell v-for="song of searchCompositeResult.song.songs">
					<view slot='title'>
						<view style="font-size: 32rpx;color: #000;">
							{{song.name}}
						</view>
						<view style="font-size: 26rpx;color: #999;">
							{{song.ar ? song.ar[0].name : '未知'}}
						</view>
					</view>
					<view slot="right-icon">
						<u-icon name="more-dot-fill" style="transform: rotate(90deg);"></u-icon>
					</view>
				</u-cell>
				<u-cell :border="false">
					<view slot="title" style="text-align: center; font-size: 26rpx;color: #999;"
						v-if="searchCompositeResult.song.moreText">
						{{searchCompositeResult.song.moreText}}>
					</view>
				</u-cell>
			</u-cell-group>
		</y-card>

		<!-- 歌单 -->
		<y-card class="playlist-box">
			<u-cell-group :border="false" v-if="playlistBoxShow">
				<view style="font-size: 38rpx;color: #000; font-weight: bolder;padding: 20rpx;">
					歌单
				</view>

				<u-cell v-for="item of searchCompositeResult.playList.playLists">
					<view slot="icon">
						<u-image width="120rpx" height="120rpx" border-radius="10rpx" mode="aspectFill"
							:src="item.coverImgUrl"></u-image>
					</view>
					<view slot="title">
						<view style="font-size: 32rpx;color: #000;">
							{{item.name}}
						</view>
						<view style="font-size: 26rpx;color: #999;">
							{{item.trackCount}}首，by{{item.creator.nickname}},播放{{formatNumber(item.playCount)}}
						</view>
					</view>
				</u-cell>
				<u-cell :border="false">
					<view slot="title" style="text-align: center; font-size: 26rpx;color: #999;"
						v-if="searchCompositeResult.playList.moreText">
						{{searchCompositeResult.playList.moreText}}>
					</view>
				</u-cell>
			</u-cell-group>
		</y-card>

	</view>
</template>

<script>
	import {
		searchMultimatch,
		search
	} from '@/Api/api.js'
	import formatNumber from '@/utils/formatNumber.js'
	export default {
		data() {
			return {
				// 是否在搜索
				isRequesting: false,
				// 歌手
				artists: [],
				// 专辑
				albums: [],
				// 视频
				mvs: [],
				// 搜索类型
				searchType: 1018,
				// 搜索结果
				searchCompositeResult: {
					song: {
						songs: [],
						moreText: ''
					},
					playList: {
						playLists: [],
						moreText: ''
					},
					video: {
						videos: [],
						moreText: ''
					},
				},
			}
		},
		computed: {
			songBoxShow() {
				let song = this.searchCompositeResult.song
				return song && song.songs && song.songs.length > 0
			},
			playlistBoxShow() {
				let playlist = this.searchCompositeResult.playList
				return playlist && playlist.playLists && playlist.playLists.length > 0
			},
		},
		methods: {
			formatNumber: formatNumber,
			doSearch(word) {
				if (!word) return;
				console.log('composite-search', word);
				this.isRequesting = true
				// 多重匹配(可能感兴趣)
				searchMultimatch({
					keywords: word
				}).then(res => {
					console.log(res);
					this.isRequesting = false
					let {
						result
					} = res
					this.artists = result.artist
					this.albums = result.album
					this.mvs = result.mv
				})

				search({
					keywords: word,
					type: this.searchType
				}).then(data => {
					this.isRequesting = false
					this.searchCompositeResult = data.result
				}).catch(() => {
					this.isRequesting = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-type-composite {}
</style>
