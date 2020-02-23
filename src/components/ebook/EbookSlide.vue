<template>
	<transition name="slide-right">
		<div class="slide-content" v-show="bookState.settingVisible===3" v-if="bookState.bookAvailable">
			<div class="content-page-wrapper">
				<v-tabs grow slider-size="1" v-model="tab">
					<v-tab>目录</v-tab>
					<v-tab>书签</v-tab>
				</v-tabs>
				<v-tabs-items v-model="tab">
					<v-tab-item>
						<contents></contents>
					</v-tab-item>
					<v-tab-item></v-tab-item>
				</v-tabs-items>
			</div>
		</div>
	</transition>
</template>

<script>
	import bookState from '../../store/bookState'
	import Contents from './Slide/Contents'

	export default {
		name: 'EbookSlide',
		components: {Contents},
		data() {
			return {
				bookState: bookState,
				currentTab: 1,
				tab: null
			}
		},
		methods: {
			jumpTo(href) {
				bookState.settingVisible = -1
				bookState.display(href)
			},
			selectTab(index) {
				this.currentTab = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/global";

	.slide-content {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: px2rem(300);
		max-width: 90%;
		background: white;
		box-shadow: px2rem(8) 0 px2rem(8) rgba($color: #000000, $alpha: 0.15);

		.content-page-wrapper {
			font-size: px2rem(14);
		}

	}
</style>
