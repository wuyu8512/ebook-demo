import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/styles/icon.css'
import './assets/styles/global.scss'

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')
