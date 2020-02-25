<template>
	<div class="ebook-search-wrapper" :style="{background:getBackGround()}" v-show="bookState.searchVisible">
		<div class="search-wrapper">
			<v-text-field
					background-color="#8B9193"
					class="search-input"
					flat
					hide-details
					dense
					:prepend-inner-icon="mdiMagnify"
					v-model="searchText"
					@keyup.enter.exact="search()"
					solo-inverted>
				<template v-slot:label><span style="color: #cccccc">搜索全文</span></template>
				<template v-slot:append-outer>
					<v-icon @click="cancel" size="24">{{mdiCancel}}</v-icon>
				</template>
			</v-text-field>
		</div>
		<div class="search-list">
			<div class="search-item" v-for="(item,index) in searchList" :key="index" v-html="item.excerpt"
					 @click="display(item.cfi)"></div>
		</div>
	</div>
</template>

<script>
	import {THEME_LIST} from '../../store/bookState'
	import bookState from '../../store/bookState'
	import {mdiMagnify, mdiCancel} from '@mdi/js'

	export default {
		name: 'EbookSearch',
		data() {
			return {
				bookState: bookState,
				mdiMagnify: mdiMagnify,
				mdiCancel: mdiCancel,
				searchList: null,
				searchText: ''
			}
		},
		mounted() {
		},
		methods: {
			getBackGround() {
				const theme = THEME_LIST.find(e => e.name === bookState.defaultTheme)
				return theme.back
			},
			cancel() {
				bookState.searchVisible = false
			},
			doSearch(q) {
				return Promise.all(
						bookState.book.spine.spineItems.map(item => item.load(bookState.book.load.bind(bookState.book))
								.then(item.find.bind(item, q)).finally(item.unload.bind(item)))
				).then(results => Promise.resolve([].concat.apply([], results)))
			},
			search() {
				if (this.searchText && this.searchText.length > 0) {
					this.doSearch(this.searchText).then(list => {
						this.searchList = list
						this.searchList.map(item => {
							item.excerpt = item.excerpt.replace(this.searchText, `<span class="selected">${this.searchText}</span>`)
							return item
						})
					})
				} else {
					this.searchList = null
				}
			},
			display(cfi) {
				bookState.display(cfi)
				bookState.searchVisible = false
				bookState.book.rendition.annotations.highlight(cfi)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/global";

	.ebook-search-wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;

		.search-wrapper {
			flex: 0 0 px2rem(28);
			width: 100%;
			margin: px2rem(10) 0;
			padding: 0 px2rem(15);
			font-size: px2rem(12);
		}

		.search-list {
			flex: 1;
			width: 100%;
			padding: 0 px2rem(15);
			overflow: auto;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			.search-item {
				font-size: px2rem(14);
				line-height: px2rem(16);
				padding: px2rem(10) 0;
				box-sizing: border-box;
				border-bottom: 1px solid rgba(black, .15);
			}
		}
	}
</style>
