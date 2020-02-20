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
					solo-inverted>
				<template v-slot:label><span style="color: #cccccc">搜索全文</span></template>
				<template v-slot:append-outer>
					<v-icon @click="cancel" size="24">{{mdiCancel}}</v-icon>
				</template>
			</v-text-field>
		</div>
		<div class="bg"></div>
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
				mdiCancel: mdiCancel
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

		.search-wrapper {
			display: flex;
			width: 100%;
			margin: px2rem(10) 0;
			padding: 0 px2rem(15);
			font-size: px2rem(12);
		}

		.bg {
			width: 100%;
			height: 100%;
		}
	}
</style>
