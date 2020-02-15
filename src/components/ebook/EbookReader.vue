<template>
	<div class="ebook-reader">
		<div id="read"></div>
	</div>
</template>

<script>
	import Epub from '../../assets/js/epub.min'
	import bookState from '../../store/bookState'
	import {THEME_LIST} from '../../store/bookState'
	import {FONT_STYLE} from '../../store/font'
	import {getFontName, getFontSize, saveFontSize, getTheme, getLocation} from '../../plugins/localStorage'

	let myVue = {}
	global.ePub = Epub
	export default {
		methods: {
			prevPage() {
				if (this.rendition) {
					this.rendition.prev().then(() => {
						bookState.refreshLocation()
					})
					console.log('上一页')
					this.hide()
				}
			},
			nextPage() {
				if (this.rendition) {
					this.rendition.next().then(() => {
						bookState.refreshLocation()
					})
					console.log(this.book.rendition.currentLocation(), 1111111)
					this.hide()
				}
			},
			hide() {
				let temp = false
				if (bookState.menuVisible) {
					bookState.menuVisible = false
					temp = true
				}
				if (bookState.contentVisible) {
					temp = true
					bookState.contentVisible = false
				}
				if (bookState.titleVisible) {
					bookState.titleVisible = false
					temp = true
				}
				if (bookState.settingVisible > -1) {
					bookState.settingVisible = -1
					temp = true
				}
				if (bookState.setFontFamilyVisible) {
					temp = true
					bookState.setFontFamilyVisible = false
				}
				return temp
			},
			show() {
				bookState.menuVisible = true
				bookState.titleVisible = true
			},
			initEvent() {
				//未来可能会有的滑动事件
				// this.rendition.on('touchstart', event => {
				// 	// console.log(event)
				// })
				//兼容火狐和Chrome
				const mousewheel = /Firefox/i.test(navigator.userAgent)
						? 'DOMMouseScroll'
						: 'mousewheel'
				//注册鼠标滚轮事件,写入CSS
				// let _URL =  || window.webkitURL || window.mozURL;
				let styleUrl = window.URL.createObjectURL(new Blob([FONT_STYLE], {'type': 'text/css'}))
				this.rendition.hooks.content.register(function (contents) {
					contents.document.addEventListener(
							mousewheel,
							e => {
								if (e.detail) {
									e.detail > 0 ? myVue.nextPage() : myVue.prevPage()
								} else {
									e.deltaY > 0 ? myVue.nextPage() : myVue.prevPage()
								}
							},
							true
					)
					contents.addStylesheet(styleUrl).then(() => {
					})
				})
				//页面点击事件
				this.rendition.on('click', e => {
					console.log(e)
					if (this.hide()) return
					if (e.target.localName === 'a' || e.target.parentNode.localName === 'a'
					) {
						return
					}
					if (e.x % window.innerWidth > window.innerWidth * 0.75) {
						this.nextPage()
					} else if (e.x % window.innerWidth < window.innerWidth * 0.25) {
						this.prevPage()
					} else if (e.clientY < window.innerHeight * 0.75 && e.clientY > window.innerHeight * 0.25) this.show()
				})
			},
			initEpub: function (url) {
				console.log(url)
				this.book = new Epub(url)
				bookState.book = this.book
				this.rendition = this.book.renderTo('read', {
					width: innerWidth,
					height: innerHeight,
					// method: 'default'
				})
				//先加载主题
				this.LoadTheme()
				//渲染
				bookState.display(getLocation(bookState.fileName), () => {
					//初始化字体
					this.loadFontSize()
					this.loadFont()
				})
				//注册相关事件和写入样式
				this.initEvent()
				//加载目录
				this.book.ready
						.then(() => {
							// 修改网页title
							document.title = this.book.package.metadata.title
							return this.book.locations.generate(750 * (window.innerWidth / 375) * bookState.defaultFontSize / 16)
						})
						.then(() => {
							bookState.bookAvailable = true
							bookState.navigation = this.book.navigation
							bookState.setTitleText('加载完成')
							bookState.refreshLocation(false)
							setTimeout(function () {
								bookState.titleTextVisible = false
							}, 2000)
						})
			},
			LoadTheme() {
				let theme = getTheme()
				const vApp = document.querySelector('div.v-application')
				vApp.style.fontFamily = 'sans-serif'
				if (theme) {
					vApp.style.background = theme.back
				} else {
					vApp.style.background = THEME_LIST[0].back
				}

				THEME_LIST.forEach(theme => {
					this.rendition.themes.register(theme.className, theme.style)
				})

				if (theme) this.rendition.themes.select(theme.className)
				else this.rendition.themes.select('default')
			},
			loadFont() {
				let font = getFontName()
				if (font) {
					bookState.defaultFontName = font.name
					this.rendition.themes.font(font.font)
				}
			},
			loadFontSize() {
				let fontSize = getFontSize()
				if (fontSize) {
					console.log(5)
					bookState.defaultFontSize = fontSize
					this.rendition.themes.fontSize(fontSize + 'px')
				} else {
					console.log(1)
					this.rendition.themes.fontSize(bookState.defaultFontSize + 'px')
					saveFontSize(bookState.defaultFontSize)
				}
			},
			initBookState() {
				bookState.bookAvailable = false
				bookState.section = 0
				bookState.progress = 0
				bookState.settingVisible = -1
			}
		},
		mounted() {
			this.initBookState()
			myVue = this
			const fileName = this.$route.params.fileName.split('|').join('/')
			bookState.fileName = fileName
			this.initEpub(`${process.env.VUE_APP_RES_URL}/${fileName}.epub`)
		},
		name: 'EbookReader'
	}
	window.addEventListener(
			'resize',
			() => {
				if (myVue.rendition) {
					myVue.rendition.resize(window.innerWidth, window.innerHeight)
					myVue.rendition.settings.width = window.innerWidth
				}
			},
			false
	)
</script>

<style scoped>

</style>