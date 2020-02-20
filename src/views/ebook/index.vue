<template>
	<div class="ebook">
		<ebook-title></ebook-title>
		<ebook-reader></ebook-reader>
		<ebook-menu></ebook-menu>
		<ebook-search></ebook-search>
	</div>
</template>

<script>
	import EbookReader from '../../components/ebook/EbookReader'
	import EbookTitle from '../../components/ebook/EbookTitle'
	import EbookMenu from '../../components/ebook/EbookMenu'
	import {getReadTime, saveReadTime} from '../../plugins/localStorage'
	import bookState from '../../store/bookState'
	import EbookSearch from '../../components/ebook/EbookSearch'

	export default {
		name: 'index',
		components: {EbookSearch, EbookReader, EbookTitle, EbookMenu},
		methods: {
			startLoopReadTime() {
				console.log(bookState.fileName)
				let readTime = getReadTime(bookState.fileName)
				if (!readTime) {
					readTime = 0
				}
				this.task = setInterval(() => {
					if (!document.hidden) {
						// console.log(readTime)
						readTime++
						if (readTime % 30 === 0) {
							saveReadTime(bookState.fileName, readTime)
						}
					}
				}, 1000)
			},
		},
		mounted() {
			this.startLoopReadTime()
		},
		beforeDestroy() {
			if (this.task) {
				clearInterval(this.task)
			}
		}
	}
</script>

<style scoped>

</style>
