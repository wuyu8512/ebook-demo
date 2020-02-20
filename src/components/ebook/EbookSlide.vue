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
					<v-tab-item>bookmark</v-tab-item>
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
		/*z-index: 102;*/
		height: 100%;
		width: px2rem(300);
		background: white;
		box-shadow: px2rem(8) 0 px2rem(8) rgba($color: #000000, $alpha: 0.15);

		.content-page-wrapper {
			/*display: flex;*/
			/*width: 100%;*/
			/*height: 100%;*/
			/*flex-direction: column;*/
			font-size: px2rem(14);

			.content-page {
				width: 100%;
				height: 100%;
				overflow: auto;
				flex: 1;

				.content-item {
					border-bottom: px2rem(1) solid #f4f4f4;

					.text {
						padding: px2rem(10);
						font-size: px2rem(14);
						color: #333;
						@include ellipsis;
					}
				}
			}

			.content-page-tab {
				border-top: 1px solid rgba(#000000, 0.2);
				display: flex;
				flex: 0 0 px2rem(48);
				width: 100%;
				height: px2rem(48);

				.selected {
					font-weight: bold;
					color: #346cb9;
				}

				.content-page-tab-item {
					flex: 1;
					font-size: px2rem(12);
					@include center;
				}
			}
		}

	}
</style>
