import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
