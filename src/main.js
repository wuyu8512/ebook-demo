import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/styles/icon.css'
import './assets/styles/global.scss'

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Viewer.setDefaults({navbar: false})
Vue.use(Viewer)

Vue.config.productionTip = false

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')
