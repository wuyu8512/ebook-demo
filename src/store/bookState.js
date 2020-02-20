import imgUrlBlack from '../assets/images/reading__reading_themes_vine_black.jpg'
import imgUrlYellow from '../assets/images/reading__reading_themes_vine_yellow.jpg'
import {getReadTime, saveLocation} from '../plugins/localStorage'

const bookState = {
	fileName: '',
	titleVisible: false,
	settingVisible: -1, //-1:不显示,0:字号,1:主题,2:进度,3:目录,4字体
	searchVisible: false,
	titleTextVisible: true,
	menuVisible: false,
	bookAvailable: false,
	defaultFontSize: 18,
	defaultFontName: '默认',
	defaultTheme: '默认',
	book: null,	//Book对象
	progress: 0,
	section: 0,
	cover: '',
	metadata: null,
	refreshLocation(isSave = true, isProgress = true) {
		const currentLocation = this.book.rendition.currentLocation()
		const startCfi = currentLocation.start.cfi
		if (isSave) saveLocation(this.fileName, startCfi)
		if (this.bookAvailable) {
			let index = currentLocation.start.index
			while (index >= 0) {
				const href = this.book.spine.spineItems[index].href
				const section_temp = this.book.navigation.toc.findIndex((toc) => toc.href === href)
				if (section_temp !== -1) {
					this.section = section_temp
					break
				} else {
					index--
				}
			}
			if (isProgress) {
				// const process =
				this.progress = Math.floor(currentLocation.start.percentage * 1000)
			}
		}
	},
	display(target, cb) {
		if (target) {
			this.book.rendition.display(target).then(() => {
				this.refreshLocation()
				if (cb) cb()
			})
		} else {
			this.book.rendition.display()
			if (cb) cb()
		}
	},
	getReadTimeText() {
		const readTime = getReadTime(this.fileName)
		if (readTime) {
			return `已读${Math.ceil(getReadTime(this.fileName) / 60)}分钟`
		} else {
			return '已读0分钟'
		}
	}
}


export default bookState
export const FONT_SIZE_LIST = [
	{
		fontSize: 14
	},
	{
		fontSize: 16
	},
	{
		fontSize: 18
	},
	{
		fontSize: 20
	},
	{
		fontSize: 22
	},
	{
		fontSize: 24
	},
	{
		fontSize: 26
	}
]
export const THEME_LIST = [
	{
		className: 'default',
		name: '默认',
		style: {
			body: {
				'color': '#000',
				'background': 'transparent',
				'word-wrap': 'break-word'
			}
		},
		back: `url(${imgUrlYellow})`
	},
	{
		className: 'light',
		name: '明亮',
		style: {
			body: {
				'color': '#000',
				'background': 'transparent',
				'word-wrap': 'break-word'
			}
		},
		back: '#D8ECEC'
	},
	{
		className: 'dark',
		name: '黑暗',
		style: {
			body: {
				'color': '#fff',
				'background': 'transparent',
				'word-wrap': 'break-word'
			}
		},
		back: `url(${imgUrlBlack})`
	},
	{
		className: 'eye',
		name: '护眼',
		style: {
			body: {
				'color': '#000',
				'background': 'transparent',
				'word-wrap': 'break-word'
			}
		},
		back: 'rgb(175,224,150)'
	}
]
