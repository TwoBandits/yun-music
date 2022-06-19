// 请求的基础地址
const BASE_URL = 'http://localhost:3000';

// aip接口对象
const api = {}

function request({
	url,
	data,
	method,
	dataType
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data: data || {},
			method: method || 'GET',
			dataType: dataType || 'json',
			sslVerify: true,
			success: (res => {
				// console.log(res);
				if (res.data !== null && res.data.code === 200) {
					resolve(res.data)
				} else {
					reject(res)
				}
			}),
			fail: (e) => {
				console.log('接口请求错误:' + url, e)
			}
		})
	})
}

// 获取默认搜索关键词
export function getDefaultSearchWork() {
	return request({
		url: '/search/default'
	})
}

// 获取轮播图广告数据
export function getBanners() {
	return request({
		url: '/banner',
	})
}

// 获取推荐歌单数据
export function getRecommendPlaylists() {
	return request({
		url: '/personalized',
		data: {
			limit: 6
		}
	})
}
