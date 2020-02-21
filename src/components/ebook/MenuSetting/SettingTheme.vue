<template>
	<transition name="slide-up">
		<div class="setting-wrapper" v-show="bookState.settingVisible===1">
			<div class="setting-theme">
				<div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(index)">

					<div class="preview" :style="{background:item.back}"
							 :class="{'selected':item.name===bookState.defaultTheme}"></div>

					<div class="text" :class="{'selected':item.name===bookState.defaultTheme}">{{item.name}}</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import bookState from '../../../store/bookState'
	import {THEME_LIST} from '../../../store/bookState'
	import {saveTheme} from '../../../utils/localStorage'

	export default {
		name: 'SettingTheme',
		data() {
			return {
				bookState: bookState,
				themeList: THEME_LIST
			}
		},
		methods: {
			setTheme(index) {
				bookState.defaultTheme = this.themeList[index].name
				bookState.book.rendition.themes.select(this.themeList[index].className)
				document.querySelector('div.v-application').style.background = this.themeList[index].back
				saveTheme(this.themeList[index])
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/styles/global";

	.setting-wrapper {
		height: px2rem(60);

		.setting-theme {
			height: 100%;
			display: flex;

			.setting-theme-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: px2rem(5);
				box-sizing: border-box;

				.preview {
					flex: 1;

					&.selected {
						box-shadow: px2rem(2) px2rem(2) px2rem(2) rgba(black, 0.15);
					}
				}

				.text {
					@include center;
					flex: 0 0 px2rem(20);
					font-size: px2rem(10);
					/*color: #999;*/
					cursor: default;
				}
			}
		}
	}

</style>
