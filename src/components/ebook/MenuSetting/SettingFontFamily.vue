<template>
	<transition name="slide-up">
		<div class="setting-font-list" v-show="bookState.settingVisible === 4">
			<div class="setting-font-title">
				<!--				<div class="setting-font-title-icon" @click="hide">-->
				<!--					<span class="icon-down2"></span>-->
				<!--				</div>-->
				<span class="setting-font-title-text">选择字体</span>
				<!--				<v-switch class="setting-font-title-switch" v-model="switch1" label="强制模式" @change="changeSwitch"></v-switch>-->
			</div>
			<div class="setting-font-list-wrapper">
				<div class="setting-font-item" v-for="(item,index) in fontFamilyList" :key="index"
						 :class="{'selected':isSelected(item)}" @click="setFontFamily(item)">
					<div class="setting-font-item-text">{{item.name}}</div>
					<div class="setting-font-item-check" v-if="isSelected(item)">
						<span class="icon-check"></span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import bookState from '../../../store/bookState'
	import {FONT_FAMILY} from '../../../store/font'
	import {saveFontName} from '../../../plugins/localStorage'

	export default {
		name: 'SettingFontFamily',
		data() {
			return {
				bookState: bookState,
				fontFamilyList: FONT_FAMILY,
				switch1: false
			}
		},
		methods: {
			// hide() {
			// 	bookState.settingVisible = -1
			// },
			isSelected(item) {
				return bookState.defaultFontName === item.name
			},
			setFontFamily(item) {
				bookState.defaultFontName = item.name
				saveFontName(item)
				if (item.name === '默认') {
					bookState.book.rendition.themes.font('')
				} else {
					bookState.book.rendition.themes.font(`"${item.font}"`, this.switch1)
				}
			},
			changeSwitch() {
				console.log('我改变了')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/styles/global";

	.setting-font-list {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 350;
		width: 100%;
		font-size: 0;
		box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
		background: white;

		.setting-font-title {
			position: relative;
			text-align: center;
			padding: px2rem(15);
			border-bottom: px2rem(1) solid #b8b9bb;
			box-sizing: border-box;
			@include center;

			.setting-font-title-text {
				font-size: px2rem(12);
			}

			.setting-font-title-switch {
				position: absolute;
				right: px2rem(15);
				top: px2rem(12);
				@include center
			}

			.setting-font-title-icon {
				position: absolute;
				left: px2rem(15);
				top: 0;
				height: 100%;
				@include center;

				.icon-down2 {
					font-size: px2rem(16);
					font-weight: bold;
				}
			}
		}

		.setting-font-list-wrapper {
			max-height: px2rem(230);
			overflow: auto;

			.setting-font-item {
				display: flex;
				padding: px2rem(10);


				&.selected {
					color: #346cb9;
					font-weight: bold;
				}

				.setting-font-item-text {
					flex: 1;
					font-size: px2rem(14);
					text-align: left;
				}

				.setting-font-item-check {
					flex: 1;
					text-align: right;

					.icon-check {
						font-size: px2rem(14);
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
