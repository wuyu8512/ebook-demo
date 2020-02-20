<template>
	<transition name="slide-up">
		<div class="setting-wrapper" v-show="bookState.settingVisible===2" v-if="bookState.bookAvailable">
			<div class="setting-progress">
				<div class="read-time-wrapper">
					<span class="read time-wrapper">{{bookState.getReadTimeText()}}</span>
					<v-icon color="black">{{mdiChevronRight}}</v-icon>
				</div>
				<div class="progress-wrapper">
					<div class="progress-icon-wrapper" @click="prevSection()" style="cursor: pointer">
						<span>上一章</span>
					</div>
					<input type="range"
								 v-bind:class="isFirefox ? 'progress-mozilla' : 'progress-webkit'"
								 max="1000" min="0" step="1" ref="progress"
								 @input="onProgressInput($event.target.value)"
								 @change="onProgressChange($event.target.value)"
								 :value="bookState.progress">
					<div class="progress-icon-wrapper" @click="nextSection()" style="cursor: pointer">
						<span>下一章</span>
					</div>
				</div>
				<div class="text-wrapper">
					<span class="progress-section-text">{{getSectionName}}</span>
					<span>({{bookState.progress/10 + '%'}})</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import bookState from '../../../store/bookState'
	import {mdiChevronLeft, mdiChevronRight} from '@mdi/js'
	import {getReadTime} from '../../../plugins/localStorage'

	export default {
		name: 'SettingProgress',
		data() {
			return {
				bookState: bookState,
				isFirefox: false,
				mdiChevronLeft: mdiChevronLeft,
				mdiChevronRight: mdiChevronRight,
			}
		},
		methods: {
			onProgressChange(progress) {
				bookState.progress = progress
				const cfi = bookState.book.locations.cfiFromPercentage(progress / 1000)
				bookState.book.rendition.display(cfi).then(() => {
					bookState.refreshLocation(true, false)
				})
			},
			onProgressInput(progress) {
				bookState.progress = progress
				this.updateProgressBg()
			},
			updateProgressBg() {
				this.$refs.progress.style.backgroundSize = `${bookState.progress / 10}% 100%`
			},
			prevSection() {
				if (bookState.section > 0) {
					bookState.section--
					this.displaySection()
				}
			},
			nextSection() {
				if (bookState.section < bookState.book.navigation.length - 1) {
					bookState.section++
					this.displaySection()
				}
			},
			displaySection() {
				const sectionInfo = bookState.book.navigation.toc[bookState.section]
				bookState.sectionName = bookState.book.navigation.toc[bookState.section].label
				bookState.display(sectionInfo.href)
			},
		},
		computed: {
			getSectionName() {
				return bookState.book.navigation.toc[bookState.section].label
			}
		},
		mounted() {
			this.isFirefox = /Firefox/i.test(navigator.userAgent)
		},
		updated() {
			this.updateProgressBg()
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/styles/global";

	.setting-wrapper {
		height: px2rem(90);

		.setting-progress {
			position: relative;
			width: 100%;
			height: 100%;

			.read-time-wrapper {
				/*position: absolute;*/
				left: 0;
				top: 0;
				padding: px2rem(5);
				width: 100%;
				/*height: px2rem(40);*/
				font-size: px2rem(12);
				@include center
			}

			icon-forward {
				height: px2rem(24);
			}

			.progress-wrapper {
				/*margin-top: px2rem(5);*/
				width: 100%;
				/*height: 60%;*/
				@include center;
				padding: 0 px2rem(5);
				box-sizing: border-box;

				.progress-icon-wrapper {
					font-size: px2rem(12);
					/*height: px2rem(36);*/
					@include center
				}

				.progress-webkit {
					margin: 0 px2rem(10);
					width: 70%;
					-webkit-appearance: none;
					height: px2rem(2);
					background: -webkit-linear-gradient(#999, #999) no-repeat #ddd;
					/*background-size: 0 100%;*/

					&:focus {
						outline: none;
					}

					&::-webkit-slider-thumb {
						-webkit-appearance: none;
						height: px2rem(20);
						width: px2rem(20);
						border-radius: 50%;
						background: white;
						box-shadow: 0 4px 4px 0 rgba($color: #000, $alpha: 0.15);
						border: px2rem(1) solid #ddd;
					}
				}

				.progress-mozilla {
					margin: 0 px2rem(10);
					width: 70%;
					-webkit-appearance: none;
					height: px2rem(2);
					background: -webkit-linear-gradient(#999, #999) no-repeat #ddd;
					/*background-size: 0 100%;*/

					&:focus {
						outline: none;
					}

					&::-moz-range-thumb {
						-webkit-appearance: none;
						height: px2rem(20);
						width: px2rem(20);
						border-radius: 50%;
						background: white;
						box-shadow: 0 4px 4px 0 rgba($color: #000, $alpha: 0.15);
						border: px2rem(1) solid #ddd;
					}
				}
			}

			.text-wrapper {
				/*<!--margin-top: px2rem(-5);-->*/
				position: absolute;
				/*left: 0;*/
				/*bottom: px2rem(15);*/
				bottom: px2rem(10);
				width: 100%;
				color: #333;
				font-size: px2rem(12);
				padding: 0 px2rem(15);
				box-sizing: border-box;
				@include center;

				.progress-section-text {
					@include ellipsis;
				}
			}
		}
	}
</style>
