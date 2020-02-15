<template>
	<div class="menu-bar">
		<transition name="slide-up">
			<div class="menu-wrapper" :class="{'hide-box-shadow': settingShow}"
					 v-show="isMenuShow && !ifShowContent && !settingShow"
			>
				<div class="icon-wrapper" @click="showSetting(3)">
					<span class="icon-menu icon" :style="{cursor: this.bookAvailabel?'cursor':'not-allowed'}"
								:key="bookAvailabel"
					></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(2)">
					<span class="icon-progress icon" :style="{cursor: this.bookAvailabel?'cursor':'not-allowed'}"
								:key="bookAvailabel"
					></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(1)">
					<span class="icon-bright icon"></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(0)">
					<span class="icon-a icon">A</span>
				</div>
			</div>
		</transition>
		<transition name="slide-up">
			<div class="setting-wrapper" v-show="settingShow">
				<div class="setting-font-size" v-if="showTag === 0">
					<div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
					<div class="select">
						<div class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index"
								 @click="setFontSize(item.fontSize)"
						>
							<div class="line"></div>
							<div class="point-wrapper">
								<div class="point" v-show="defaultFontSize===item.fontSize">
									<div class="small-point"></div>
								</div>
							</div>
							<div class="line"></div>
						</div>
					</div>
					<div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
				</div>
				<div class="setting-theme" v-else-if="showTag === 1">
					<div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">
						<div class="preview" :style="{background:item.back}"></div>
						<div class="text" :class="{'selected':index===defaultTheme}">{{item.name}}</div>
					</div>
				</div>
				<div class="setting-progress" v-else-if="showTag === 2">
					<div class="progress-wrapper">
						<input type="range" class="progress"
									 max="1000" min="0" step="1" ref="progress"
									 @input="onProgressInput($event.target.value)"
									 @change="changeProgress(progress)"
									 :value="progress" :disabled="!bookAvailabel"
						>
					</div>
					<div class="text-wrapper">
						<span>{{progress/10 + '%'}}</span>
					</div>
				</div>
			</div>
		</transition>
		<content-view :if-show-content="ifShowContent" v-show="ifShowContent" :nav="nav" @jumpTo="jumpTo"></content-view>
	</div>
</template>

<script>
	import ContentView from '@/components/Content'

	export default {
		components: {
			ContentView
		},
		props: {
			isMenuShow: {
				type: Boolean,
				default: false
			},
			fontSizeList: Array,
			defaultFontSize: Number,
			themeList: Array,
			defaultTheme: Number,
			bookAvailabel: {
				type: Boolean,
				default: false
			},
			nav: Object
		},
		data() {
			return {
				settingShow: false,
				showTag: 0,
				progress: 0,
				ifShowContent: false
			}
		},
		methods: {
			showSetting(tag) {
				if (tag === 3) {
					if (this.bookAvailabel) {
						this.ifShowContent = true
						this.$emit('hideTitle')
					}
				} else {
					if (tag !== 2) {
						this.showTag = tag
						this.settingShow = true
						this.$emit('hideTitle')
					} else {
						if (this.bookAvailabel) {
							this.showTag = tag
							this.settingShow = true
							this.$emit('hideTitle')
						}
					}
				}
			},
			hideSetting() {
				this.settingShow = false
			},
			setFontSize(fontSize) {
				this.$emit('setFontSize', fontSize)
			},
			setTheme(index) {
				this.$emit('setTheme', index)
			},
			onProgressInput(progress) {
				this.progress = progress
				this.$refs.progress.style.backgroundSize = `${this.progress / 10}% 100%`
			},
			setProgress(progress) {
				this.progress = progress
			},
			changeProgress(progress) {
				this.$emit('onProgressChange', progress)
			},
			hideContent() {
				this.ifShowContent = false
			},
			jumpTo(href) {
				this.ifShowContent = false
				this.$emit('jumpTo', href)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../assets/styles/global.scss";

	.menu-bar {

		.menu-wrapper {
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 101;
			width: 100%;
			height: px2rem(48);
			display: flex;
			background: white;
			box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);

			&.hide-box-shadow {
				box-shadow: none;
			}

			.icon-wrapper {
				flex: 1;
				@include center;

				.icon-progress {
					font-size: px2rem(28);
				}

				.icon-bright {
					font-size: px2rem(18);
				}

				.icon {
					cursor: pointer;
				}
			}
		}

		.setting-wrapper {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: px2rem(60);
			background: white;
			box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);

			.setting-progress {
				position: relative;
				width: 100%;
				height: 100%;

				.progress-wrapper {
					width: 100%;
					height: 60%;
					@include center;
					padding: 0 px2rem(30);
					box-sizing: border-box;

					.progress {
						width: 100%;
						-webkit-appearance: none;
						height: px2rem(2);
						background: -webkit-linear-gradient(#999, #999) no-repeat #ddd;
						background-size: 0 100%;

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
				}

				.text-wrapper {
					position: absolute;
					left: 0;
					bottom: px2rem(15);
					width: 100%;
					color: #333;
					font-size: px2rem(12);
					text-align: center;
				}
			}
		}

		.content-mask {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 101;
			display: flex;
			width: 100%;
			height: 100%;
			background: rgba(51, 51, 51, .8)
		}
	}
</style>
