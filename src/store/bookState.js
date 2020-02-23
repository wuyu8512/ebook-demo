import imgUrlBlack from '../assets/images/reading__reading_themes_vine_black.jpg'
import imgUrlYellow from '../assets/images/reading__reading_themes_vine_yellow.jpg'
import {saveLocation} from '../utils/localStorage'
import {EpubCFI} from 'epubjs'

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
	navigation: null,
	refreshLocation(isSave = true, isProgress = true, isSection = true) {
		const currentLocation = this.book.rendition.currentLocation()
		if (currentLocation && currentLocation.start) {
			const startCfi = currentLocation.start.cfi
			if (isSave) saveLocation(this.fileName, startCfi)
			if (this.bookAvailable) {
				if (isSection) {
					const endCfi = new EpubCFI(currentLocation.end.cfi)
					let temp = 0
					let flag = true
					for (let i = 0; i < this.navigation.length; ++i) {
						const navItem = this.navigation[i]
						let href = navItem.href
						if (href.indexOf('#') !== -1) href = href.split('#')[0]
						if (navItem.cfi) {
							temp = global.ePubCfi.compare(navItem.cfi, endCfi)
						} else {
							const index = this.book.spine.spineItems.findIndex(item => item.href === href)
							if (index > endCfi.spinePos) {
								temp = 1
							} else {
								temp = -1
							}
						}
						if (flag) {
							flag = false
							if (temp === 1) {
								this.section = 0
								break
							}
						} else {
							if (i === this.navigation.length - 1) {
								this.section = i + 1
							}
							if (temp === 1) {
								this.section = i
								break
							}
						}
					}
				}
				if (isProgress) {
					this.progress = Math.floor(currentLocation.start.percentage * 1000)
				}
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
}

export default bookState
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
