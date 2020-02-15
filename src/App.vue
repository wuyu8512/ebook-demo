<template>
	<div id="app">
		<v-app>
			<router-view/>
		</v-app>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
	document.addEventListener('DOMContentLoaded', () => {
		const html = document.querySelector('html')
		let fontSize = window.innerWidth / 10
		fontSize = fontSize > 50 ? 50 : fontSize
		html.style.fontSize = fontSize + 'px'
	})
</script>

<style lang="scss" scoped>
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

</style>