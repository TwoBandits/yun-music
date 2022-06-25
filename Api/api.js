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

// 游客登录
export function visitorLogin() {
	return request({
		url: '/register/anonimous'
	})
}

// 获取账号信息
export function getUserInfo() {
	return request({
		url: '/user/account'
	})
}

// 根据 uid 获取用户详情
export function getUserDetailById(uid) {
	return request({
		url: `/user/detail?uid=${uid}`
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

export function getDraganBallList() {
	return request({
		url: '/homepage/dragon/ball'
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

// 获取热搜列表
export function getHotSearchDetail() {
	return request({
		url: '/search/hot/detail'
	})
}

// 获取搜索建议
export function getSearchSuggest(data) {
	return request({
		url: '/search/suggest',
		data: data
	})
}

// 多重匹配
export function searchMultimatch(data) {
	return request({
		url: '/search/multimatch',
		data: data
	})
}

// 搜索
export function search(data) {
	return request({
		url: '/search',
		data: data
	})
}
