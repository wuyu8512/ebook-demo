<template>
	<transition name="slide-up">
		<div class="setting-wrapper" v-show="bookState.settingVisible === 0">
			<div class="setting-font-size">
				<div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'px'}">A</div>
				<div class="select">
					<div class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index"
							 @click="setFontSize(item.fontSize)"
					>
						<div class="line"></div>
						<div class="point-wrapper">
							<div class="point" v-show="bookState.defaultFontSize===item.fontSize">
								<div class="small-point"></div>
							</div>
						</div>
						<div class="line"></div>
					</div>
				</div>
				<div class="preview"
						 :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
				>A
				</div>
			</div>
			<div class="setting-font-family" @click.stop="showFontFamily">
				<div class="setting-font-family-text-wrapper">
					<span class="setting-font-family-text">{{bookState.defaultFontName}}</span>
				</div>
				<div class="setting-font-family-icon-wrapper">
					<span class="icon-forward"></span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import bookState from '../../../store/bookState'
	import {FONT_SIZE_LIST} from '../../../store/bookState'
	import {saveFontSize} from '../../../plugins/localStorage'

	export default {
		name: 'SettingFont',
		data() {
			return {
				bookState: bookState,
				fontSizeList: FONT_SIZE_LIST
			}
		},
		methods: {
			setFontSize(fontSize) {
				bookState.book.rendition.themes.fontSize(fontSize + 'px')
				bookState.defaultFontSize = fontSize
				saveFontSize(fontSize)
			},
			showFontFamily() {
				bookState.settingVisible = 4
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/styles/global";

	.setting-wrapper {
		display: flex;
		flex-direction: column;
		height: px2rem(90);

		.setting-font-size {
			display: flex;
			flex: 1;

			.preview {
				flex: 0 0 px2rem(40);
				@include center;
				box-sizing: border-box;

				&:first-of-type {
					padding-left: calc((100% - 100px) / 14);
				}

				&:last-of-type {
					padding-right: calc((100% - 100px) / 14);
				}
			}

			.select {
				display: flex;
				flex: 1;

				.select-wrapper {
					flex: 1;
					@include center;
					display: flex;
					align-items: center;

					&:first-child {
						.line {
							&:first-child {
								border-top: none;
							}
						}
					}

					&:last-child {
						.line {
							&:last-child {
								border-top: none;
							}
						}
					}

					.line {
						flex: 1;
						height: 0;
						border-top: px2rem(1) solid #ccc;
					}

					.point-wrapper {
						flex: 0 0 0;
						width: 0;
						height: px2rem(7);
						border-left: px2rem(1) solid #ccc;
						position: relative;

						.point {
							position: absolute;
							top: px2rem(-5);
							left: px2rem(-10);
							width: 20px;
							height: 20px;
							border-radius: 50%;
							background: white;
							border: px2rem(1) solid #ccc;
							box-shadow: 0 px2rem(4) px2rem(4) rgba($color: #000, $alpha: 0.15);
							//color: rgb(196, 184, 116);
							@include center;

							.small-point {
								width: px2rem(5);
								height: px2rem(5);
								background: black;
								border-radius: 50%;
							}
						}
					}
				}
			}
		}

		.setting-font-family {
			flex: 1;
			font-size: px2rem(14);
			padding-bottom: px2rem(10);
			@include center;

			.setting-font-family-text-wrapper {
				@include center;
			}

			.setting-font-family-icon-wrapper {
				@include center;
			}
		}
	}
</style>
