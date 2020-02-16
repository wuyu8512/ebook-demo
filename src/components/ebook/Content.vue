<template>
	<transition name="slide-right">
		<div class="content" v-show="bookState.settingVisible===3">
			<div class="content-wrapper" v-if="bookState.bookAvailable">
				<div class="content-item" v-for="(item,index) in bookState.book.navigation.toc" :key="index"
						 @click="jumpTo(item.href)">
					<p class="text">{{item.label}}</p>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import bookState from '../../store/bookState'

	export default {
		data() {
			return {
				bookState: bookState
			}
		},
		methods: {
			jumpTo(href) {
				bookState.settingVisible = -1
				bookState.display(href)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/global";

	.content {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 102;
		height: 100%;
		min-width: 200px;
		max-width: 70%;
		background: white;
		box-shadow: px2rem(8) 0 px2rem(8) rgba($color: #000000, $alpha: 0.15);

		.content-wrapper {
			width: 100%;
			height: 100%;
			overflow: auto;

			.content-item {
				border-bottom: px2rem(1) solid #f4f4f4;

				.text {
					padding: px2rem(10);
					font-size: px2rem(14);
					color: #333;
					// text-overflow:ellipsis;
					// white-space:nowrap
				}
			}
		}
	}
</style>
