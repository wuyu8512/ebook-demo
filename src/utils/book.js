import {getReadTime} from './localStorage'

export function getReadTimeText(fileName) {
	const readTime = getReadTime(fileName)
	if (readTime) {
		return `已读${Math.ceil(readTime / 60)}分钟`
	} else {
		return '已读0分钟'
	}
}

export function flatten(array) {
	return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}
