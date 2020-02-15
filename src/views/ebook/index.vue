<template>
	<div class="ebook">
		<ebook-title></ebook-title>
		<ebook-reader></ebook-reader>
		<ebook-menu></ebook-menu>
	</div>
</template>

<script>
	import EbookReader from '../../components/ebook/EbookReader'
	import EbookTitle from '../../components/ebook/EbookTitle'
	import EbookMenu from '../../components/ebook/EbookMenu'
	import {getReadTime, saveReadTime} from '../../plugins/localStorage'
	import bookState from '../../store/bookState'

	export default {
		name: 'index',
		components: {EbookReader, EbookTitle, EbookMenu},
		methods:{
			startLoopReadTime(){
				console.log(bookState.fileName)
				let readTime = getReadTime(bookState.fileName)
				if (!readTime){
					readTime=0
				}
				this.task = setInterval(()=>{
					readTime++
					if (readTime%30===0){
						saveReadTime(bookState.fileName,readTime)
					}
				},1000)
			}
		},
		mounted() {
			this.startLoopReadTime()
		},
		beforeDestroy() {
			if(this.task)
			{
				clearInterval(this.task)
			}

		}

	}
</script>

<style scoped>

</style>