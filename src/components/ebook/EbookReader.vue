<template>
	<div>
		<div class="ebook-reader">
			<div id="read"></div>
		</div>
		<div class="images" v-viewer>
			<img :src="img.src" :alt="img.alt">
		</div>
	</div>
</template>

<script>
	import Epub from '../../assets/js/epub.min'
	import {EpubCFI} from 'epubjs'
	import bookState from '../../store/bookState'
	import {flatten} from '../../utils/book'
	import {THEME_LIST} from '../../store/bookState'
	import {FONT_STYLE} from '../../store/font'
	import {getFontName, getFontSize, saveFontSize, getTheme, getLocation} from '../../utils/localStorage'

	let myVue = {}
	global.ePub = Epub
	global.ePubCfi = new EpubCFI()
	export default {
		data() {
			return {
				img: {
					src: null,
					alt: null,
				}
			}
		},
		methods: {
			prevPage() {
				console.log('上一页')
				if (this.rendition) {
					this.rendition.prev().then(() => {
						bookState.refreshLocation()
					})
					this.hide()
				}
			},
			nextPage() {
				console.log('下一页')
				if (this.rendition) {
					this.rendition.next().then(() => {
						bookState.refreshLocation()
					})
					this.hide()
				}
			},
			hide() {
				let temp = false
				if (bookState.menuVisible) {
					bookState.menuVisible = false
					temp = true
				}
				if (bookState.titleVisible) {
					bookState.titleVisible = false
					temp = true
				}
				if (bookState.settingVisible > -1) {
					bookState.settingVisible = -1
					temp = true
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
				//注册鼠标滚轮事件,写入CSS,图片点击事件
				// let _URL =  || window.webkitURL || window.mozURL;
				let styleUrl = window.URL.createObjectURL(new Blob([FONT_STYLE], {type: 'text/css'}))
				this.rendition.hooks.content.register(function (contents) {
					const baseName = contents.cfiBase.match(/\[(.*?)\]/)[1]
					bookState.navigation.forEach((navItem) => {
						if (navItem.href.indexOf(baseName) !== -1) {
							const href = navItem.href.match(/\/(.*?)$/)[1]
							let id = undefined
							if (href.indexOf('#') !== -1) {
								id = href.split('#')[1]
							}
							if (id) {
								//得到每个目录的cfi地址
								const node = contents.document.getElementById(id)
								const cfi = new EpubCFI(node, contents.cfiBase)
								navItem.cfi = cfi.toString()
							}
						}
					})
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
					contents.document.querySelectorAll('.duokan-image-single img').forEach(node => {
						node.style.boxShadow = 'black 0 0 3px'
						node.style.cursor = 'pointer'
						node.style.border = '1px solid white'
						node.onclick = myVue.previewImg
					})
				})
				//单击事件
				this.rendition.on('mousedown', event => {
					this.timeStart = event.timeStamp
				})
				this.rendition.on('mouseup', event => {
					const time = event.timeStamp - this.timeStart
					if (this.hide()) return
					if (event.target.localName === 'a' || event.target.parentNode.localName === 'a') return
					const path = event.path || event.composedPath()
					if (event.target.localName === 'img' && path) {
						const classList = [].concat(...path.map(item => [].concat.apply([], item.classList)))
						if (classList.findIndex(item => item === 'duokan-image-single') !== -1) return
					}
					if (time < 200) {
						if (event.screenX - window.screenX > window.innerWidth * 0.75) this.nextPage()
						else if (event.screenX - window.screenX < window.innerWidth * 0.25) this.prevPage()
						else if (event.y < window.innerHeight * 0.75 && event.y > window.innerHeight * 0.25) this.show()
					}
				})
				//箭头翻页,似乎有问题,暂时无法判断
				this.rendition.on('keyup', event => {
					let kc = event.keyCode
					if (kc === 37) myVue.prevPage()
					else if (kc === 39) myVue.nextPage()
				})
			},
			initEpub(book) {
				// document.getElementById('input').style.display = 'none'
				this.book = book
				bookState.book = this.book
				this.rendition = this.book.renderTo('read', {
					width: window.innerWidth,
					height: window.innerHeight,
					// flow: 'paginated',
					manager: 'continuous',
					// snap: true,
					// method: 'default'
				})
				//先加载会影响布局的字体
				this.loadFontSize()
				this.loadFont()
				//渲染
				bookState.display(getLocation(bookState.fileName))
				//加载主题
				this.LoadTheme()
				//注册相关事件和写入样式
				this.initEvent()
				this.parseBook()
				//加载目录
				this.book.ready
						.then(() => {
							// 修改网页title
							document.title = this.book.package.metadata.title
							// return this.book.locations.generate(750 * (window.innerWidth / 375) * bookState.defaultFontSize / 16)
							return this.book.locations.generate()
						})
						.then(() => {
							bookState.bookAvailable = true
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
					bookState.defaultTheme = theme.name
				} else {
					vApp.style.background = THEME_LIST[0].back
					bookState.defaultTheme = '默认'
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
					bookState.defaultFontSize = fontSize
					this.rendition.themes.fontSize(fontSize + 'px')
				} else {
					this.rendition.themes.fontSize(bookState.defaultFontSize + 'px')
					saveFontSize(bookState.defaultFontSize)
				}
			},
			initBookState() {
				bookState.bookAvailable = false
				bookState.section = 0
				bookState.progress = 0
				bookState.settingVisible = -1
				bookState.fileName = ''
				bookState.cover = ''
				bookState.author = ''
				bookState.searchVisible = false
				bookState.menuVisible = false
				bookState.titleVisible = false
			},
			parseBook() {
				this.book.loaded.cover.then(cover => {
					this.book.archive.createUrl(cover).then(url => {
						bookState.cover = url
					})
				})
				this.book.loaded.metadata.then(metadata => {
					bookState.metadata = metadata
				})
				this.book.loaded.navigation.then(nav => {
					const navItem = flatten(nav.toc)

					function find(item, levle = 0) {
						return !item.parent ? levle : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++levle)
					}

					navItem.forEach(item => {
						item.level = find(item)
					})
					bookState.navigation = navItem
				})
			},
			previewImg(event) {
				this.img.src = event.target.src
				this.img.alt = event.target.alt
				const viewer = this.$el.querySelector('.images').$viewer
				viewer.show()
			}
		},
		mounted() {
			// this.initBookState()
			myVue = this
			// const fileName = this.$route.params.fileName.split('|').join('/')
			// const fileName = '刀剑神域/Sword Art Online刀剑神域 01 艾恩葛朗特'
			const fileName = 'Campione弑神者！/Campione─弑神者─！ 03'
			// const fileName = '神话传说英雄的异世界奇谭/神话传说英雄的异世界奇谭 12'
			bookState.fileName = fileName
			// this.initEpub(`${process.env.VUE_APP_RES_URL}/${fileName}.epub`)
			this.initEpub(new Epub('http://192.168.1.9:8081/' + fileName + '.epub'))
			// inputEvent()
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

	// eslint-disable-next-line no-unused-vars
	function show(e) {
		var book = new Epub()
		book.open(e.target.result)
		myVue.initEpub(book)
	}

	// eslint-disable-next-line no-unused-vars
	function inputEvent() {
		var inputElement = document.getElementById('input')
		inputElement.addEventListener(
				'change',
				function (e) {
					var file = e.target.files[0]
					bookState.fileName = file.name
					console.log(file)
					if (window.FileReader) {
						var read = new FileReader()
						read.onload = show
						read.readAsArrayBuffer(file)
					}
				},
				false
		)
	}
</script>

<style scoped lang="scss">
	.images {
		display: none;
	}
</style>
