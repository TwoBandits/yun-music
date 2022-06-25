/**
 * 转换数字显示，以万为单位
 * val 要转换的数字
 * fixedNum 保留几位小数
 * ch  是否为中文
 ***/
export default function formatNumber(val, fixedNum = 2, ch = true) {
	if (!val) return ''
	if (val > 10000) {
		return (val / 10000).toFixed(fixedNum) + (ch ? '万' : 'w')
	}
}
