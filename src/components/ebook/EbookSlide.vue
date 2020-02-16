<template>
	<div class="slide-content-wrapper">
		<div class="content">
			<div class="content-page-wrapper">
				<div class="content-page"></div>
				<div class="content-page-tab"></div>
			</div>
		</div>
		<div class="content-bg"></div>
	</div>
</template>

<script>
	export default {
		name: "EbookSlide"
	}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
	.slide-content-wrapper{
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 300;

		.content{
			.content-page-wrapper{
				.content-page{

				}
				.content-page-tab{

				}
			}

		}
	}

</style>