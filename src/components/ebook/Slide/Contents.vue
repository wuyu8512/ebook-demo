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
				<div class="slide-contents-book-time">{{getReadTimeText(bookState.fileName)}}</div>
			</div>
		</div>
		<div class="slide-contents-list-wrapper" :style="{height:getHeight()}">
			<div class="slide-contents-list" v-for="(item,index) in bookState.navigation" :key="index"
					 @click="jump(item.href)">
				<span class="slide-contents-item-label" :class="{'selected':bookState.section - 1 === index}"
							:style="contentItemStyle(item)">{{item.label}}</span>
				<span class="slide-contents-item-page"></span>
			</div>
		</div>
	</div>
</template>

<script>
	import bookState from '../../../store/bookState'
	import {getReadTimeText} from '../../../utils/book'
	import {realPx, px2rem} from '../../../utils/utils'

	export default {
		name: 'Contents',
		data() {
			return {
				bookState: bookState,
				getReadTimeText: getReadTimeText
			}
		},
		methods: {
			getHeight() {
				return (window.innerHeight - 48 - realPx(96)) + 'px'
			},
			contentItemStyle(item) {
				return {
					marginLeft: `${px2rem(item.level * 15)}rem`
				}
			},
			jump(href) {
				bookState.display(href)
				bookState.settingVisible = -1
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/styles/global";

	.ebook-slide-contents {

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
				}
			}
		}

		.slide-contents-list-wrapper {
			overflow: auto;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			.slide-contents-list {
				display: flex;
				padding: px2rem(10) px2rem(15);
				box-sizing: border-box;
				border-bottom: 1px solid rgba(black, .15);

				.slide-contents-item-label {
					flex: 1;
					@include ellipsis;
				}
			}
		}
	}
</style>
