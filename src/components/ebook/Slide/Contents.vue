<template>
	<div class="ebook-slide-contents">
		<div class="slide-contents-book-wrapper">
			<div class="slide-contents-book-img-wrapper">
				<img :src="bookState.cover" class="slide-contents-book-cover">
			</div>
			<div class="slide-contents-book-info-wrapper">
				<div class="slide-contents-book-title">{{bookState.metadata.title}}</div>
				<div class="slide-contents-book-author">{{bookState.metadata.creator}}</div>
			</div>
			<div class="slide-contents-book-progress-wrapper">
				<div class="slide-contents-book-progress">
					<span class="progress">{{bookState.progress/10 + '% 已读'}}</span>
				</div>
				<div class="slide-contents-book-time">{{bookState.getReadTimeText()}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bookState from '../../../store/bookState'

	export default {
		name: 'Contents',
		data() {
			return {
				bookState: bookState
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/styles/global";

	.ebook-slide-contents {
		font-size: 0;

		.slide-contents-book-wrapper {
			display: flex;
			width: 100%;
			height: px2rem(96);
			border-bottom: 1px solid rgba(black, .15);
			padding: px2rem(10) px2rem(15) px2rem(10) px2rem(15);
			box-sizing: border-box;

			.slide-contents-book-img-wrapper {
				flex: 0 0 px2rem(50);

				.slide-contents-book-cover {
					width: px2rem(50);
					height: px2rem(75);
				}
			}
		}

		.slide-contents-book-info-wrapper {
			flex: 1;
			padding: 0 px2rem(5);
			box-sizing: border-box;

			.slide-contents-book-title {
				width: px2rem(150.75);
				font-size: px2rem(14);
				line-height: px2rem(16);
				@include ellipsis2(2)
			}

			.slide-contents-book-author {
				width: px2rem(145.75);
				font-size: px2rem(12);
				margin-top: px2rem(5);
				@include ellipsis
			}
		}

		.slide-contents-book-progress-wrapper {
			margin: auto 0;
			flex: 0 0 px2rem(76);

			.slide-contents-book-progress {
				.progress {
					font-size: px2rem(10);

				}
			}

			.slide-contents-book-time {
				font-size: px2rem(10);
				margin-top: px2rem(5);
			}
		}
	}
</style>
