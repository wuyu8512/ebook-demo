<template>
	<div class="menu-bar">
		<transition name="slide-up">
			<div class="menu-wrapper" v-show="bookState.menuVisible && bookState.settingVisible === -1">
				<div class="icon-wrapper" @click="showSetting(3)">
					<v-icon color="black" :style="{cursor: bookState.bookAvailable?'pointer':'not-allowed'}"
									:key="bookState.bookAvailable">{{mdiFormatListBulleted}}
					</v-icon>
				</div>
				<div class="icon-wrapper" @click="showSetting(2)">
								<span class="icon-progress" :style="{cursor: bookState.bookAvailable?'pointer':'not-allowed'}"
											:key="bookState.bookAvailable"></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(1)">
					<span class="icon-bright" style="cursor: pointer;"></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(0)">
					<span class="icon-A" style="cursor: pointer;"></span>
				</div>
			</div>
		</transition>
		<setting-font></setting-font>
		<setting-font-family></setting-font-family>
		<setting-theme></setting-theme>
		<setting-progress></setting-progress>
		<ebook-slide></ebook-slide>
	</div>
</template>

<script>
	import bookState from '../../store/bookState'
	import SettingFontFamily from './MenuSetting/SettingFontFamily'
	import SettingFont from './MenuSetting/SettingFont'
	import SettingTheme from './MenuSetting/SettingTheme'
	import SettingProgress from './MenuSetting/SettingProgress'
	import {mdiFormatListBulleted} from '@mdi/js'
	import EbookSlide from './EbookSlide'

	export default {
		name: 'EbookMenu',
		components: {
			EbookSlide,
			SettingProgress,
			SettingTheme,
			SettingFontFamily,
			SettingFont,
		},
		data() {
			return {
				progress: 0,
				bookState: bookState,
				mdiFormatListBulleted: mdiFormatListBulleted
			}
		},
		methods: {
			showSetting(tag) {
				if (tag >= 2) {
					if (bookState.bookAvailable) {
						bookState.settingVisible = tag
						bookState.menuVisible = false
						bookState.titleVisible = false
					}
				} else {
					bookState.menuVisible = false
					bookState.settingVisible = tag
					bookState.titleVisible = false
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/global.scss";

	.menu-bar {
		.setting-wrapper {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background: white;
			box-shadow: 0 px2rem(-8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
		}

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
			font-size: px2rem(20);

			.icon-wrapper {
				flex: 1;
				@include center;

				.icon-progress {
					font-size: px2rem(24);
				}

				.icon-bright {
					font-size: px2rem(22);
				}
			}
		}
	}
</style>
