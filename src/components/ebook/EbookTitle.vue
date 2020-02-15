<template>
	<transition name="slide-down">
		<div class="title-wrapper" v-show="bookState.titleVisible">
			<div class="icon">
				<span class="icon-back" @click="back"></span>
			</div>
			<div style="width: 100%">
				<transition name="fade">
					<p class="text" ref="titleText" v-show="bookState.titleTextVisible">书籍加载中...</p>
				</transition>
			</div>
			<div class="icon">
				<span class="icon-search"></span>
			</div>
		</div>
	</transition>
</template>

<script>
	import book from "../../store/bookState"

	export default {
		name: "EbookTitle",
		data() {
			return {
				bookState: book
			}
		},
		methods: {
			back() {
				console.log('back')
			},
			setTitleText(text) {
				this.$refs.titleText.textContent = text
			}
		},
		mounted() {
			this.bookState.setTitleText = this.setTitleText
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/global.scss";

	.title-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 101;
		width: 100%;
		height: px2rem(48);
		display: flex;
		background: white;
		box-shadow: 0 px2rem(8) px2rem(8) rgba($color: #000000, $alpha: 0.15);
		font-size: px2rem(20);

		.text {
			width: 100%;
			height: 100%;
			@include center;
			font-size: px2rem(12);
		}

		.icon {
			flex: 0 0 px2rem(50);
			@include center;
		}

		.icon-search {
			font-size: px2rem(18);
		}
	}
</style>