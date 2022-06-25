/**
 * 防抖函数 在触发事件后的一段时间后回调生效一次，若在时间内再次触发，则重新开始计时
 * fn 需要防抖的函数
 * delay 延迟的时间
 * immediate 是否立即防抖(第一次触发事件回调函数立即生效)
 */
export default function debounce(fn, delay, immediate) {
	let timeId = null;
	return function() {
		let context = this,
			args = arguments;
		if (timeId) clearTimeout(timeId);
		if (immediate) {
			let callNow = !timeId
			timeId = setTimeout(function() {
				timeId = null
			}, delay)
			if (callNow) fn.apply(context, args)
		} else {
			timeId = setTimeout(function() {
				fn.apply(context, args)
			}, delay)
		}
	}
}
